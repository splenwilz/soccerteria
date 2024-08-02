'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Livescore({ maxHeight }: { maxHeight?: boolean }) {
    const demodata = [
        ['Borussia Dortmund', 'At Madrid'],
        ['Rayo Vallecano', 'Getafe'],
        ['Mallorca', 'Real Madrid'],
        ['Las Palmas', 'Sevilla'],
        ['Granada', 'Alavés'],
        ['Athletic Club', 'Villarreal'],
        ['Sporting', 'Cartagena'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],
        ['Andorra', 'Eibar'],

    ]


    return (
        <div className={`bg-[#E134340F] p-2 pl-3 pr-3 rounded-xl max-w-[700px]  ${maxHeight ? 'max-h-auto' : 'max-h-[825px]'}`}>
            <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#E13434]">Live Score</p>
            <Table className="bg-white rounded-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead className="bg-[#F9FAFB]">#</TableHead>
                        <TableHead colSpan={4} className="bg-[#F9FAFB] text-[12px] font-inter">ROUND: 52 (17/04/24)</TableHead>
                        <TableHead colSpan={5} className="bg-[#F9FAFB] text-[14px] font-inter">
                            Last update 13:00:35
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {demodata.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium pl-4 py-1 text-[12px]">{index + 1}</TableCell>
                            <TableCell className="font-medium text-[12px] p-1" colSpan={4}>{data[0]} - {data[1]}</TableCell>
                            <TableCell className="font-medium text-[12px] p-1 w-10">4 - 2</TableCell>
                            <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                            <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">X</button></TableCell>
                            <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                            <TableCell className="font-medium p-1 bg-[#B3B5B40F]"></TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="font-medium text-[12px] pl-4 py-1" rowSpan={2}>15</TableCell>
                        <TableCell className="font-medium text-[12px] p-1" colSpan={4}>Andorra - Eibar</TableCell>
                        <TableCell className="font-medium text-[12px] p-1">4 - 2</TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">0</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">M</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-[12px] p-1" colSpan={4}>Andorra - Eibar</TableCell>
                        <TableCell className="font-medium text-[12px] p-1">4 - 2</TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">0</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                        <TableCell className="p-1 bg-[#B3B5B40F]"><button className="px-[14.5px] text-[12px] py-2 hover:bg-[#E13434] hover:text-[#FFFFFF] font-semibold">M</button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

    )
}