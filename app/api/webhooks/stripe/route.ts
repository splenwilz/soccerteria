import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = headers().get("stripe-signature")
        if (!signature) {
            return new Response("Invalid signature", { status: 400 })
        }
        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
        if (event.type === "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) {
                throw new Error("Email not found")
            }
            const session = event.data.object as Stripe.Checkout.Session

            const { userId, orderId } = session.metadata || { userId: null, orderId: null }

            if (!userId || !orderId) {
                throw new Error("Invalid metadata")
            }
            const billingAddress = session.customer_details?.address

        }
        return NextResponse.json({ result: event, 'ok': true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: (error as Error).message, 'ok': false }, { status: 500 })
    }
}