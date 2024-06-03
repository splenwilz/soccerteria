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


import walleticon from "../../assets/images/walleticon.svg";
import Image from "next/image";
import { ChevronDown, Edit } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";


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
                            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>




                <div className="flex mt-10 gap-4">

                    <Card className="basis-2/3 ">
                        <CardContent>
                            <div className="flex justify-between mt-6 mx-6">
                                <DropdownMenu >
                                    <DropdownMenuTrigger>
                                        <div className="flex">
                                            <p className="text-[#212121] text-[14px] font-inter font-semibold">Your ticket 3</p>
                                            <ChevronDown className="ml-5 h-4 w-4 mt-[2px]" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Ticket 1
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Ticket 2
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Ticket 3
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Ticket 4
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <div className="flex gap-2 bg-[#F2F4FD52] border border-[#CED6F9] rounded-sm p-2">

                                    <Image src={walleticon} alt="walleticon" width={20} height={20} />
                                    <span className="text-[#212121] text-[13px]">Wallet:</span>
                                    <span className="text-[#2366BC] text-[13px]">8000.00 €</span>

                                </div>
                            </div>
                            <h2 className="text-[#2366BC] mt-5 text-[18px] text-center font-inter font-semibold mx-6">
                                Summer elGordo
                            </h2>
                            <div className="px-6 mt-10 overflow-y-auto h-[220px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">Number</TableHead>
                                            <TableHead className="text-center">Date</TableHead>
                                            <TableHead className="text-center">Total</TableHead>
                                            <TableHead className="text-center">Cost</TableHead>
                                            <TableHead className="text-center">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center py-4">02008(x2)</TableCell>
                                            <TableCell className="text-center py-4">Thursday, 16 May 2024</TableCell>
                                            <TableCell className="text-center py-4">2 x 10.00 €</TableCell>
                                            <TableCell className="text-center py-4">20.00 €</TableCell>
                                            <TableCell className="text-center py-4">
                                                <Edit className="h-4 w-4 text-[#BABBBC] ml-8" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="text-center py-4">02008(x2)</TableCell>
                                            <TableCell className="text-center py-4">Thursday, 16 May 2024</TableCell>
                                            <TableCell className="text-center py-4">2 x 10.00 €</TableCell>
                                            <TableCell className="text-center py-4">20.00 €</TableCell>
                                            <TableCell className="text-center py-4">
                                                <Edit className="h-4 w-4 text-[#BABBBC] ml-8" />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="text-center py-4">02008(x2)</TableCell>
                                            <TableCell className="text-center py-4">Thursday, 16 May 2024</TableCell>
                                            <TableCell className="text-center py-4">2 x 10.00 €</TableCell>
                                            <TableCell className="text-center py-4">20.00 €</TableCell>
                                            <TableCell className="text-center py-4">
                                                <Edit className="h-4 w-4 text-[#BABBBC] ml-8" />
                                            </TableCell>
                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="basis-1/3 ">
                        <CardContent>
                            <div className="flex flex-col justify-between">
                                <div className="">
                                    <p className="text-[#212121] text-[16px] font-inter font-semibold mx-3 mt-10">Payment resume</p>

                                    <div className="mt-5 flex justify-between mx-3 my-2">
                                        <p className="text-[#AFAFB4] text-[14px] font-inter">Total cost</p>
                                        <p className="text-[#212121] text-[18px] font-inter font-semibold">80.00 €</p>
                                    </div>
                                    <div className="mt-5 mb-3 flex justify-between mx-3 my-2">
                                        <p className="text-[#AFAFB4] text-[14px] font-inter">In your account</p>
                                        <p className="text-[#212121] text-[18px] font-inter font-semibold">80.00 €</p>
                                    </div>
                                    <SelectSeparator />
                                    <div className="mt-5 flex justify-between mx-3 my-2">
                                        <p className="text-[#AFAFB4] text-[14px] font-inter">Total to pay</p>
                                        <p className="text-[#212121] text-[18px] font-inter font-semibold">80.00 €</p>
                                    </div>
                                </div>

                                <button className="bg-[#2366BC] rounded-sm mt-20  text-white font-inter font-semibold text-[16px] px-28 md:px-14 py-2 mt-10">Finish my order</button>
                            </div>

                        </CardContent>
                    </Card>

                </div>

            </div>
        </div>
    )
}