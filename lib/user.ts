import { Order, User } from "./types"
import { db } from "../utils/dbConfig"
import { GameOrdersSchema, UserSchema, WalletOrdersSchema, WalletSchema } from "../utils/schema"
import { eq } from "drizzle-orm"
import { SelectedOptions } from "@/components/Prediction"
import { PredictionData } from "@/app/(user)/dashboard/summary/DataTable"
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


// export const getOrders = async (userId: string): Promise<Order[]> => {
//     const orders: Order[] = await db
//         .select()
//         .from(OrdersSchema)
//         .where(eq(OrdersSchema.userId, userId));
//     return orders;
// }

// export const getOrders = async (userId: string): Promise<Order[]> => {
//     const walletOrders = await db
//         .select()
//         .from(WalletOrdersSchema)
//         .where(eq(WalletOrdersSchema.userId, userId))
//         .orderBy(WalletOrdersSchema.createdAt)

//     const gameOrders = await db
//         .select()
//         .from(GameOrdersSchema)
//         .where(eq(GameOrdersSchema.userId, userId))
//         .orderBy(GameOrdersSchema.createdAt)

//     // Combine the orders and return
//     const orders: Order[] = [...walletOrders, ...gameOrders];

//     return orders;
// };
export const getOrders = async (userId: string): Promise<Order[]> => {
    const walletOrders = await db
        .select()
        .from(WalletOrdersSchema)
        .where(eq(WalletOrdersSchema.userId, userId))
        .execute();

    const gameOrders = await db
        .select()
        .from(GameOrdersSchema)
        .where(eq(GameOrdersSchema.userId, userId))
        .execute();

    const processedWalletOrders: Order[] = walletOrders.map(order => ({
        ...order,
        userId: order.userId ?? '',
        status: order.status ?? 'default',
        total: order.total ?? '0',
        createdAt: order.createdAt ?? new Date(),
        updatedAt: order.updatedAt ?? new Date(),
    }));

    const processedGameOrders: Order[] = gameOrders.map(order => ({
        ...order,
        userId: order.userId ?? '',
        status: order.status ?? 'default',
        total: order.total ?? '0',
        createdAt: order.createdAt ?? new Date(),
        updatedAt: order.updatedAt ?? new Date(),
        gameOptions: order.gameOptions as PredictionData,
    }));

    const orders: Order[] = [...processedWalletOrders, ...processedGameOrders]
        .sort((a, b) => (b.createdAt!.getTime() - a.createdAt!.getTime()));

    return orders;
};

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

export const getOrderById = async (orderId: string): Promise<Order | null> => {
    // Search in WalletOrdersSchema
    const walletOrder = await db
        .select()
        .from(WalletOrdersSchema)
        .where(eq(WalletOrdersSchema.id, orderId))
        .limit(1)
        .execute();

    if (walletOrder.length > 0) {
        const order = walletOrder[0];
        return {
            ...order,
            userId: order.userId ?? '',
            status: order.status ?? 'default',
            total: order.total ?? '0',
            createdAt: order.createdAt ?? new Date(),
            updatedAt: order.updatedAt ?? new Date(),
        };
    }

    // Search in GameOrdersSchema
    const gameOrder = await db
        .select()
        .from(GameOrdersSchema)
        .where(eq(GameOrdersSchema.id, orderId))
        .limit(1)
        .execute();

    if (gameOrder.length > 0) {
        const order = gameOrder[0];
        return {
            ...order,
            userId: order.userId ?? '',
            status: order.status ?? 'default',
            total: order.total ?? '0',
            createdAt: order.createdAt ?? new Date(),
            updatedAt: order.updatedAt ?? new Date(),
            gameOptions: order.gameOptions as PredictionData,
        };
    }

    // If no order is found
    return null;
};

/**
 * Deletes an order by the provided orderId from either WalletOrdersSchema or GameOrdersSchema.
 *
 * @param {string} orderId - The unique identifier of the order to delete.
 * @return {Promise<Order>} The deleted order information.
 */
export const deleteOrder = async (orderId: string) => {
    // Try to delete from WalletOrdersSchema
    let order = await db
        .delete(WalletOrdersSchema)
        .where(eq(WalletOrdersSchema.id, orderId))
        .returning({
            id: WalletOrdersSchema.id,
        });

    // If order is not found in WalletOrdersSchema, try GameOrdersSchema
    if (order.length === 0) {
        order = await db
            .delete(GameOrdersSchema)
            .where(eq(GameOrdersSchema.id, orderId))
            .returning({
                id: GameOrdersSchema.id,
            });
    }

    return order;
};