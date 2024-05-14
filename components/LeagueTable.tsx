
'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import realmadrid from '../assets/images/realmadrid.png'
import { useEffect, useState } from "react"
import whirl from '../assets/images/whirl.png'

export interface LeagueTableProps {
    records: Array<{
        team: string;
        played: number;
        win: number;
        draw: number;
        loss: number;
        goalsFor: number;
        goalsAgainst: number;
        points: number;
    }>;
}


export default function LeagueTable() {
    // Create a demodata for spanish league table
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
    const [leagueTable, setLeagueTable] = useState<LeagueTableProps>(demoData)

    // Array for Category and Prizes
    const prizesDistributed = [
        { category: "Full to 15", prize: "0€" },
        { category: "14 Successes", prize: "0€" },
        { category: "13 Successes", prize: "09.413,25 €" },
        { category: "12 Successes", prize: "700,99 €" },
        { category: "11 Successes", prize: "81,45 €" },
        { category: "10 Successes", prize: "14,54 €" },
        { category: "Elige 8(8 Hits)", prize: "4.238,96 €" }
    ]



    return (
        <div className=" flex flex-col-reverse lg:flex-row mx-auto max-w-[400px] md:max-w-[700px] lg:max-w-[1200px] gap-10">
            <div className="flex flex-col md:flex-row gap-1 mt-0 md:mt-8 bg-[#FEEDDB] max-w-[708px] rounded-md">
                <div className="p-2 pl-3 pr-3 rounded-lg max-w-[470px]">
                    <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#3A32A4]">FIRST DIVISION</p>
                    <Table className="bg-white rounded-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-1 pl-4">#</TableHead>
                                <TableHead className="p-1">Team</TableHead>
                                <TableHead className="p-1">PL</TableHead>
                                <TableHead className="p-1">W</TableHead>
                                <TableHead className="p-1">D</TableHead>
                                <TableHead className="p-1">GF</TableHead>
                                <TableHead className="p-1">GA</TableHead>
                                <TableHead className="p-1">AVR</TableHead>
                                <TableHead className="p-1">PTS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leagueTable.records.map((record, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell className="font-medium pl-4 text-[12px]">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 flex">
                                        <Image src={realmadrid} width={20} height={12} alt="" className="mr-1" />
                                        <p className="mt-1">{record.team}</p>
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.played}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.win}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.draw}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.goalsFor}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.goalsAgainst}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.loss}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.points}</TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </div>

                <div className=" p-2 pl-3 pr-3 rounded-lg max-w-[470px]">
                    <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#3A32A4]">SECOND DIVISION</p>
                    <Table className="bg-white rounded-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-1 pl-4">#</TableHead>
                                <TableHead className="p-1">Team</TableHead>
                                <TableHead className="p-1">PL</TableHead>
                                <TableHead className="p-1">W</TableHead>
                                <TableHead className="p-1">D</TableHead>
                                <TableHead className="p-1">GF</TableHead>
                                <TableHead className="p-1">GA</TableHead>
                                <TableHead className="p-1">AVR</TableHead>
                                <TableHead className="p-1">PTS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leagueTable.records.map((record, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell className="font-medium pl-4 text-[12px]">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 flex">
                                        <Image src={realmadrid} width={20} height={12} alt="" className="mr-1" />
                                        <p className="mt-1">{record.team}</p>
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.played}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.win}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.draw}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.goalsFor}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.goalsAgainst}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.loss}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1">{record.points}</TableCell>
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </div>

            </div>
            <div className="prize_destribution mt-10 lg:-mt-20">
                <div className=" p-2 pl-3 pr-3 rounded-lg max-w-[400px] bg-[#E3F0FF]">
                    <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#0B3F7C]">PRIZES DISTRIBUTED</p>
                    <Table className="bg-white rounded-lg">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-3 pl-4 text-[12px] text-[#121212]">CATEGORY</TableHead>
                                <TableHead className="p-3 pl-4 pr-4 text-[12px] text-[#121212]">PRIZE DISTRIBUTED</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prizesDistributed.map((prize, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell className="font-medium p-3 pl-4 text-[12px]">{prize.category}</TableCell>
                                    <TableCell className="font-medium p-3 pl-4 text-[12px] text-center text-[#0B3F7C]">
                                        {prize.prize}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Image src={whirl} alt="" className="absolute pt-80 right-0" width={170} height={170} />
        </div>
    )
}