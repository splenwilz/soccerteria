'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Separator } from '@/components/ui/separator'
import { useMutation } from '@tanstack/react-query'
import { createAddFundsSession } from './actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const fundsSchema = z.object({
    amount: z.coerce.number(),
    // amount: z.number().min(1, { message: "Amount must be greater than 0" }),
    // name_on_card: z.string().min(1, { message: "Name on card is required" }),
    // card_number: z.string().min(1, { message: "Card number is required" }),
    // cvc: z.string().min(1, { message: "CVC is required" }),
    // expiry_date_month: z.string().min(1, { message: "Expiry date is required" }),
    // expiry_date_year: z.string().min(1, { message: "Expiry date is required" }),
})
export default function AddFunds() {
    const form = useForm<z.infer<typeof fundsSchema>>({
        resolver: zodResolver(fundsSchema),
        defaultValues: {
            amount: 0,

            // name_on_card: "",
            // card_number: "",
            // cvc: "",
            // expiry_date_month: "",
            // expiry_date_year: "",
        },
    })

    const router = useRouter()
    const { toast } = useToast()

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof fundsSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        addFunds({ price: values.amount * 100 })
    }

    const { mutate: addFunds } = useMutation(
        {
            mutationKey: ['addFunds'],
            mutationFn: createAddFundsSession,
            onSuccess: ({ url }) => {
                if (url) {
                    router.push(url)
                } else {
                    throw new Error('Unable to retrieve payment url')
                }

                form.reset()
            },
            onError: (error) => {
                toast({
                    title: 'Something went wrong',
                    description: error.message,
                    variant: 'destructive',
                })
            }
        }
    )
    return (
        <div className='mt-10 shadow-md p-10 mx-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="w-1/2 mx-auto">
                        <FormField

                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Add Funds ($)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <FormField
                        control={form.control}
                        name="name_on_card"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name on Card" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="card_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Card Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full gap-6 mb-10">
                        <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CVC" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiry_date_month"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Expiry Date Month</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiry_date_year"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Expiry Date Year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="YYYY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
                    <div className="flex justify-center mt-12 pt-12">
                        <Button variant={"primary"} type="submit" className='px-24'>Add Funds</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
