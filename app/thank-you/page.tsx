import Navigation from "@/components/Navigation"
import Image from "next/image"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import fundWallet from "../../assets/images/fund-wallet.png"

export default function ThankYou() {
    // const router = useRouter()
    const orderId = "2345657876544"
    return (
        <>
            <Navigation logo="logo2" clasName="bg-white text-black" />
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="px-20 bg-[#FBFCFD] ">
                    <Image src={fundWallet} alt="logo" width={200} height={200} className="mx-auto" />
                    <h2 className="text-[#121212] text-[30px] font-semibold font-manrope mt-5">Thank you for funding your account</h2>
                    <p className="text-[#5D5D5D] text-[16px] text-center font-manrope mt-2">You will receive an email with details of your transaction</p>
                    <p className="text-[#5D5D5D] text-[16px] text-center font-manrope mt-2">Order ID: {orderId}</p>
                    <Link href="/wallet/balance">
                        <button className="text-[#fff] text-[16px] font-manrope bg-[#2366BC] rounded-full py-3 px-10 text-center w-[200px] mt-10">View Balance</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
