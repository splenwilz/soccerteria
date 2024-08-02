import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ticket1 from "@/assets/images/ticket1.png"
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
import Image from "next/image";
import CountDownTime from "@/components/CountDownTime";
import UpcomingCountTime from "@/components/UpcomingCountTime";
import { fetchLaLigaStandings, getMatchList } from "@/lib/user";
import Prediction from "@/components/Prediction";
import Livescore from "@/components/Livescore";
import LeagueTable from "@/components/LeagueTable";
import LeagueTableStanding from "@/components/LeagueTableStanding";
import { format } from "date-fns";


export default async function Upcoming() {
    const matchList = await getMatchList()
    const laliga1 = await fetchLaLigaStandings({ division: 'first' })
    const laliga2 = await fetchLaLigaStandings({ division: 'second' })
    const demoData = {
        records: [
            {
                team: "Real Madrid",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Barcelona",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Sevilla",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Getafe",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "At Madrid",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Villarreal",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Cartagena",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },
            {
                team: "Eibar",
                played: 5,
                win: 2,
                draw: 1,
                loss: 2,
                goalsFor: 10,
                goalsAgainst: 7,
                points: 7,
            },

        ],
    }

    return (
        <ContentLayout title="">
            <div className="mb-8">
                <h1 className="text-2xl my-2">Upcomings</h1>
                <p className="text-muted-foreground text-[14px]">Upcoming games</p>
            </div>
            <UpcomingCountTime
                time={matchList?.[0]?.gameDate ? format(new Date(matchList[0].gameDate), 'yyyy-MM-dd') : ''}
                jackpot={matchList?.[0]?.jackpot || "0"}
            />
            <div className="mt-10"></div>
            <Prediction matchList={matchList} maxWidth />
            <div className="flex flex-col sm:flex-row gap-5 mt-8">
                <div className="basis-1/2">
                    <Livescore maxHeight />
                </div>
                <div className="basis-1/2 mt-10">
                    <LeagueTableStanding
                        standings={laliga1?.children[0]?.standings?.entries}
                        standings2={laliga2?.children[0]?.standings?.entries}
                        // leagueTable={demoData}
                        horizontal
                    />
                </div>
            </div>
        </ContentLayout>
    )
}