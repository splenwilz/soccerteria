import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/lib/user";
import dynamic from "next/dynamic";

// Dynamically import CalendarForm
const ProfileForm = dynamic(() => import("./Profile"));

export default async function ProfilePage() {
    const userId = await currentUser()
    const user = await getUser(userId?.id!)
    const [profileUser] = user
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