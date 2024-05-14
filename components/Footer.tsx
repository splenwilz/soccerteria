import Image from "next/image"
import footer_bg from "../assets/images/footer-bg.png"
import white_logo from "../assets/images/white_logo.png"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
export default function Footer() {
    return (
        <div className="bg-gradient-to-b from-[#1B2A58] to-[#202430] w-full h-full md:h-[350px] mt-32">
            <Image src={footer_bg} alt="Footer Background" className="w-full absolute z-0" />
            <div className="relative flex flex-col md:flex-row gap-16 justify-center items-center md:justify-between mx-auto max-w-[1200px]">
                <div className="flex flex-col justify-center items-center">
                    <Image src={white_logo} alt="Footer Logo" className=" mt-16" width={230} height={230} />
                    <p className="text-[15px] leading-6 mt-5 w-[380px] font-manrope text-[#FFFFFFB2]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s
                    </p>
                </div>
                <div className="flex gap-16 flex-col md:flex-row mb-20">
                    <div className="flex  gap-16">
                        <div className="relative flex flex-col md:mt-14 gap-5 text-white font-montserrat">
                            <Link href="/">Home</Link>
                            <Link href="/results">About Us</Link>
                            <Link href="/help">Contact US</Link>
                            <Link href="/my-account">Winners Page</Link>
                        </div>

                        <div className="relative flex flex-col md:mt-14 gap-5 text-white font-montserrat">
                            <Link href="/">FAQ</Link>
                            <Link href="/results">Terms Of Service</Link>
                            <Link href="/help">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="relative flex flex-col md:mt-14 gap-7 text-white font-montserrat">
                        <LanguageSelector />
                        <div className="flex">
                            <Phone className="text-[#FFFFFF] w-5 h-5" />
                            <Link href="/" className="text-[#FFFFFFB2] w-[200px] text-[14px] -mt-1 mx-2">96 333 49 27 / 603 761 934</Link>
                        </div>
                        <div className="flex">
                            <MapPin className="text-[#FFFFFF] w-5 h-5" />
                            <Link href="/results" className="text-[#FFFFFFB2] w-[200px] text-[14px] -mt-1 mx-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}