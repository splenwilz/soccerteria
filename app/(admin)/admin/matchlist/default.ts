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


export const matchListFormSchema = z.object({
    team1home: z.string().min(1, { message: "Home team for match 1 is required." }),
    team1away: z.string().min(1, { message: "Away team for match 1 is required." }),
    team2home: z.string().min(1, { message: "Home team for match 2 is required." }),
    team2away: z.string().min(1, { message: "Away team for match 2 is required." }),
    team3home: z.string().min(1, { message: "Home team for match 3 is required." }),
    team3away: z.string().min(1, { message: "Away team for match 3 is required." }),
    team4home: z.string().min(1, { message: "Home team for match 4 is required." }),
    team4away: z.string().min(1, { message: "Away team for match 4 is required." }),
    team5home: z.string().min(1, { message: "Home team for match 5 is required." }),
    team5away: z.string().min(1, { message: "Away team for match 5 is required." }),
    team6home: z.string().min(1, { message: "Home team for match 6 is required." }),
    team6away: z.string().min(1, { message: "Away team for match 6 is required." }),
    team7home: z.string().min(1, { message: "Home team for match 7 is required." }),
    team7away: z.string().min(1, { message: "Away team for match 7 is required." }),
    team8home: z.string().min(1, { message: "Home team for match 8 is required." }),
    team8away: z.string().min(1, { message: "Away team for match 8 is required." }),
    team9home: z.string().min(1, { message: "Home team for match 9 is required." }),
    team9away: z.string().min(1, { message: "Away team for match 9 is required." }),
    team10home: z.string().min(1, { message: "Home team for match 10 is required." }),
    team10away: z.string().min(1, { message: "Away team for match 10 is required." }),
    team11home: z.string().min(1, { message: "Home team for match 11 is required." }),
    team11away: z.string().min(1, { message: "Away team for match 11 is required." }),
    team12home: z.string().min(1, { message: "Home team for match 12 is required." }),
    team12away: z.string().min(1, { message: "Away team for match 12 is required." }),
    team13home: z.string().min(1, { message: "Home team for match 13 is required." }),
    team13away: z.string().min(1, { message: "Away team for match 13 is required." }),
    team14home: z.string().min(1, { message: "Home team for match 14 is required." }),
    team14away: z.string().min(1, { message: "Away team for match 14 is required." }),
    team15home: z.string().min(1, { message: "Home team for match 15 is required." }),
    team15away: z.string().min(1, { message: "Away team for match 15 is required." }),
    gameDate: z.date({
        required_error: "Game date is required.",
    }),
    jackpot: z.string()
        .min(1, { message: "Jackpot must be at least 1." })
});


