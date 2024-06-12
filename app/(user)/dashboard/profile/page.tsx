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
import AddFunds from "../wallet/AddFunds";
import ProfileForm from "./Profile";
import { currentUser } from "@clerk/nextjs/server";
// import ProfileForm from "./Profile";

interface UpcomingDemo {
    id: string
    game: string
    date: string
    status: "pending" | "complete" | "cancel"
}

export default async function ProfilePage() {
    const user = await currentUser()
    return (
        <ContentLayout title="">
            <Card>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}