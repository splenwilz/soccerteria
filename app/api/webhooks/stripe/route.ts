import { stripe } from "@/lib/stripe"
import { db } from "@/utils/dbConfig"
import { GameOrdersSchema, OrdersSchema, UserSchema, WalletOrdersSchema, WalletSchema } from "@/utils/schema"
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

            const { userId, orderId, transactionType } = session.metadata || { userId: null, orderId: null, transactionType: null }

            if (!userId || !orderId || !transactionType) {
                throw new Error("Invalid metadata")
            }

            const wallet = await db.query.WalletSchema.findFirst({
                where: eq(WalletSchema.userId, userId),

            });

            if (transactionType === 'gamePayment') {
                // Update order status in your database         
                const updateOrder = await db.update(GameOrdersSchema)
                    .set({ status: "complete" })
                    .where(eq(GameOrdersSchema.id, orderId));
            } else {
                // Update order status in your database         
                const updateOrder = await db.update(WalletOrdersSchema)
                    .set({ status: "complete" })
                    .where(eq(WalletOrdersSchema.id, orderId));

                if (wallet) {
                    console.log(`updating user balance ${wallet.balance}`)
                    const amountSubtotal = (session.amount_subtotal || 0) / 100;
                    const newBalance = (parseInt(wallet.balance || "0") + amountSubtotal).toString();
                    await db.update(WalletSchema).set({
                        balance: newBalance,
                        updatedAt: new Date(),
                    }).where(eq(WalletSchema.userId, userId));
                } else {
                    console.log(`creating user balance ${session.amount_subtotal?.toString() || "0"}`)
                    const amountSubtotal = (session.amount_subtotal || 0) / 100;
                    const newBalance = amountSubtotal.toString();
                    await db.insert(WalletSchema).values({
                        userId: userId,
                        balance: newBalance,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            }

            // Update order status in your database         
            // const updateOrder = await db.update(OrdersSchema)
            //     .set({ status: "complete" })
            //     .where(eq(OrdersSchema.id, parseInt(orderId)));




        }
        return NextResponse.json({ result: event, 'ok': true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: (error as Error).message, 'ok': false }, { status: 500 })
    }
}