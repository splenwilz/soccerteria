"use server"

import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"
import { OrdersSchema } from "@/utils/schema"
import { currentUser } from "@clerk/nextjs/server"

export const createAddFundsSession = async ({ price }: { price: number }) => {
    // let price = 400
    const user = await currentUser();
    const product = await stripe.products.create({
        name: "Fund Wallet",
        images: ["https://i.imgur.com/liMHcb8.jpeg"],
        default_price_data: {
            currency: "USD",
            unit_amount: price
        }
    })

    // Add order to your database
    const order = await db
        .insert(OrdersSchema)
        .values({
            userId: user!.id as string,
            status: "pending",
            total: price.toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning({
            id: OrdersSchema.id,
            total: OrdersSchema.total,
        })


    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thank-you?orderId=${order[0].id}`,
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