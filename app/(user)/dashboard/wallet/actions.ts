"use server"

import { SelectedOptions } from "@/components/Prediction"
import { stripe } from "@/lib/stripe"
import { getUser } from "@/lib/user"
import { db } from "@/utils/dbConfig"
import { GameOrdersSchema, WalletOrdersSchema } from "@/utils/schema"
// import { OrdersSchema } from "@/utils/schema"
import { currentUser } from "@clerk/nextjs/server"
import { PredictionData } from "../summary/DataTable"
import { eq } from "drizzle-orm"
import { Order } from "@/lib/types"
import { countryToCurrencyMap } from "@/lib/country_currency"



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
            currency,
            unit_amount: price
        }
    })

    // Add order to your database
    const order = await db
        .insert(WalletOrdersSchema)
        .values({
            userId: user!.id,
            status: "pending",
            total: (price / 100).toString(),
            checkoutLink: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning({
            id: WalletOrdersSchema.id,
            total: WalletOrdersSchema.total,
        })


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/wallet?orderId=${order[0].id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/wallet`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
            userId: user!.id,
            orderId: order[0].id,
            transactionType: "walletTopUp"
        },
        line_items: [
            {
                price: product.default_price as string,
                quantity: 1
            }
        ]
    })

    // Update Checkout Link
    const updateOrder = await db
        .update(WalletOrdersSchema)
        .set({ checkoutLink: stripeSession.url })
        .where(eq(WalletOrdersSchema.id, order[0].id))
        .returning()

    return { url: stripeSession.url }
}


export const createPayForGameSession = async ({ price, gameOptions, id }: { price: number, gameOptions: PredictionData, id: string | null }) => {
    const user = await currentUser();
    const useFromDB = await getUser(user!.id);
    let order;

    const product = await stripe.products.create({
        name: "Summer elGordo",
        images: ["https://soccerteria.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffund-wallet.3c73ae14.png&w=640&q=75"],
        default_price_data: {
            currency: useFromDB[0].currency || 'USD',
            unit_amount: price
        }
    })

    if (id) {
        // Update existing order
        order = await db
            .update(GameOrdersSchema)
            .set({
                total: (price / 100).toString(),
                gameOptions: gameOptions,
                updatedAt: new Date(),
            })
            .where(eq(GameOrdersSchema.id, id))
            .returning({
                id: GameOrdersSchema.id,
                total: GameOrdersSchema.total,
            });

    } else {
        // Create new order
        order = await db
            .insert(GameOrdersSchema)
            .values({
                userId: user!.id,
                status: "pending",
                total: (price / 100).toString(),
                gameOptions: gameOptions,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({
                id: GameOrdersSchema.id,
                total: GameOrdersSchema.total,
            });
    }



    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?orderId=${order[0].id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/summary`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
            userId: user!.id,
            orderId: order[0].id,
            transactionType: "gamePayment"
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