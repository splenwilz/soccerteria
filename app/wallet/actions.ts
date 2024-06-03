"use server"

import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"

export const createAddFundsSession = async () => {
    let price = 500

    const product = await stripe.products.create({
        name: "Fund Wallet",
        images: ["https://i.imgur.com/liMHcb8.jpeg"],
        default_price_data: {
            currency: "USD",
            unit_amount: price
        }
    })


    const stripeSession = await stripe.checkout.sessions.create({
        // success_url: `${'http://localhost:3000/thank-you?orderId='}${product.id}`,
        // cancel_url: "http://localhost:3000/cart",
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}'/thank-you?orderId='${product.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
        payment_method_types: ["card"],
        mode: "payment",
        metadata: {
            userId: "1",
            orderId: product.id
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