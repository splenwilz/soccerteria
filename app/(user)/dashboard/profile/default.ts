import { getUser } from "@/lib/user"
import { z } from "zod"

export const profileFormSchema = z.object({
    firstName: z
        .string()
        .min(2, {
            message: "Firstname must be at least 2 characters.",
        })
        .max(30, {
            message: "Firstname must not be longer than 30 characters.",
        }),
    lastName: z
        .string()
        .min(2, {
            message: "Lastname must be at least 2 characters.",
        })
        .max(30, {
            message: "Lastname must not be longer than 30 characters.",
        }),
    language: z
        .string()
        .refine((value) => value === "en", "Please select an option").optional(),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    gender: z.enum(["male", "female"]).refine((value) => value !== undefined, {
        message: "Please select a gender.",
    }),
    street: z.string().min(1, { message: "Street name is required." }),
    city: z.string().min(1, { message: "City name is required." }),
    state: z.string().min(1, { message: "State name is required." }),
    postcode: z
        .string()
        .min(1, { message: "Postcode is required." }),
    country: z.string().min(1, { message: "Country name is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
})

