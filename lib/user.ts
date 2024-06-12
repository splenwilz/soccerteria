import { Order, User } from "./types"
import { db } from "../utils/dbConfig"
import { OrdersSchema, UserSchema, WalletSchema } from "../utils/schema"
import { eq } from "drizzle-orm"
export const createUser = async (userdata: User) => {
    // db.delete(user)
    const userresult = await db
        .insert(UserSchema)
        .values([userdata])
        .returning({
            id: UserSchema.id,
            first_name: UserSchema.firstName,
            last_name: UserSchema.lastName,
            email: UserSchema.email,
        }).onConflictDoUpdate({
            target: [UserSchema.email],
            set: userdata
        })

    console.log(userresult[0])
}

export const getUserBalance = async (userId: string) => {
    const user = await db
        .select()
        .from(WalletSchema)
        .where(eq(WalletSchema.userId, userId))
    return user
}

// export const getOrders = async (userId: string) => {
//     const orders = await db
//         .select()
//         .from(OrdersSchema)
//         .where(eq(OrdersSchema.userId, userId))
//     return orders
// }

export const getOrders = async (userId: string): Promise<Order[]> => {
    const orders: Order[] = await db
        .select()
        .from(OrdersSchema)
        .where(eq(OrdersSchema.userId, userId));
    return orders;
}