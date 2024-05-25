
export type Role<T> = T extends "user" | "admin" ? T : never;

export interface User {
    createdAt?: number | undefined;
    address: string;
    role: Role<"user" | "admin">; // Provide the type argument here
    gender?: string | undefined;
    imageUrl?: string | undefined;
    lastName?: string | undefined;
    firstName?: string | undefined;
    clerkUserId: string;
    email: string;
}