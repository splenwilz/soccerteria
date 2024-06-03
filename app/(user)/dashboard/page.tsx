import Image from "next/image"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import soccerball from "../../../assets/images/soccerball.svg";
import ordersicon from "../../../assets/images/ordersicon.svg";
import walleticon from "../../../assets/images/walleticon.svg";
import communicationicon from "../../../assets/images/communicationicon.svg";
import combinationicon from "../../../assets/images/combinationicon.svg";
import supporticon from "../../../assets/images/supporticon.svg";
import profileicon from "../../../assets/images/profileicon.svg";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/utils/dbConfig";

interface Order {
    id: string
    date: string
    status: "pending" | "complete" | "cancel"
    total: number
}

export default async function DashboardPage() {

    const demoOrders: Order[] = [
        {
            id: "XPL 80668 DB",
            date: "14-May-2024",
            status: "pending",
            total: 2050.00
        },
        {
            id: "XPL 80668 DB",
            date: "14-May-2024",
            status: "complete",
            total: 2050.00
        },
        {
            id: "XPL 80668 DB",
            date: "14-May-2024",
            status: "complete",
            total: 2050.00
        },
        {
            id: "XPL 80668 DB",
            date: "14-May-2024",
            status: "cancel",
            total: 2050.00
        }

    ]

    async function fetchUserWallets() {
        const users = await db.query.UserSchema.findMany({
            columns: {
                email: true
            },
            with: { wallet: true }
        })

        console.log(users)
    }

    fetchUserWallets()
    return (
        <ContentLayout title="Dashboard">
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <div className="mb-8">
                        <h1 className="text-2xl my-2">Cibeles Veterinario</h1>
                        <p className="text-muted-foreground text-[14px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={soccerball} alt="logo" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Draws</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/draws"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5">
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Result</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">No results of draws held during the last week</p>
                                        </div>

                                        <button className="rounded-sm mt-8 mb-5 border border-[#2366BC] text-[#2366BC] font-inter text-[16px] px-14 py-2">
                                            Draws
                                        </button>

                                    </div>
                                    <div className="mx-5 w-[1px] h-[190px] bg-[#2366BC80] opacity-65 my-2"></div>
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Upcoming</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">You are not playing in any draw</p>
                                        </div>
                                        <button className="rounded-sm mt-8 mb-5 bg-[#2366BC] text-white font-inter  text-[16px] px-14 py-2">Play now</button>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={ordersicon} alt="logo" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Orders</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/orders"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>
                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="">
                                    <h3 className="font-inter font-medium mb-2">Latest orders</h3>
                                </div>

                                {demoOrders.map((order, index) => (
                                    <div key={index} className="flex justify-between mt-5">
                                        <div className="flex justify-between flex-col ">
                                            <div className="relative flex flex-row justify-between">
                                                <div className="flex gap-1">
                                                    <span className="font-inter text-[#83838A] text-[12px]">{order.date}</span>
                                                    <span className="h-4 w-1"></span>
                                                    <span className="font-inter text-[#000000] font-semibold text-[12px] mr-2 underline">{order.id}</span>
                                                    <Badge variant={order.status} className="-mt-[2px] ">{order.status}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <p className=" font-inter text-[#000000] font-medium text-[12px] ">{order.total} €</p>
                                    </div>
                                ))}
                                {/* <div className="flex justify-between mt-5">
                                    <div className="flex justify-between flex-col ">
                                        <div className="relative flex flex-row justify-between">
                                            <div className="flex gap-1">
                                                <span className="font-inter text-[#83838A] text-[12px]">14-May-2024</span>
                                                <span className="h-4 w-1"></span>
                                                <span className="font-inter text-[#000000] font-semibold text-[12px] mr-2 underline">XPL 80668 DB</span>
                                                <Badge variant="pending" className="-mt-[2px] ">Pending</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <p className=" font-inter text-[#000000] font-medium text-[12px] ">2050.00 €</p>
                                </div>

                                <div className="flex justify-between mt-3">
                                    <div className="flex justify-between flex-col ">
                                        <div className="relative flex flex-row justify-between">
                                            <div className="flex gap-1">
                                                <span className="font-inter text-[#83838A] text-[12px]">14-May-2024</span>
                                                <span className="h-4 w-1"></span>
                                                <span className="font-inter text-[#000000] font-semibold text-[12px] mr-2 underline">XPL 80668 DB</span>
                                                <Badge variant="success" className="-mt-[2px] ">Complete</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <p className=" font-inter text-[#000000] font-medium text-[12px] ">2050.00 €</p>
                                </div> */}
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={walleticon} alt="walleticon" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Wallet</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/draws"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5">
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Balance</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </p>
                                            <p className="text-[#6DB46D] text-center mt-5 font-inter font-medium text-[40px]">2050.00 €</p>
                                        </div>


                                    </div>
                                    <div className="mx-5 w-[1px] h-[190px] bg-[#2366BC80] opacity-65 my-2"></div>
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Manage your wallet</h3>
                                            <ul className="list-disc mt-5 ml-8">
                                                <li className="text-[#2366BC] underline text-[16px] font-semibold mt-[15px]"><Link href={"/balance"}>Balance history </Link></li>
                                                <li className="text-[#2366BC] underline text-[16px] font-semibold mt-[15px]"><Link href={"/deposit"}>Deposit </Link></li>
                                                <li className="text-[#2366BC] underline text-[16px] font-semibold mt-[15px]"><Link href={"/preference"}>Preference</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={communicationicon} alt="communicationicon" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Communication</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/draws"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5">
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Preferences</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </p>

                                        </div>
                                        <Link className="flex gap-2 text-[#2366BC] underline font-semibold text-[14px] text-center" href={"/Preferences"}>Preferences</Link>


                                    </div>
                                    <div className="mx-5 w-[1px] h-[190px] bg-[#2366BC80] opacity-65 my-2"></div>
                                    <div className="basis-1/2 flex justify-between flex-col">
                                        <div className="">

                                            <h3 className="font-inter font-medium mb-2">Notifications</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </p>
                                        </div>
                                        <Link className="flex gap-2 text-[#2366BC] underline font-semibold text-[14px] text-center" href={"/notifications"}>Notifications</Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={profileicon} alt="profileicon" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Profile</p>
                                    </div>

                                </div>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5 justify-between flex-col">
                                    <div className="flex">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" className="h-20 w-20" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-5">
                                            <h3 className="font-inter font-medium ">Cibeles Veterinario</h3>
                                            <p className="font-inter text-[#83838A] text-[14px]">
                                                tranthuy.nute@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                    <button className="rounded-sm mt-16 mb-1 border border-[#2366BC] text-[#2366BC] font-inter text-[16px] px-14 py-2">
                                        Draws
                                    </button>
                                </div>


                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={combinationicon} alt="combinationicon" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Combination</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/draws"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5 justify-between flex-col">
                                    <div className="">

                                        <h3 className="font-inter font-medium mb-2">Favourite</h3>
                                        <p className="font-inter text-[#83838A] text-[14px]">
                                            No Favorites
                                        </p>
                                    </div>
                                    <button className="rounded-sm mt-14 mb-1 border border-[#2366BC] text-[#2366BC] font-inter text-[16px] px-14 py-2">
                                        Favorites
                                    </button>
                                </div>


                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex justify-between">
                                    <div className="flex gap-2 ">
                                        <div className="border bg-[#F2F7FD] border-[#CFDDEF] p-1 px-2 rounded-sm h-6 ">
                                            <Image src={supporticon} alt="supporticon" className=" " width={15} height={15} />
                                        </div>
                                        <p className="text-2xl font-inter font-bold -mt-1">Support</p>
                                    </div>

                                </div>
                                <Link className="flex gap-2" href={"/draws"}>
                                    <p className="text-sm font-inter text-muted-foreground -mt-1">View</p>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>

                            </CardHeader>
                            <div className="mx-5 h-[1px] bg-[#EAEAEA] opacity-65 my-2"></div>

                            <CardContent>
                                <div className="flex mt-5 justify-between flex-col">
                                    <div className="">

                                        <h3 className="font-inter font-medium mb-2">Requests</h3>
                                        <p className="font-inter text-[#83838A] text-[14px]">
                                            No Requests
                                        </p>
                                    </div>
                                    <button className="rounded-sm mt-14 mb-1 border border-[#2366BC] text-[#2366BC] font-inter text-[16px] px-14 py-2">
                                        Requests
                                    </button>
                                </div>


                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </ContentLayout>
    );
}
