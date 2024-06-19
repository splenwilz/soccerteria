'use client'
import React, { useState } from 'react'
import { createAddFundsSession } from './actions'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { formatCurrency } from '@/lib/format_currency'

export default function PriceValue({ currentRate, currency }: { currentRate: number, currency: string }) {
    const router = useRouter()
    const { toast } = useToast()
    const [loadingButton, setLoadingButton] = useState<number | null>(null)

    function onSubmit(value: number) {
        setLoadingButton(value)
        addFunds({ price: value * 100 })
    }

    const { mutate: addFunds, } = useMutation(
        {
            mutationKey: ['addFunds'],
            mutationFn: createAddFundsSession,
            onSuccess: ({ url }) => {
                if (url) {
                    router.push(url)
                } else {
                    throw new Error('Unable to retrieve payment url')
                }
            },
            onError: (error) => {
                toast({
                    title: 'Something went wrong',
                    description: error.message,
                    variant: 'destructive',
                })
            },
            onSettled: () => {
                setLoadingButton(null)
            }
        }
    )

    return (
        // <div className="flex my-10 justify-center gap-4">
        //     <button
        //         className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 100 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#f2f2f2cd]'}`}
        //         onClick={() => onSubmit(currency === 'NGN' ? 50000 : currency === 'USD' || currency === 'EUR' ? 100 : currentRate * 100)}
        //         disabled={loadingButton === 100}
        //     >
        //         {loadingButton === 100 ?
        //             <div className='flex gap-5 justify-between'>
        //                 <p className="font-semibold font-roboto">{currentRate * 100}</p>
        //                 <Loader2 className='animate-spin' />
        //             </div>
        //             : `${formatCurrency({ amount: currency === 'NGN' ? 50000 : currency === 'USD' || currency === 'EUR' ? 100 : currentRate * 100, currency })} `}

        //     </button>
        //     <button
        //         className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 200 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#F2F2F2]'}`}
        //         onClick={() => onSubmit(200)}
        //         disabled={loadingButton === 200}
        //     >
        //         {loadingButton === 200 ?
        //             <div className='flex gap-5 justify-between'>
        //                 <p className="font-semibold font-roboto">{currentRate * 200}</p>
        //                 <Loader2 className='animate-spin' />
        //             </div>
        //             : `${formatCurrency({ amount: currency === 'NGN' ? 100000 : currency === 'USD' || currency === 'EUR' ? 200 : currentRate * 200, currency })} `}
        //     </button>
        //     <button
        //         className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 300 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#F2F2F2]'}`}
        //         onClick={() => onSubmit(300)}
        //         disabled={loadingButton === 300}
        //     >
        //         {loadingButton === 300 ?
        //             <div className='flex gap-5 justify-between'>
        //                 <p className="font-semibold font-roboto">{currentRate * 300}</p>
        //                 <Loader2 className='animate-spin' />
        //             </div>
        //             : `${formatCurrency({ amount: currency === 'NGN' ? 200000 : currency === 'USD' || currency === 'EUR' ? 300 : currentRate * 300, currency })} `}
        //     </button>
        // </div>
        <div className="flex my-10 justify-center gap-4">
            <button
                className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 50000 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#f2f2f2cd]'}`}
                onClick={() => onSubmit(currency === 'NGN' ? 50000 : (currency === 'USD' || currency === 'EUR') ? 100 : currentRate * 100)}
                disabled={loadingButton === (currency === 'NGN' ? 50000 : (currency === 'USD' || currency === 'EUR') ? 100 : currentRate * 100)}
            >
                {loadingButton === (currency === 'NGN' ? 50000 : (currency === 'USD' || currency === 'EUR') ? 100 : currentRate * 100) ?
                    <div className='flex gap-5 justify-between'>
                        <p className="font-semibold font-roboto">{formatCurrency({ amount: currency === 'NGN' ? 50000 : (currency === 'USD' || currency === 'EUR') ? 100 : currentRate * 100, currency })}</p>
                        <Loader2 className='animate-spin' />
                    </div>
                    : `${formatCurrency({ amount: currency === 'NGN' ? 50000 : (currency === 'USD' || currency === 'EUR') ? 100 : currentRate * 100, currency })}`}
            </button>

            <button
                className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 100000 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#F2F2F2]'}`}
                onClick={() => onSubmit(currency === 'NGN' ? 100000 : (currency === 'USD' || currency === 'EUR') ? 200 : currentRate * 200)}
                disabled={loadingButton === (currency === 'NGN' ? 100000 : (currency === 'USD' || currency === 'EUR') ? 200 : currentRate * 200)}
            >
                {loadingButton === (currency === 'NGN' ? 100000 : (currency === 'USD' || currency === 'EUR') ? 200 : currentRate * 200) ?
                    <div className='flex gap-5 justify-between'>
                        <p className="font-semibold font-roboto">{formatCurrency({ amount: currency === 'NGN' ? 100000 : (currency === 'USD' || currency === 'EUR') ? 200 : currentRate * 200, currency })}</p>
                        <Loader2 className='animate-spin' />
                    </div>
                    : `${formatCurrency({ amount: currency === 'NGN' ? 100000 : (currency === 'USD' || currency === 'EUR') ? 200 : currentRate * 200, currency })}`}
            </button>

            <button
                className={`px-20 py-[10px] rounded-sm font-semibold font-roboto ${loadingButton === 200000 ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#F2F2F2]'}`}
                onClick={() => onSubmit(currency === 'NGN' ? 200000 : (currency === 'USD' || currency === 'EUR') ? 300 : currentRate * 300)}
                disabled={loadingButton === (currency === 'NGN' ? 200000 : (currency === 'USD' || currency === 'EUR') ? 300 : currentRate * 300)}
            >
                {loadingButton === (currency === 'NGN' ? 200000 : (currency === 'USD' || currency === 'EUR') ? 300 : currentRate * 300) ?
                    <div className='flex gap-5 justify-between'>
                        <p className="font-semibold font-roboto">{formatCurrency({ amount: currency === 'NGN' ? 200000 : (currency === 'USD' || currency === 'EUR') ? 300 : currentRate * 300, currency })}</p>
                        <Loader2 className='animate-spin' />
                    </div>
                    : `${formatCurrency({ amount: currency === 'NGN' ? 200000 : (currency === 'USD' || currency === 'EUR') ? 300 : currentRate * 300, currency })}`}
            </button>
        </div>
    )
}
