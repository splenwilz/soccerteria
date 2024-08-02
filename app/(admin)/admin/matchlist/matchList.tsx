"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { Toaster } from "@/components/ui/toaster"
import { matchListFormSchema } from "./default"
import { User } from "@/lib/types"
import { insertMatchList } from "@/lib/user"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export type matchListFormValues = z.infer<typeof matchListFormSchema>
export type OnlyStringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T];

export type MatchStringKeys = OnlyStringKeys<matchListFormValues>;

interface ProfileFormProps {
    user: User;
}
export interface Match {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    team1home: string | null;
    team1away: string | null;
    team2home: string | null;
    team2away: string | null;
    team3home: string | null;
    team3away: string | null;
    team4home: string | null;
    team4away: string | null;
    team5home: string | null;
    team5away: string | null;
    team6home: string | null;
    team6away: string | null;
    team7home: string | null;
    team7away: string | null;
    team8home: string | null;
    team8away: string | null;
    team9home: string | null;
    team9away: string | null;
    team10home: string | null;
    team10away: string | null;
    team11home: string | null;
    team11away: string | null;
    team12home: string | null;
    team12away: string | null;
    team13home: string | null;
    team13away: string | null;
    team14home: string | null;
    team14away: string | null;
    team15home: string | null;
    team15away: string | null;
    gameDate: string | null;
    jackpot: string | null;
}

// Update ProfileFormProps to include matchList
interface ProfileFormProps {
    user: User;
    matchList: Match[];
}

// Update the CalendarForm component
export default function CalendarForm({ user, matchList }: ProfileFormProps) {
    const [loading, setLoading] = React.useState(false)
    const defaultValues: Partial<matchListFormValues> = {
        team1home: matchList?.[0]?.team1home || '',
        team1away: matchList?.[0]?.team1away || '',
        team2home: matchList?.[0]?.team2home || '',
        team2away: matchList?.[0]?.team2away || '',
        team3home: matchList?.[0]?.team3home || '',
        team3away: matchList?.[0]?.team3away || '',
        team4home: matchList?.[0]?.team4home || '',
        team4away: matchList?.[0]?.team4away || '',
        team5home: matchList?.[0]?.team5home || '',
        team5away: matchList?.[0]?.team5away || '',
        team6home: matchList?.[0]?.team6home || '',
        team6away: matchList?.[0]?.team6away || '',
        team7home: matchList?.[0]?.team7home || '',
        team7away: matchList?.[0]?.team7away || '',
        team8home: matchList?.[0]?.team8home || '',
        team8away: matchList?.[0]?.team8away || '',
        team9home: matchList?.[0]?.team9home || '',
        team9away: matchList?.[0]?.team9away || '',
        team10home: matchList?.[0]?.team10home || '',
        team10away: matchList?.[0]?.team10away || '',
        team11home: matchList?.[0]?.team11home || '',
        team11away: matchList?.[0]?.team11away || '',
        team12home: matchList?.[0]?.team12home || '',
        team12away: matchList?.[0]?.team12away || '',
        team13home: matchList?.[0]?.team13home || '',
        team13away: matchList?.[0]?.team13away || '',
        team14home: matchList?.[0]?.team14home || '',
        team14away: matchList?.[0]?.team14away || '',
        team15home: matchList?.[0]?.team15home || '',
        team15away: matchList?.[0]?.team15away || '',
        gameDate: matchList?.[0]?.gameDate ? new Date(matchList?.[0]?.gameDate) : new Date(),
        jackpot: matchList?.[0]?.jackpot ? matchList?.[0]?.jackpot : '0',
        // jackpot: parseInt(matchList?.[0]?.jackpot ? matchList?.[0]?.jackpot : '0'),
    }

    const form = useForm<matchListFormValues>({
        resolver: zodResolver(matchListFormSchema),
        defaultValues,
        mode: "onChange",
    })


    const router = useRouter()


    function onSubmit(data: matchListFormValues) {
        setLoading(true)
        const demodata: string[][] = [];

        for (let i = 1; i <= 15; i++) {
            const homeTeamKey = `team${i}home` as MatchStringKeys;
            const awayTeamKey = `team${i}away` as MatchStringKeys;
            if (data[homeTeamKey] && data[awayTeamKey]) {
                demodata.push([data[homeTeamKey], data[awayTeamKey]]);
            }
        }

        const formattedData = {
            ...data,
            gameDate: new Date(data.gameDate),
        };
        const parsedData = matchListFormSchema.parse(formattedData);

        insertMatchList(parsedData)
            .then((id) => {
                console.log('Data inserted successfully:', id);
                toast({
                    title: "Submitted successfully",
                    description: "Your match list has been submitted successfully.",
                });
                setLoading(false)
                router.push(`/admin/matchlist?matchlist=${id[0].id}`);
            })
            .catch((error) => toast({ title: 'Error', description: error.message }));

        console.warn(JSON.stringify(data, null, 2));
    }







    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex mt-10 gap-20 flex-col md:flex-row">
                    <FormField
                        control={form.control}
                        name="gameDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Game Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            // disabled={(date) =>
                                            //     date <= new Date()
                                            //     // || date < new Date("1900-01-01")
                                            // }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The date of the match
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Jackpot */}
                    <FormField
                        control={form.control}
                        name="jackpot"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Jackpot (€ Million) </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jackpot"
                                        {...field}
                                    // value={field.value}
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     const NumberOrString = typeof Number(value) === 'number' ? Number(value) : 0
                                    //     field.onChange(NumberOrString);
                                    // }}
                                    />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    The jackpot amount for the match
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mt-3 font-inter">Add Match List</h2>
                    <p className="text-sm text-gray-500">
                        Add match list for current week
                    </p>
                </div>



                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team1home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 1 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 1 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team1away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 1 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 1 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team2home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 2 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 2 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team2away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 2 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 2 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team3home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 3 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 3 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team3away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 3 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 3 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team4home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 4 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 4 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team4away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 4 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 4 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team5home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 5 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 5 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team5away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 5 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 5 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team6home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 6 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 6 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team6away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 6 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 6 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team7home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 7 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 7 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team7away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 7 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 7 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team8home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 8 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 8 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team8away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 8 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 8 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team9home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 9 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 9 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team9away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 9 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 9 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team10home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 10 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 10 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team10away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 10 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 10 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team11home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 11 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 11 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team11away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 11 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 11 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team12home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 12 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 12 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team12away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 12 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 12 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team13home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 13 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 13 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team13away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 13 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 13 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team14home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 14 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 14 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team14away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 14 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 14 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team15home"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 15 (Home)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 15 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="team15away"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team 15 (Away)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team 15 Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type={loading ? "reset" : "submit"}
                        // onClick={() => {
                        //     setLoading(true)
                        // }}
                        disabled={loading}

                    >
                        <span>Submit Match List</span>
                        {loading && <Loader2 className="animate-spin ml-2 h-4 w-4" />}
                    </Button>
                    {/* <button type="submit">Submit Match List</button> */}
                </div>
            </form>
        </Form>
    )
}
