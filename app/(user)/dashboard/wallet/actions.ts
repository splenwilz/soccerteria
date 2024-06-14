"use server"

import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"
import { OrdersSchema } from "@/utils/schema"
import { currentUser } from "@clerk/nextjs/server"

// TODO - Add country to currency mapping
// // Define the type for the country to currency map
const countryToCurrencyMap: Record<string, string> = {
    NG: "NGN", // Nigeria
    US: "USD", // United States
    GB: "GBP", // United Kingdom
    // Add more mappings as needed
};

const getUserCountry = async () => {
    try {
        const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=5d848db7493f4a6b9e9163e6ff466478");
        const data = await response.json();
        return data.country_code2;
    } catch (error) {
        console.error("Error fetching user's country:", error);
        return "US"; // Default to US if there's an error
    }
};

const createStripeAccount = async (userId: string, email: string) => {
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: email, // User's email
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    });

    const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
        type: 'account_onboarding',
    });

    return accountLink.url;
};


export const createAddFundsSession = async ({ price }: { price: number }) => {
    // let price = 400
    const user = await currentUser();
    const userCountry = await getUserCountry();
    const currency = countryToCurrencyMap[userCountry] || "USD";

    const product = await stripe.products.create({
        name: "Fund Wallet",
        images: ["https://soccerteria.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffund-wallet.3c73ae14.png&w=640&q=75"],
        default_price_data: {
            currency: "NGN",
            unit_amount: price
        }
    })

    // Add order to your database

    const order = await db
        .insert(OrdersSchema)
        .values({
            userId: user!.id,
            status: "pending",
            total: (price / 100).toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning({
            id: OrdersSchema.id,
            total: OrdersSchema.total,
        })



    // const order = await db
    //     .insert(OrdersSchema)
    //     .values({
    //         userId: user!.id as string,
    //         status: "pending",
    //         total: (price / 100).toString(),
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //     })
    //     .returning({
    //         id: OrdersSchema.id,
    //         total: OrdersSchema.total,
    //     })


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/wallet?orderId=${order[0].id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
            userId: user!.id,
            orderId: order[0].id
        },
        line_items: [
            {
                price: product.default_price as string,
                quantity: 1
            }
        ]
    })

    return { url: stripeSession.url }
}


export const createPayForGameSession = async ({ price }: { price: number }) => {
    const user = await currentUser();

    const product = await stripe.products.create({
        name: "Summer elGordo",
        images: ["https://soccerteria.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffund-wallet.3c73ae14.png&w=640&q=75"],
        default_price_data: {
            currency: "NGN",
            unit_amount: price
        }
    })

    // Add order to your database

    const order = await db
        .insert(OrdersSchema)
        .values({
            userId: user!.id,
            status: "pending",
            total: (price / 100).toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning({
            id: OrdersSchema.id,
            total: OrdersSchema.total,
        })


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?orderId=${order[0].id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/summary`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
            userId: user!.id,
            orderId: order[0].id
        },
        line_items: [
            {
                price: product.default_price as string,
                quantity: 1
            }
        ]
    })

    return { url: stripeSession.url }
}