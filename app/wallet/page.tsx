import Navigation from "@/components/Navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import walleticon from "../../assets/images/walleticon.svg";
import Image from "next/image";
import { ChevronDown, Edit } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import { Eye } from "lucide-react";
import AddFunds from "./AddFunds";

interface UpcomingDemo {
    id: string
    game: string
    date: string
    status: "pending" | "complete" | "cancel"
}

export default function Cart() {
    return (
        <div className="">
            <Navigation logo="logo2" clasName="bg-white text-black" />
            <div className="px-20 bg-[#FBFCFD] ">

                <Breadcrumb className="mt-10 bg-transparent">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Wallet</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>




                <div className="flex mt-10 gap-4">

                    <Card className="w-full">
                        <CardContent>
                            <div className="flex justify-between mt-6 mx-6">
                                <h2 className="text-[#2366BC] text-[22px] text-center font-inter font-semibold">Wallet</h2>

                                <div className="flex gap-2 bg-[#F2F4FD52] border border-[#CED6F9] rounded-sm p-2">

                                    <Image src={walleticon} alt="walleticon" width={20} height={20} />
                                    <span className="text-[#212121] text-[13px]">Wallet:</span>
                                    <span className="text-[#2366BC] text-[13px]">8000.00 €</span>

                                </div>
                            </div>

                            <Tabs defaultValue="add_funds" className="w-full">
                                <div className="flex justify-center mt-5 mb-5">
                                    <TabsList className="justify-between items-center w-[80%] bg-transparent">
                                        <TabsTrigger value="add_funds">Add Funds</TabsTrigger>
                                        <TabsTrigger value="witdraw_funds" className=" ">Witdraw Funds</TabsTrigger>
                                        <TabsTrigger value="transaction_history">Transaction History</TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="add_funds">
                                    <AddFunds />
                                </TabsContent>
                                <TabsContent value="witdraw_funds">


                                </TabsContent>
                                <TabsContent value="transaction_history">

                                </TabsContent>
                            </Tabs>

                        </CardContent>
                    </Card>



                </div>

            </div>
        </div>
    )
}