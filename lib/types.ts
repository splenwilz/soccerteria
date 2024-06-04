
export type Role<T> = T extends "user" | "admin" ? T : never;

export interface User {
    userId: string;
    email: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    role: Role<"user" | "admin">; // Provide the type argument here
    gender?: string | undefined;
    address: string;
    imageUrl?: string | undefined;
    createdAt?: number | undefined;
}