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
import { getOrders, getUserBalance } from "@/lib/user";
import SuccessDialog from "../wallet/SuccessDialog";

interface PredictionData {
    selectedOptions: SelectedOptions
    totalAmount: number
    doublesCount: number
    triplesCount: number
}
export default async function Summary() {
    // Retrive selected option from local storage
    // {"Borussia Dortmund - At Madrid":["1"],"Rayo Vallecano - Getafe":["X"],"Mallorca - Real Madrid":["2","X"],"Las Palmas - Sevilla":["1","X"],"Granada - Alavés":["X","2"],"Athletic Club - Villarreal":["2","1"],"Sporting - Cartagena":["1","X"],"Andorra - Eibar":["X","2"],"Braga - Paços de Ferreira":["2","1"],"Sporting CP - Benfica":["1","X","2"],"Tondela - Estoril":["2","X"],"Maritimo - Belenenses":["X","1"],"Nacional - Belenenses":["X","2"],"Boavista - Santa Clara":["X","1"],"lastItem1":["1","2","M","0"],"lastItem2":["1","2"]}


    // React.useEffect(() => {
    //     const storedPredictionData = loadStoredPredictionDataFromLocalStorage();
    //     setPredictionData(storedPredictionData);
    // }, []);

    // function loadStoredPredictionDataFromLocalStorage(): PredictionData {
    //     const storedPredictionData = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('predictionData') || '{}') : {};
    //     return storedPredictionData;
    // }

    const user = await currentUser();
    const userBalance = await getUserBalance(user!.id);
    const firstUserBalance = userBalance[0] || {};
    const balance = firstUserBalance.balance || '0';
    const data = await getOrders(user!.id);

    return (
        <ContentLayout title="Dashboard">
            <div className=" bg-[#FBFCFD] font-inter">

                <Breadcrumb className="mt-10 bg-transparent">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>




                <div className="flex mt-10 gap-4">

                    <DataTable balance={balance} />



                </div>

            </div>
        </ContentLayout>
    )
}