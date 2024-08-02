import { z } from 'zod';

export const prizeDistributionFormSchema = z.object({
    drawDate: z.string().min(1, "Draw date is required").refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    totalPrize: z.number().nonnegative("Total prize must be a non-negative number"),
    minimumEstimate: z.string().min(1, "Minimum estimate is required"),
    accurateEuros: z.string().min(1, "Accurate euros is required"),
    prizeDistribution: z.array(
        z.object({
            level: z.string().min(1, "Prize level is required"),
            estimate: z.string().min(1, "Estimate is required"),
            amount: z.string().min(1, "Amount is required"),
            numberOfWinners: z.number().int().nonnegative("Number of winners must be a non-negative integer"),
            prizeAmount: z.number().nonnegative("Prize amount must be a non-negative number"),
        })
    ).nonempty("At least one prize distribution entry is required"),
});


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
