'use client'
import Image from "next/image";
import logo1 from '../assets/images/demosport.png'
import logo2 from '../assets/images/logo2.png'
import logolight from '../assets/images/logolight.png'
import Link from "next/link";
import { ChevronRight, MenuIcon, ShoppingCart } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

interface NavigationProps {
    clasName?: string
    logo: string | 'logo1'
}

export default function Navigation(props: NavigationProps) {
    return (
        <nav className={cn(`bg-[rgba(0,0,0,0.92)] flex flex-row justify-between p-8 pb-5 border  ${props.logo === 'logo1' ? 'border-[#8a8a8a]' : 'border-[#BAE1FF]'} border-t-0 border-l-0 border-r-0 border-b-[1px] w-full`, props.clasName)}>
            <div className="logo_container ml-0 lg:ml-10 relative z-40">
                <Image src={props.logo === 'logo1' ? logo1 : logo2} alt="Soccerteria Logo" width={120} height={50} />
            </div>
            <div className=" hidden lg:flex">
                <ul className={`${props.logo === 'logo1' ? 'text-white' : 'text-black'} hidden md:flex  gap-6 text-[14px] font-inter relative z-50`}>
                    <li >
                        <Link href="/">Home</Link>
                    </li>
                    <div className="border-0 bg-[#E7E7E7] w-[1px] mt-[2px] h-[18px] "></div>
                    <li >
                        <Link href="/results">Results</Link>
                    </li>
                    <div className="border-0 bg-[#E7E7E7] w-[1px] mt-[2px] h-[18px] "></div>
                    <li >
                        <Link href="/shop">Shop</Link>
                    </li>
                    <div className="border-0 bg-[#E7E7E7] w-[1px] mt-[2px] h-[18px] "></div>
                    <li >
                        <Link href="/help">Info & Help</Link>
                    </li>
                    <div className="border-0 bg-[#E7E7E7] w-[1px] mt-[2px] h-[18px] "></div>
                    <li >
                        <Link href="/my-account">My Account</Link>
                    </li>
                    <div className="border-0 bg-[#E7E7E7] w-[1px] mt-[2px] h-[18px] "></div>
                </ul>
                <ShoppingCart className={`${props.logo === 'logo1' ? 'text-white' : 'text-black'} mx-10 w-4 relative z-50`} />
                <button className="-mt-1 text-white cursor-pointer bg-[#2366BC] text-[13px] font-inter pt-2 pb-2 pr-6 pl-6 rounded-sm mr-20 relative z-50">
                    <Link href={'/sign-in'}>Login</Link>
                </button>
                <UserButton />
            </div>
            <div className="block lg:hidden">
                <Popover >
                    <PopoverTrigger className="text-white relative z-40">
                        <MenuIcon id="menuhamburger" className={`w-12 h-6 ${props.logo === 'logo1' ? 'text-white' : 'text-black'}`} />
                    </PopoverTrigger>
                    <PopoverContent className=" -mt-16">
                        <div className="flex justify-between mb-5">
                            <Image src={logolight} alt="Soccerteria Logo" className="w-20" />
                            <XMarkIcon className={`w-6 h-6 border cursor-pointer p-1 rounded-full `} onClick={() => {
                                const menuhamburger = document.getElementById('menuhamburger')
                                if (menuhamburger) {
                                    const clickEvent = new MouseEvent('click', {
                                        view: window,
                                        bubbles: true,
                                        cancelable: true
                                    })
                                    menuhamburger.dispatchEvent(clickEvent)
                                }
                            }} />
                        </div>
                        <div className="flex justify-between font-inter mb-4 pb-2 border-b-[0.5px] border-[#EDEDED]">
                            <Link href="/" className="text-[14px] text-[#121212] tracking-tighter font-medium">Home</Link>
                            <svg className="mt-[6px]" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.939739 12.28C0.813073 12.28 0.686406 12.2333 0.586406 12.1333C0.393073 11.94 0.393073 11.62 0.586406 11.4267L4.93307 7.08001C5.25307 6.76001 5.25307 6.24001 4.93307 5.92001L0.586406 1.57335C0.393073 1.38001 0.393073 1.06001 0.586406 0.86668C0.77974 0.673346 1.09974 0.673346 1.29307 0.86668L5.63974 5.21335C5.97974 5.55335 6.17307 6.01335 6.17307 6.50001C6.17307 6.98668 5.98641 7.44668 5.63974 7.78668L1.29307 12.1333C1.19307 12.2267 1.06641 12.28 0.939739 12.28Z" fill="#949494" />
                            </svg>
                        </div>
                        <div className="flex justify-between font-inter mb-4 pb-2 border-b-[0.5px] border-[#EDEDED]">
                            <Link href="/" className="text-[14px] text-[#121212] tracking-tighter font-medium">Shop</Link>
                            <svg className="mt-[6px]" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.939739 12.28C0.813073 12.28 0.686406 12.2333 0.586406 12.1333C0.393073 11.94 0.393073 11.62 0.586406 11.4267L4.93307 7.08001C5.25307 6.76001 5.25307 6.24001 4.93307 5.92001L0.586406 1.57335C0.393073 1.38001 0.393073 1.06001 0.586406 0.86668C0.77974 0.673346 1.09974 0.673346 1.29307 0.86668L5.63974 5.21335C5.97974 5.55335 6.17307 6.01335 6.17307 6.50001C6.17307 6.98668 5.98641 7.44668 5.63974 7.78668L1.29307 12.1333C1.19307 12.2267 1.06641 12.28 0.939739 12.28Z" fill="#949494" />
                            </svg>
                        </div>
                        <div className="flex justify-between font-inter mb-4 pb-2 border-b-[0.5px] border-[#EDEDED]">
                            <Link href="/" className="text-[14px] text-[#121212] tracking-tighter font-medium">Result</Link>
                            <svg className="mt-[6px]" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.939739 12.28C0.813073 12.28 0.686406 12.2333 0.586406 12.1333C0.393073 11.94 0.393073 11.62 0.586406 11.4267L4.93307 7.08001C5.25307 6.76001 5.25307 6.24001 4.93307 5.92001L0.586406 1.57335C0.393073 1.38001 0.393073 1.06001 0.586406 0.86668C0.77974 0.673346 1.09974 0.673346 1.29307 0.86668L5.63974 5.21335C5.97974 5.55335 6.17307 6.01335 6.17307 6.50001C6.17307 6.98668 5.98641 7.44668 5.63974 7.78668L1.29307 12.1333C1.19307 12.2267 1.06641 12.28 0.939739 12.28Z" fill="#949494" />
                            </svg>
                        </div>
                        <div className="flex justify-between font-inter mb-4 pb-2 border-b-[0.5px] border-[#EDEDED]">
                            <Link href="/" className="text-[14px] text-[#121212] tracking-tighter font-medium">Info & Help</Link>
                            <svg className="mt-[6px]" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.939739 12.28C0.813073 12.28 0.686406 12.2333 0.586406 12.1333C0.393073 11.94 0.393073 11.62 0.586406 11.4267L4.93307 7.08001C5.25307 6.76001 5.25307 6.24001 4.93307 5.92001L0.586406 1.57335C0.393073 1.38001 0.393073 1.06001 0.586406 0.86668C0.77974 0.673346 1.09974 0.673346 1.29307 0.86668L5.63974 5.21335C5.97974 5.55335 6.17307 6.01335 6.17307 6.50001C6.17307 6.98668 5.98641 7.44668 5.63974 7.78668L1.29307 12.1333C1.19307 12.2267 1.06641 12.28 0.939739 12.28Z" fill="#949494" />
                            </svg>
                        </div>
                        <div className="flex justify-between font-inter mb-4 pb-2 border-b-[0.5px] border-[#EDEDED]">
                            <Link href="/" className="text-[14px] text-[#121212] tracking-tighter font-medium">My Account</Link>
                            <svg className="mt-[6px]" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.939739 12.28C0.813073 12.28 0.686406 12.2333 0.586406 12.1333C0.393073 11.94 0.393073 11.62 0.586406 11.4267L4.93307 7.08001C5.25307 6.76001 5.25307 6.24001 4.93307 5.92001L0.586406 1.57335C0.393073 1.38001 0.393073 1.06001 0.586406 0.86668C0.77974 0.673346 1.09974 0.673346 1.29307 0.86668L5.63974 5.21335C5.97974 5.55335 6.17307 6.01335 6.17307 6.50001C6.17307 6.98668 5.98641 7.44668 5.63974 7.78668L1.29307 12.1333C1.19307 12.2267 1.06641 12.28 0.939739 12.28Z" fill="#949494" />
                            </svg>
                        </div>
                        <div className="flex">
                            <button className="rounded-sm mb-3 bg-[#2366BC] text-white font-inter font-semibold text-[16px] px-[72px] py-2">Login</button>
                            <ShoppingCart className="ml-3 rounded-sm w-10 h-10 border p-[6px] text-[#2366BC] border-[#2366BC]" />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

        </nav>
    );
}