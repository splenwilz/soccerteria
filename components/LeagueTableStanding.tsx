
'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LeagueTableProps } from "./LeagueTable"

import realmadrid from '../assets/images/realmadrid.png'
import Image from "next/image"
import { capitalizeTitle } from "@/lib/capitalize"
import { Entry } from "@/lib/types"

export interface LeagueTableStandingProps {
    horizontal?: boolean
    standings?: Entry[]
    standings2?: Entry[]
}
export default function LeagueTableStanding({ horizontal, standings, standings2 }: LeagueTableStandingProps) {
    return (
        <div className={`${horizontal ? 'flex flex-col w-full' : 'flex flex-col md:flex-row max-w-[708px]'}   gap-1 -mt-9 bg-[#FEEDDB]  rounded-md`}>
            <div className={`p-2 pl-3 pr-3 rounded-lg  ${horizontal ? 'w-full' : 'max-w-[470px]'} `}>
                <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#3A32A4]">FIRST DIVISION</p>

                <div className="h-[400px] overflow-y-auto">
                    <Table className="bg-white rounded-lg ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-1 pl-4 px-4">#</TableHead>
                                <TableHead className="p-1 px-4" >Team</TableHead>
                                <TableHead className="p-1 px-4">GP</TableHead>
                                <TableHead className="p-1 px-4">W</TableHead>
                                <TableHead className="p-1 px-4">D</TableHead>
                                <TableHead className="p-1 px-4">L</TableHead>
                                <TableHead className="p-1 px-4">F</TableHead>
                                <TableHead className="p-1 px-4">A</TableHead>
                                <TableHead className="p-1 px-4">GD</TableHead>
                                <TableHead className="p-1 px-4">P</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {standings && standings.map((record, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell className="font-medium pl-4 text-[12px] px-4">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-1" >
                                        <div className="flex gap-1 relative w-full">
                                            <Image src={record.team.logos[0].href} width={20} height={12} alt={record.team.displayName} className="absolute mt-1 " />
                                            <p className="mt-1 ml-6">{capitalizeTitle(record.team.displayName)}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">
                                        {record.stats[0].value}
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[7].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[6].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[1].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[5].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[4].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[2].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[3].value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>










                {/* <Table className="bg-white rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-1 pl-4 px-4">#</TableHead>
                            <TableHead className="p-1 px-4" >Team</TableHead>
                            <TableHead className="p-1 px-4">PL</TableHead>
                            <TableHead className="p-1 px-4">W</TableHead>
                            <TableHead className="p-1 px-4">D</TableHead>
                            <TableHead className="p-1 px-4">GF</TableHead>
                            <TableHead className="p-1 px-4">GA</TableHead>
                            <TableHead className="p-1 px-4">AVR</TableHead>
                            <TableHead className="p-1 px-4">PTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leagueTable.records.map((record, index) => (
                            <TableRow key={index + 1}>
                                <TableCell className="font-medium pl-4 text-[12px] px-4">{index + 1}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-1" >
                                    <div className="flex gap-1 relative w-full">
                                        <Image src={realmadrid} width={20} height={12} alt="" className="absolute mt-1 " />
                                        <p className="mt-1 ml-6">{capitalizeTitle(record.team)}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">
                                    {record.played}
                                </TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.win}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.draw}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.goalsFor}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.goalsAgainst}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.loss}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
            </div>

            <div className={`p-2 pl-3 pr-3 rounded-lg ${horizontal ? 'w-full' : 'max-w-[470px]'} `}>
                <p className="text-center font-inter font-bold text-[16px] pb-4 pt-1 text-[#3A32A4]">SECOND DIVISION</p>
                <div className="h-[400px] overflow-y-auto">
                    <Table className="bg-white rounded-lg ">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="p-1 pl-4 px-4">#</TableHead>
                                <TableHead className="p-1 px-4" >Team</TableHead>
                                <TableHead className="p-1 px-4">GP</TableHead>
                                <TableHead className="p-1 px-4">W</TableHead>
                                <TableHead className="p-1 px-4">D</TableHead>
                                <TableHead className="p-1 px-4">L</TableHead>
                                <TableHead className="p-1 px-4">F</TableHead>
                                <TableHead className="p-1 px-4">A</TableHead>
                                <TableHead className="p-1 px-4">GD</TableHead>
                                <TableHead className="p-1 px-4">P</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {standings2 && standings2.map((record, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell className="font-medium pl-4 text-[12px] px-4">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-1" >
                                        <div className="flex gap-1 relative w-full">
                                            <Image src={record.team.logos[0].href} width={20} height={12} alt={record.team.displayName} className="absolute mt-1 " />
                                            <p className="mt-1 ml-6">{capitalizeTitle(record.team.displayName)}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">
                                        {record.stats[0].value}
                                    </TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[7].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[6].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[1].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[5].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[4].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[2].value}</TableCell>
                                    <TableCell className="font-medium text-[12px] p-1 px-4">{record.stats[3].value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>


                {/* <Table className="bg-white rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-1 pl-4 px-4">#</TableHead>
                            <TableHead className="p-1 px-4">Team</TableHead>
                            <TableHead className="p-1 px-4">PL</TableHead>
                            <TableHead className="p-1 px-4">W</TableHead>
                            <TableHead className="p-1 px-4">D</TableHead>
                            <TableHead className="p-1 px-4">GF</TableHead>
                            <TableHead className="p-1 px-4">GA</TableHead>
                            <TableHead className="p-1 px-4">AVR</TableHead>
                            <TableHead className="p-1 px-4">PTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leagueTable.records.map((record, index) => (
                            <TableRow key={index + 1}>
                                <TableCell className="font-medium pl-4 text-[12px] px-4">{index + 1}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-1">
                                    <div className="flex gap-1 relative w-full">
                                        <Image src={realmadrid} width={20} height={12} alt="" className="absolute mt-1 " />
                                        <p className="mt-1 ml-6">{record.team}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.played}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.win}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.draw}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.goalsFor}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.goalsAgainst}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.loss}</TableCell>
                                <TableCell className="font-medium text-[12px] p-1 px-4">{record.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
            </div>

        </div>
    )
}