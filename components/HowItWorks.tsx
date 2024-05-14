import toynumbers from "../assets/images/toynumbers.png";
import shoppingcart from "../assets/images/shoppingcart.png";
import flyingmoney from "../assets/images/flyingmoney.png";
import ticket from "../assets/images/ticket.png";
import Image from "next/image";
export default function HowItWorks() {
    return (
        <div className="relative mt-10 md:mt-20 mb-20">
            <h2 className="text-2xl md:text-3xl mb-10 lg:mb-16 font-bold text-[#0B3F7C] text-center">How Jackpocket Lottery App Works</h2>

            <div className="hidden md:block absolute left-[47%]">
                <div className="bg-[#2366BC] w-[50px] rounded-full h-[50px] ">
                    <p className="mx-5 pt-2 text-white font-manrope text-[23px] font-semibold">1</p>
                </div>
                <div className="w-[1px] ml-6 bg-[#2366BC] h-[200px] "></div>

                <div className="bg-[#ECECEC] w-[50px] rounded-full h-[50px]">
                    <p className="mx-5 pt-2 text-[#121212] font-manrope text-[23px] font-semibold">2</p>
                </div>
                <div className="w-[1px] ml-6 bg-[#ECECEC] h-[180px] "></div>
                <div className="bg-[#ECECEC] w-[50px] rounded-full h-[50px]">
                    <p className="mx-5 pt-2 text-[#121212] font-manrope text-[23px] font-semibold">3</p>
                </div>
                <div className="w-[1px] ml-6 bg-[#ECECEC] h-[195px] "></div>
                <div className="bg-[#ECECEC] w-[50px] rounded-full h-[50px] ">
                    <p className="mx-5 pt-2 text-[#121212] font-manrope text-[23px] font-semibold">4</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center w-full md:gap-24 sm:mx-4 lg:gap-56 md:mx-auto mb-20">
                <div className="block md:hidden bg-[#2366BC] w-[68px] rounded-full h-[68px] mb-6">
                    <p className="mx-7 pt-3 text-white font-manrope text-[30px] font-semibold">1</p>
                </div>
                <div className="bg-[#FFDFBA99] w-[340px] rounded-md h-[160px]">
                    <Image src={toynumbers} alt="toy numbers" className="mt-4 w-[130px] mx-auto" />
                </div>
                <div className="mt-5">
                    <h3 className="text-[#121212] text-[20px] font-semibold font-manrope">Pick your game and number</h3>
                    <p className="leading-8 text-[16px] font-manrope mt-1 w-[350px]">Choose your lucky numbers or if you have numbers-block, choose Quick Pick. How you lotto is up to you.</p>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full md:gap-24 sm:mx-4 lg:gap-56 md:mx-auto mb-20">
                <div className="mt-5">
                    <h3 className="text-[#121212] text-[20px] font-semibold font-manrope">Place your order</h3>
                    <p className="leading-8 text-[16px] font-manrope mt-1 w-[350px]">What happens now, you ask? Jackpocket fulfills your ticket for you from an official lottery retailer.</p>
                </div>
                <div className="bg-[#BAE1FF99] w-[340px] rounded-md h-[160px]">
                    <Image src={shoppingcart} alt="toy numbers" className="mt-4 w-[130px] mx-auto" />
                </div>
                <div className="block md:hidden bg-[#ECECEC] w-[68px] rounded-full h-[68px] mb-6">
                    <p className="mx-7 pt-3 font-manrope text-[30px] font-semibold">2</p>
                </div>
            </div>


            <div className="flex flex-col md:flex-row justify-center items-center w-full md:gap-24 sm:mx-4 lg:gap-56 md:mx-auto mb-20">
                <div className="block md:hidden bg-[#ECECEC] w-[68px] rounded-full h-[68px] mb-6">
                    <p className="mx-7 pt-3 font-manrope text-[30px] font-semibold">3</p>
                </div>
                <div className="bg-[#FFC0C699] w-[340px] rounded-md h-[160px]">

                    <Image src={ticket} alt="toy numbers" className="mt-4 w-[130px] mx-auto" />
                </div>
                <div className="mt-5">
                    <h3 className="text-[#121212] text-[20px] font-semibold font-manrope">See your ticket</h3>
                    <p className="leading-8 text-[16px] font-manrope mt-1 w-[350px]">And Voila! We send a scan of your ticket to the app and an order confirmation to your email. Your paper ticket is safely stored in a fireproof safe.</p>
                </div>
            </div>


            <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full md:gap-24 sm:mx-4 lg:gap-56 md:mx-auto mb-20">
                <div className="mt-5">
                    <h3 className="text-[#121212] text-[20px] font-semibold font-manrope">Collect 100% of your winnings</h3>
                    <p className="leading-8 text-[16px] font-manrope mt-1 w-[350px]">Winnings under $600 go straight to your Jackpocket account. When you win big, we arrange to securely deliver your ticket to you. May you be so lucky</p>
                </div>
                <div className="bg-[#C0FFBA99] w-[340px] rounded-md h-[160px]">
                    <Image src={flyingmoney} alt="toy numbers" className="mt-4 w-[130px] mx-auto" />
                </div>
                <div className="block md:hidden bg-[#ECECEC] w-[68px] rounded-full h-[68px] mb-6">
                    <p className="mx-7 pt-3 font-manrope text-[30px] font-semibold">4</p>
                </div>
            </div>


        </div>
    )
}