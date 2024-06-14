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
import { getUser } from "@/lib/user";


// export default async function ProfilePage() {
//     const userId = await currentUser()
//     const user = await getUser(userId?.id!)
//     return (
//         <ContentLayout title="">
//             <Card>
//                 <CardContent>
//                     <ProfileForm user={user} />
//                 </CardContent>
//             </Card>
//         </ContentLayout>
//     )
// }

export default async function ProfilePage() {
    const userId = await currentUser()
    const user = await getUser(userId?.id!)
    // if (!user || user.length === 0) {
    //     return null // or render an error message
    // }
    const [profileUser] = user // extract the first user from the array
    return (
        <ContentLayout title="Profile">
            <Card>
                <CardContent>
                    <ProfileForm user={profileUser} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}