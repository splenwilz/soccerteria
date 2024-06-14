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


export const getOrders = async (userId: string): Promise<Order[]> => {
    const orders: Order[] = await db
        .select()
        .from(OrdersSchema)
        .where(eq(OrdersSchema.userId, userId));
    return orders;
}


export const getUser = async (userId: string) => {
    const user = await db
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.userId, userId))
    return user
}


export const UpdateProfilePics = async (userId: string, imageUrl: string) => {
    const user = await db
        .update(UserSchema)
        .set({ imageUrl: imageUrl })
        .where(eq(UserSchema.userId, userId))
    return user
}

export const updateUser = async (userId: string, userdata: User) => {
    const user = await db
        .update(UserSchema)
        .set(userdata)
        .where(eq(UserSchema.userId, userId))
    return user
}