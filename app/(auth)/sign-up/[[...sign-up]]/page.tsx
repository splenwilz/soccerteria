import Navigation from "@/components/Navigation";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import signup_wing1 from "../../../../assets/images/signup-wing1.png"
import signup_wing2 from "../../../../assets/images/signup-wing2.png"
import signup_wing3 from "../../../../assets/images/signup-wing3.png"


export default function Page() {
  return (
    <div className="">
      <Navigation logo="logo2" clasName="bg-white text-black" />
      <div className="bg-[url('../assets/images/signupbg.png')] bg-[#F5F9FE] bg-no-repeat relative h-screen w-full flex justify-center items-center">

        <Image src={signup_wing1} alt="logo" width={150} height={100} className="absolute -top-5" />
        <Image src={signup_wing2} alt="logo" width={260} height={200} className="absolute right-40 bottom-20" />
        <Image src={signup_wing3} alt="logo" width={260} height={200} className="absolute left-40 bottom-20" />
        <SignUp path="/sign-up" />
      </div>
    </div>
  )
}