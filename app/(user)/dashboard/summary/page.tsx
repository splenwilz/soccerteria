import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import React from "react";
import { SelectedOptions } from "@/components/Prediction";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DataTable from "./DataTable";
import { currentUser } from "@clerk/nextjs/server";
import { getOrders, getUser, getUserBalance } from "@/lib/user";
import SuccessDialog from "../../../../components/SuccessDialog";
import { convertCurrency } from "@/lib/convert_currency";

interface PredictionData {
    selectedOptions: SelectedOptions
    totalAmount: number
    doublesCount: number
    triplesCount: number
}
export default async function Summary() {
    const user = await currentUser();
    const userFromDB = await getUser(user!.id);
    const userBalance = await getUserBalance(user!.id);
    const firstUserBalance = userBalance[0] || {};
    const balance = firstUserBalance.balance || '0';
    const data = await getOrders(user!.id);
    const currentRate = await convertCurrency(1, 'EUR', userFromDB[0].currency || 'USD');

    return (
        <ContentLayout title="Dashboard">
            <div className=" bg-[#FBFCFD] font-inter">

                <Breadcrumb className="mt-10 bg-transparent">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Summary</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex mt-10 gap-4">

                    <DataTable balance={balance} currentRate={currentRate} user={userFromDB[0]} />



                </div>

            </div>
        </ContentLayout>
    )
}