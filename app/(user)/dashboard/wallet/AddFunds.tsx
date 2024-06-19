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
import { Loader2 } from 'lucide-react'
import { User } from '@/lib/types'
import { Toast } from '@radix-ui/react-toast'
import { Toaster } from '@/components/ui/toaster'

const fundsSchema = z.object({
    amount: z.coerce.number(),
})

interface AddFundsProps {
    user: User;
}
export default function AddFunds({ user }: AddFundsProps) {
    const form = useForm<z.infer<typeof fundsSchema>>({
        resolver: zodResolver(fundsSchema),
        defaultValues: {
            amount: 0,
        },
    })

    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false)

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof fundsSchema>) {
        addFunds({ price: values.amount * 100 })
        setLoading(true)
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
                setLoading(false)
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
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="w-1/2 mx-auto">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => {
                                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    // console.log(e.target.value)
                                    setLoading(false)
                                    field.onChange(e)
                                }
                                return (
                                    <FormItem>
                                        <FormLabel>Add Funds ({user.currencySymbol})</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0" type="number" {...field} onChange={handleChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <div className="flex justify-center mt-12 pt-12">
                        <Button variant={"primary"} type="submit" className='px-24 justify-between gap-5' disabled={loading}>
                            Add Funds  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
