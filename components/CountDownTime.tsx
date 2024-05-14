import Image from 'next/image'
import golfball1 from '../assets/images/golfball.png'
import golfball2 from '../assets/images/golfball2.png'
import golfball3 from '../assets/images/golfball3.png'
import golfball4 from '../assets/images/golfball4.png'
export default function CountDownTime() {
    return (
        <div className="mx-auto relative rounded-2xl w-[85%] h-[280px] md:h-[180px] bg-[#BAE1FF29] mt-20 min-[412px]:mt-60  min-[413px]:mt-24 min-[420px]:mt-24  min-[430px]:mt-36 min-[490px]:mt-44 min-[536px]:mt-52 min-[584px]:mt-60 sm:mt-60 md:mt-6 border border-[#7ABFF4]">
            <Image src={golfball1} alt="Golfball" className='absolute' width={60} height={60} />
            <Image src={golfball2} alt="Golfball" className='absolute top-32 left-10' width={40} height={40} />
            <Image src={golfball3} alt="Golfball" className='absolute right-10' width={60} height={60} />
            <Image src={golfball4} alt="Golfball" className='absolute right-0 top-40' width={30} height={30} />
            <div className="flex ">
                <div className="mx-auto flex flex-col md:flex-row md:gap-24">
                    <div className="flex flex-col mt-5">
                        <p className="font-inter text-[20px] md:text-[28px] text-[#121212] text-center font-semibold ">Wed, Apr 24.2024</p>
                        <div className="flex mt-4 text-[45px] text-[#24475B52]">
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">32
                                <span className="text-[10px] block font-normal -mt-2">HOURS</span>
                            </span>:
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">48
                                <span className="text-[10px] block font-normal -mt-2">MINUTES</span></span>:
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">02
                                <span className="text-[10px] block font-normal -mt-2">SECONDS</span></span>
                        </div>
                    </div>
                    <div className="mt-7">
                        <p className="font-inter text-[16px] sm:text-[25px] text-[#121212] text-center font-semibold">Estimated Jackpot</p>
                        <p className="font-inter mt-2 text-[32px] text-center md:text-[40px] lg:text-[68px] text-[#2366BC] font-bold">€129 Million</p>
                    </div>
                </div>
            </div>
        </div>
    )
}