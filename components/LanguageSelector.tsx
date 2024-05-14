'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"
export default function LanguageSelector() {
    return (
        <Select >
            <SelectTrigger className="w-32 bg-[#FFFFFF1F]">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder="English" className="bg-[#E7E7E7]" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
        </Select>
    )
}  