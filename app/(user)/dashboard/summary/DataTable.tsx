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
import { Edit } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";
import Image from "next/image";
import walleticon from "../../../../assets/images/walleticon.svg";
import { useMutation } from "@tanstack/react-query";
import { createAddFundsSession, createPayForGameSession } from "../wallet/actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface PredictionData {
    selectedOptions: SelectedOptions
    totalAmount: number
    doublesCount: number
    triplesCount: number
}

export default function DataTable({ balance }: { balance: string }) {
    const [predictionData, setPredictionData] = React.useState<PredictionData>({ selectedOptions: {}, totalAmount: 0, doublesCount: 0, triplesCount: 0 });

    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const storedPredictionData = loadStoredPredictionDataFromLocalStorage();
        setPredictionData(storedPredictionData);
    }, []);

    function loadStoredPredictionDataFromLocalStorage(): PredictionData {
        const storedPredictionData = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('predictionData') || '{}') : {};
        return storedPredictionData;
    }


    function onSubmit() {
        console.warn(predictionData)
        addFunds({ price: predictionData.totalAmount * 100 })
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
                                        <TableCell className="text-center py-4 font-inter text-[13px]">{predictionData.selectedOptions[key].join(',')}</TableCell>
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
                        <span className="text-[#2366BC] text-[13px]">{balance} €</span>

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
                                <p className="text-[#212121] text-[15px] font-inter font-semibold">{predictionData.totalAmount} €</p>
                            </div>
                        </div>

                        <button
                            onClick={onSubmit}
                            className={`bg-[#2366BC] ${loading ? "cursor-not-allowed bg-[#2366BC]/50" : ""} rounded-sm text-white font-inter font-semibold text-[16px] px-28 md:px-14 py-2 mt-10`}
                            disabled={loading}
                        >
                            Finish my order
                        </button>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}