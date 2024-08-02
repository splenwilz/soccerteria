import { League, Order, User } from "./types"
import { db } from "../utils/dbConfig"
import { GameOrdersSchema, MatchListSchema, UserSchema, WalletOrdersSchema, WalletSchema } from "../utils/schema"
import { desc, eq } from "drizzle-orm"
import { PredictionData } from "@/app/(user)/dashboard/summary/DataTable"
import { matchListFormValues } from "@/app/(admin)/admin/matchlist/matchList"
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


export const useUserBalance = async (userId: string, newBalance: string) => {
    const updateWalletBalance = await db
        .update(WalletSchema)
        .set({ balance: newBalance })
        .where(eq(WalletSchema.userId, userId))
        .returning({ balance: WalletSchema.balance });
    return updateWalletBalance;
};



export const CreateOrUpdateOrder = async (user: User, orderId: string | null, total: number, gameOptions: PredictionData) => {
    let order;
    if (orderId) {
        // Update existing order
        order = await db
            .update(GameOrdersSchema)
            .set({
                total: total.toString(),
                status: "complete",
                gameOptions: gameOptions,
                updatedAt: new Date(),
            })
            .where(eq(GameOrdersSchema.id, orderId))
            .returning({
                id: GameOrdersSchema.id,
                total: GameOrdersSchema.total,
            });

    } else {
        // Create new order
        order = await db
            .insert(GameOrdersSchema)
            .values({
                userId: user.userId,
                status: "complete",
                total: total.toString(),
                gameOptions: gameOptions,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({
                id: GameOrdersSchema.id,
                total: GameOrdersSchema.total,
            });
    }
}



// Insert Match List
// export const insertMatchList = async (data: matchListFormValues) => {
//     const insertMatchList = await db
//         .insert(MatchListSchema)
//         .values(data)
//         .returning({
//             id: MatchListSchema.id
//         });
//     return insertMatchList
// }


export const insertMatchList = async (data: matchListFormValues) => {
    // Convert gameDate to ISO string format
    const formattedData = {
        ...data,
        gameDate: data.gameDate.toISOString(),
        jackpot: data.jackpot.toString() ?? '0'
    };
    const insertMatchList = await db
        .insert(MatchListSchema)
        .values(formattedData)
        .returning({
            id: MatchListSchema.id,
        });

    return insertMatchList;
};

// Get the last item from match list
export const getMatchList = async () => {
    const matchList = await db
        .select()
        .from(MatchListSchema)
        .orderBy(desc(MatchListSchema.createdAt))
        .limit(1)
        .execute();
    return matchList;
}

// Fetch Data from this API https://site.web.api.espn.com/apis/v2/sports/soccer/esp.1/standings?region=in&lang=en&contentorigin=espn&season=2023&sort=rank:asc
export async function fetchLaLigaStandings({ division }: { division: 'first' | 'second' }): Promise<League | null> {
    const url = `https://site.web.api.espn.com/apis/v2/sports/soccer/${division === 'first' ? 'esp.1' : 'esp.2'}/standings?region=in&lang=en&contentorigin=espn&season=2023&sort=rank:asc`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            console.error(`HTTP error! Status: ${response.status}`);
        }
        const data: League = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the LaLiga standings:', error);
        // throw error;
        return null
    }
}