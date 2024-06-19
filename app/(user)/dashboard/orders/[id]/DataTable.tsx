'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import { SelectedOptions } from "@/components/Prediction";
import { Edit, Loader, Loader2, SquareCheck } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";
import Image from "next/image";
import walleticon from "../../../../../assets/images/walleticon.svg";
import { Order, User } from "@/lib/types";
import { loadStoredPredictionDataFromLocalStorage } from "@/lib/prediction_data";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createPayForGameSession } from "../../wallet/actions";
import { toast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/format_currency";

export interface PredictionData {
    selectedOptions: SelectedOptions
    totalAmount: number
    doublesCount: number
    triplesCount: number
}
interface DataTableProps {
    user: User;
    balance: string,
    currentRate: number
}

interface DataTablePropsInterface {
    currentRate: number;
    order: Order;
    predictionData: PredictionData;
    user: User;
}

export default function DataTable({ currentRate, order, predictionData, user }: DataTablePropsInterface) {
    const [loading, setLoading] = React.useState(false)

    function onSubmit() {
        console.warn(predictionData)
        addFunds({ price: Math.round(predictionData.totalAmount * currentRate * 100), gameOptions: predictionData, id: order.id })
        setLoading(true)
    }

    const router = useRouter()
    const { mutate: addFunds } = useMutation(
        {
            mutationKey: ['addFunds'],
            mutationFn: createPayForGameSession,
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
            }
        }
    )
    return (
        <>
            <Card className="basis-2/3 ">
                <CardContent>

                    <h2 className="text-[#2366BC] mt-8 text-[20px]  font-inter font-semibold mx-6">
                        Summer elGordo
                    </h2>
                    <div className="px-6 mt-4 overflow-y-auto h-[350px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center font-inter">Sn</TableHead>
                                    <TableHead className="text-center font-inter">Game</TableHead>
                                    <TableHead className="text-center font-inter">Selected Option</TableHead>
                                    <TableHead className="text-center font-inter">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {predictionData && predictionData.selectedOptions && Object.keys(predictionData.selectedOptions).map((key, index) => (

                                    <TableRow key={index}>
                                        <TableCell className="text-center py-4 font-inter text-[13px]">{index + 1}</TableCell>
                                        <TableCell className="py-4 text-[13px]">{key}</TableCell>
                                        <TableCell className="text-center py-4 font-inter text-[13px]">
                                            {/* {predictionData.selectedOptions[key].join(',')} */}
                                            {index === 14
                                                ? predictionData.selectedOptions[key]
                                                : predictionData.selectedOptions[key].join(',')}
                                        </TableCell>
                                        <TableCell className="text-center py-4 font-inter text-[13px]">
                                            <Edit className="h-4 w-4 text-[#BABBBC] ml-8 text-[13px]" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </CardContent>
            </Card>

            <Card className="basis-1/3 ">
                <div className="flex justify-end mt-5 mr-5">
                    <div className="flex gap-2 border border-[#CED6F9] rounded-sm p-2 bg-[#F2F4FD52]">

                        <Image src={walleticon} alt="walleticon" width={20} height={20} />
                        <span className="text-[#212121] text-[13px]">Wallet:</span>
                        {/* <span className="text-[#2366BC] text-[13px]">{user?.currencySymbol || ''}{balance} </span> */}

                    </div>
                </div>
                <CardContent>
                    <div className="flex flex-col justify-between">
                        <div className="">
                            <p className="text-[#212121] text-[16px] font-inter font-semibold mx-3 mt-10">Payment resume</p>

                            <div className="mt-5 flex justify-between mx-3 my-2">
                                <p className="text-[#AFAFB4] text-[14px] font-inter">Singles</p>
                                <p className="text-[#212121] text-[15px] font-inter font-semibold">{15 - predictionData.doublesCount - predictionData.triplesCount}</p>
                            </div>
                            <div className="mt-5 flex justify-between mx-3 my-2">
                                <p className="text-[#AFAFB4] text-[14px] font-inter">Doubles</p>
                                <p className="text-[#212121] text-[15px] font-inter font-semibold">{predictionData.doublesCount}</p>
                            </div>
                            <div className="mt-5 flex justify-between mx-3 my-2">
                                <p className="text-[#AFAFB4] text-[14px] font-inter">Triples</p>
                                <p className="text-[#212121] text-[15px] font-inter font-semibold">{predictionData.triplesCount}</p>
                            </div>

                            <SelectSeparator />
                            <div className="mt-5 flex justify-between mx-3 my-2">
                                <p className="text-[#AFAFB4] text-[14px] font-inter">Total to pay</p>
                                <div className="flex gap-2">

                                    <p className="text-[#212121] text-[15px] font-inter font-semibold">
                                        {/* {predictionData.totalAmount} EUR */}
                                        {formatCurrency({ amount: predictionData.totalAmount * currentRate, currency: user?.currency || '' })}

                                    </p>
                                    <SquareCheck className="text-[#60c97e]" /></div>
                            </div>
                        </div>

                        {/*
                         ## TODO:
                         1. If the date of the game is long past, throw an expiry date error to the user and disable submit.
                         This will only happen if the game is an actual game with actual time                                    
                        */}

                        <button
                            onClick={onSubmit}
                            className={`bg-[#2366BC] ${loading || order.status === 'complete' ? "cursor-not-allowed bg-[#2366BC]/50" : ""} rounded-sm text-white font-inter font-semibold text-[16px] px-28 md:px-14 py-2 mt-10`}
                            disabled={loading || order.status === 'complete'}
                        >

                            {order.status === 'complete'
                                ?
                                <span className="">Order Completed</span>
                                :
                                <div className={`flex gap-4 justify-center`}>
                                    <span className="">Finish my order</span>
                                    {loading && <Loader2 className='animate-spin w-5' />}
                                </div>}



                        </button>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}