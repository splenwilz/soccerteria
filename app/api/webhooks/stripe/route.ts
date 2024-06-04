import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"
import { OrdersSchema, UserSchema, WalletSchema } from "@/utils/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    try {
        const user = await currentUser();
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

            // Update order status in your database         
            const updateOrder = await db.update(OrdersSchema)
                .set({ status: "complete" })
                .where(eq(OrdersSchema.id, parseInt(orderId)));

            const user = await db.query.WalletSchema.findFirst({
                where: eq(WalletSchema.userId, userId),

            });

            if (user) {

                const amountSubtotal = session.amount_subtotal || 0;
                const newBalance = (parseInt(user.balance || "0") + amountSubtotal).toString();
                await db.update(WalletSchema).set({
                    balance: newBalance,
                    updatedAt: new Date(),
                }).where(eq(WalletSchema.userId, userId));

            } else {
                await db.insert(WalletSchema).values({
                    userId: userId,
                    balance: session.amount_subtotal?.toString() || "0",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        }
        return NextResponse.json({ result: event, 'ok': true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: (error as Error).message, 'ok': false }, { status: 500 })
    }
}