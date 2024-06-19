import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import walleticon from "../../../../assets/images/walleticon.svg";
import emptywallet from "../../../../assets/images/emptywallet.svg";
import Image from "next/image";
import AddFunds from "./AddFunds";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PriceValue from "./PriceValue";
import { getOrders, getUser, getUserBalance } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import SuccessDialog from "../../../../components/SuccessDialog";
import { DataTable } from "./DataTable";
import { formatCurrency } from "@/lib/format_currency";
import { convertCurrency } from "@/lib/convert_currency";


export default async function Wallet() {
    const user = await currentUser();
    const userFromDb = await getUser(user!.id);
    const userBalance = await getUserBalance(user!.id);
    const firstUserBalance = userBalance[0] || {};
    const balance = firstUserBalance.balance || "0";
    const data = await getOrders(user!.id);
    const currentRate = await convertCurrency(1, 'EUR', userFromDb[0].currency || 'USD');

    return (
        <ContentLayout title="">
            <div className="px-20 bg-[#FBFCFD]">

                <Breadcrumb className="bg-transparent">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
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
                                    <span className="text-[#2366BC] text-[13px]">
                                        {formatCurrency({ amount: parseInt(balance || '0'), currency: userFromDb[0].currency || '' })}
                                    </span>
                                </div>
                            </div>

                            <PriceValue currentRate={currentRate} currency={userFromDb[0].currency || ''} />
                            <SuccessDialog />
                            <Tabs defaultValue="add_funds" className="w-full">
                                <div className="flex justify-center mt-5 mb-5">
                                    <TabsList className="justify-between items-center w-[80%] bg-transparent">
                                        <TabsTrigger value="add_funds">Add Funds</TabsTrigger>
                                        <TabsTrigger value="witdraw_funds" className=" ">Withdraw Funds</TabsTrigger>
                                        <TabsTrigger value="transaction_history">Transaction History</TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="add_funds">
                                    <AddFunds user={userFromDb[0]} />
                                </TabsContent>
                                <TabsContent value="witdraw_funds">
                                    <div className="flex justify-center flex-col items-center mt-10">
                                        <Image src={emptywallet} alt="emptywallet" width={150} height={150} />
                                        <h2 className="text-[#212121] text-[20px] font-inter font-semibold mt-5">No Transaction History</h2>
                                        <p className="text-[#83838A] text-[14px] mt-3">You currently have no transaction history.</p>
                                    </div>
                                </TabsContent>
                                <TabsContent value="transaction_history">
                                    <DataTable data={data} user={userFromDb[0]} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ContentLayout>
    )
}