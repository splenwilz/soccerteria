'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BoltIcon, XMarkIcon } from "@heroicons/react/16/solid"

export default function Prediction() {
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
        ['Andorra', 'Eibar']
    ]
    return (
        <div className="bg-[#F1F0FE] p-2 pl-3 pr-3 rounded-lg max-w-[700px] sm:max-w-[700px] md:max-w-[400px] xl:max-w-[700px]">
            <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#3A32A4]">Prediction</p>
            <Table className="bg-white rounded-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">#</TableHead>
                        <TableHead>Prediction</TableHead>
                        <TableHead>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M3.22 7.595a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-3.25 3.25Zm8.25-3.25-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
                            </svg>
                        </TableHead>
                        <TableHead className="text-center">1</TableHead>
                        <TableHead className="pl-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-right">
                                <path fillRule="evenodd" d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                            </svg>
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {demodata.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium pl-4 py-1 text-[12px]">{index + 1}</TableCell>
                            <TableCell className="font-medium text-[12px] p-1">{data[0]} - {data[1]}</TableCell>
                            <TableCell className="p-1"><button className="rounded-full px-[14.5px] text-[12px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                            <TableCell className="p-1"><button className="rounded-full px-[14.5px] text-[12px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">X</button></TableCell>
                            <TableCell className="p-1"><button className="rounded-full px-[14.5px] text-[12px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                            <TableCell className="font-medium"></TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell className="font-medium pl-4 text-[12px]" rowSpan={2}>15</TableCell>
                        <TableCell className="font-medium text-[12px] p-1">Andorra - Eibar</TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">0</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[13.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">M</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium text-[12px] p-1">Andorra - Eibar</TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">0</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">1</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">2</button></TableCell>
                        <TableCell className="p-1"><button className="rounded-full text-[12px] px-[13.5px] py-2 border border-[#00B660] hover:bg-[#00B660] hover:text-[#FFFFFF] font-semibold">M</button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex mt-5 gap-4 w-96 mx-auto">
                <button className="bg-[#CEFFE8] w-12 h-12 rounded-sm p-2 hover:bg-[#baeed6]">
                    <BoltIcon className="w-6 h-6 text-center ml-1" />
                </button>
                <button className="bg-[#FFFFFF99] w-32 h-12 rounded-sm p-2 hover:bg-[#FFFFFF71] font-semibold">Double 0</button>
                <button className="bg-[#FFFFFF99] w-32 h-12 rounded-sm p-2 font-semibold">Triple 0</button>
                <button className="bg-[#FFD1D5] w-12 h-12 rounded-sm p-2">
                    <XMarkIcon className="w-6 h-6 text-center ml-1 text-[#D6293A]" />
                </button>
            </div>
            <div className="mt-5 rounded-sm bg-white flex max-w-[580px] lg:w-[580px] pt-3 pb-3">
                <div className="mx-auto flex flex-col lg:flex-row gap-3 lg:gap-10">
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p className="text-[12px] font-inter">Bet</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">02</p>
                        </div>
                        <div className="">
                            <p className="text-[12px] font-inter">Amount</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">105.00 M€</p>
                        </div>
                        <div className="">
                            <p className="text-[12px] font-inter">Draw Date</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">21/04/2024</p>
                        </div>
                    </div>
                    <button className="bg-[#2366BC] text-white font-inter font-semibold text-[16px] px-7 py-2 rounded-sm">Play Now</button>
                </div>
            </div>
        </div>

    )
}