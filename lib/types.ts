import { PredictionData } from "@/app/(user)/dashboard/summary/DataTable";
import { SelectedOptions } from "@/components/Prediction";

export type Role<T> = T extends "user" | "admin" ? T : never;


// userId: id,
// email: email_addresses[0].email_address,
// ...(first_name ? { firstName: first_name } : {}),
// ...(last_name ? { lastName: last_name } : {}),
// ...(image_url ? { imageUrl: image_url } : {}),
// gender: '',
// address: '',
// role: 'user',
// ...(created_at ? { createdAt: created_at } : {}),
// street: '',
// city: userCountry?.city,
// state: userCountry?.state_prov,
// postcode: userCountry?.zipcode,
// country: userCountry?.country_name,
// countryCode: userCountry?.country_code2,
// currency: userCountry?.currency.code || currency,
// currencySymbol: userCountry?.currency.symbol,
// phone: '',
export interface User {
    userId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: Role<"user" | "admin">;
    gender?: string | null;
    address?: string | null;
    imageUrl?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    postcode?: string | null;
    country?: string | null;
    countryCode?: string | null;
    currency?: string | null;
    currencySymbol?: string | null;
    phone?: string | null;

    createdAt?: number | null;
}

// export type Order = {
//     id: number;
//     userId: string | null;
//     status: "pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline" | null;
//     total: string | null;
//     createdAt: Date | null;
//     updatedAt: Date | null;
// };
export interface Order {
    id: string;
    userId: string | null;
    status: "pending" | "complete" | "cancel" | "default" | "secondary" | "destructive" | "outline" | null;
    total: string | null;
    gameOptions?: PredictionData;
    checkoutLink?: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface Link {
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
}

interface Logo {
    href: string;
    width: number;
    height: number;
    alt: string;
    rel: string[];
    lastUpdated: string;
}

interface Team {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    isActive: boolean;
    logos: Logo[];
    links: Link[];
    isNational: boolean;
}

interface Note {
    color: string;
    description: string;
    rank: number;
}

interface Stat {
    name: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    abbreviation: string;
    type: string;
    value: number;
    displayValue: string;
}

export interface Entry {
    team: Team;
    note: Note;
    stats: Stat[];
}

interface Standing {
    id: string;
    name: string;
    displayName: string;
    links: Link[];
    season: number;
    seasonType: number;
    seasonDisplayName: string;
    entries: Entry[];
}

interface Child {
    uid: string;
    id: string;
    name: string;
    abbreviation: string;
    standings: Standing;
}

export interface League {
    uid: string;
    id: string;
    name: string;
    abbreviation: string;
    children: Child[];
}

