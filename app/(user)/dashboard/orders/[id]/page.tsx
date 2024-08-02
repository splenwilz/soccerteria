import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import DataTable from "./DataTable";
import { currentUser } from "@clerk/nextjs/server";
import { getOrderById, getUser, getUserBalance } from "@/lib/user";
import { convertCurrency } from "@/lib/convert_currency";
import { formatOrderId } from "@/lib/format_id";

export default async function Page({ params }: { params: { id: string } }) {
    const order = await getOrderById(params.id);
    if (!order) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-xl">Order not found</p>
            </div>
        );
    }
    const user = await currentUser();
    const userFromDB = await getUser(user!.id);
    const currentRate = await convertCurrency(1, 'EUR', userFromDB[0].currency || 'USD');

    const userBalance = await getUserBalance(user!.id);
    const firstUserBalance = userBalance[0] || {};
    const balance = firstUserBalance.balance || '0';

    return (
        <ContentLayout title="Dashboard">
            <div className=" bg-[#FBFCFD] font-inter">
                <div className="flex justify-between">
                    <Breadcrumb className="mt-10 bg-transparent">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/orders">Orders</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="uppercase">{formatOrderId(order.id)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex gap-4 mt-10">
                    <DataTable user={userFromDB[0]} balance={balance} currentRate={currentRate} order={order} predictionData={order.gameOptions || { selectedOptions: {}, doublesCount: 0, totalAmount: 0, triplesCount: 0 }} />
                </div>
            </div>
        </ContentLayout>
    )
}