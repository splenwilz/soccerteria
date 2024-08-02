import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";
import { getMatchList, getUser } from "@/lib/user";
import dynamic from "next/dynamic";

// Dynamically import CalendarForm
const CalendarForm = dynamic(() => import("./matchList"));

export default async function Content() {
    const userId = await currentUser()
    const user = await getUser(userId?.id!)
    const [profileUser] = user
    const matchList = await getMatchList()
    return (
        <ContentLayout title="Add Match List">
            <Card>
                <CardContent>
                    <CalendarForm user={profileUser} matchList={matchList} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}