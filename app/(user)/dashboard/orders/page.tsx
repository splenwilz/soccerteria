import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye } from "lucide-react";

interface UpcomingDemo {
    id: string
    game: string
    date: string
    status: "pending" | "complete" | "cancel"
}

export default function OrdersPage() {
    const upcomingDemo: UpcomingDemo[] = [
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 16 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 17 May 2024",
            status: "complete",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 18 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 19 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 20 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 21 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 22 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 23 May 2024",
            status: "pending",
        },
        {
            id: "XPL 80668 DB",
            game: "Primitiva",
            date: "Thursday, 24 May 2024",
            status: "pending",
        },
    ]
    return (
        <ContentLayout title="">
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                    <div className="mb-8">
                        <h1 className="text-2xl my-2">Orders</h1>
                        <p className="text-muted-foreground text-[14px]">View your latest order right here!</p>
                    </div>

                    <Card>
                        <CardContent>
                            <Tabs defaultValue="upcoming" className="w-full">
                                <div className="flex justify-center mt-5 mb-5">
                                    <TabsList className="justify-between items-center w-[80%] bg-transparent">
                                        <TabsTrigger value="results">Results</TabsTrigger>
                                        <TabsTrigger value="upcoming" className=" ">Upcoming</TabsTrigger>
                                        <TabsTrigger value="all">All</TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="results">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center ">Game</TableHead>
                                                <TableHead className="text-center ">Date</TableHead>
                                                <TableHead className="text-center ">State</TableHead>
                                                <TableHead className="text-center ">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="mt-2">
                                            {upcomingDemo.map((upcoming) => (
                                                <TableRow key={upcoming.id}>
                                                    <TableCell className="text-center font-medium py-4">
                                                        <Link href="/draws/1" className="text-blue-600 text-[14px] underline">{upcoming.game}</Link>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">{upcoming.date}</TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <Badge variant={upcoming.status}>{upcoming.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Eye size={20} className="text-muted-foreground" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1" >View</Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1/edit">Edit</Link>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value="upcoming">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center ">Game</TableHead>
                                                <TableHead className="text-center ">Date</TableHead>
                                                <TableHead className="text-center ">State</TableHead>
                                                <TableHead className="text-center ">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="mt-2">
                                            {upcomingDemo.map((upcoming) => (
                                                <TableRow key={upcoming.id}>
                                                    <TableCell className="text-center font-medium py-4">
                                                        <Link href="/draws/1" className="text-blue-600 text-[14px] underline">{upcoming.game}</Link>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">{upcoming.date}</TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <Badge variant={upcoming.status}>{upcoming.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Eye size={20} className="text-muted-foreground" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1" >View</Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1/edit">Edit</Link>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>

                                </TabsContent>
                                <TabsContent value="all">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center ">Game</TableHead>
                                                <TableHead className="text-center ">Date</TableHead>
                                                <TableHead className="text-center ">State</TableHead>
                                                <TableHead className="text-center ">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="mt-2">
                                            {upcomingDemo.map((upcoming) => (
                                                <TableRow key={upcoming.id}>
                                                    <TableCell className="text-center font-medium py-4">
                                                        <Link href="/draws/1" className="text-blue-600 text-[14px] underline">{upcoming.game}</Link>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">{upcoming.date}</TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <Badge variant={upcoming.status}>{upcoming.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Eye size={20} className="text-muted-foreground" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1" >View</Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Link href="/draws/1/edit">Edit</Link>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TabsContent>
                            </Tabs>
                        </CardContent>

                    </Card>





                </TabsContent>
            </Tabs>
        </ContentLayout>
    )
}