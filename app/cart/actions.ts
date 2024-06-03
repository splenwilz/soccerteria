"use server"

import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"

export const createCheckoutSession = async () => {
    let price = 5

    const product = await stripe.products.create({
        name: "Summer elGordo",
        images: ["https://i.imgur.com/liMHcb8.jpeg"],
        default_price_data: {
            currency: "USD",
            unit_amount: price
        }
    })

    // const order = db
    //     .query
    //     .Order
    //     .create({
    //         data: {
    //             amount: price,
    //             currency: "usd",
    //             product_id: product.id
    //         }
    //     })

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}'/thank-you?orderId='${product.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
        mode: "payment",
    })

}