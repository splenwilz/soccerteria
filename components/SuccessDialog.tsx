'use client'
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import successicon from '../assets/images/successicon.svg'

export default function SuccessDialog() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const [openDialog, setOpenDialog] = React.useState(false)
    const router = useRouter()
    useEffect(() => {
        if (orderId) {
            setOpenDialog(true)
        } else {
            setOpenDialog(false)
        }

    }, [orderId])
    return (
        <div>
            <Dialog
                open={openDialog}
                onOpenChange={(open) => {
                    setOpenDialog(open);
                    if (!open) {
                        router.push('/dashboard');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <div className="flex flex-col justify-center items-center">

                                <Image src={successicon} alt="success" width={250} height={250} />
                                <h2 className="text-[#121212] text-[20px] font-semibold font-inter mt-10">Payment Successful</h2>
                                <p className="text-[#83838A] text-[14px] font-inter mt-5 leading-6">
                                    Your payment has been successful! You can now enjoy your new balance in the "Wallet" section.
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
