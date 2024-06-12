
export type Role<T> = T extends "user" | "admin" ? T : never;

export interface User {
    userId: string;
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role: Role<"user" | "admin">;
    gender?: string | undefined;
    address: string;
    imageUrl?: string | undefined;
    createdAt?: number | undefined;
}

export type Order = {
    id: number;
    userId: string | null;
    status: "pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline" | null;
    total: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
