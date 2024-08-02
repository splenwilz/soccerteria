'use client'
import Image from 'next/image'
import golfball1 from '../assets/images/golfball.png'
import golfball2 from '../assets/images/golfball2.png'
import golfball3 from '../assets/images/golfball3.png'
import golfball4 from '../assets/images/golfball4.png'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { formatJackpot } from './UpcomingCountTime'

interface CountDownTimeProps {
    time: string;
    jackpot: string
}
export default function CountDownTime({ time, jackpot }: CountDownTimeProps) {
    const [countdown, setCountdown] = useState<{ totalHours: number; minutes: number; seconds: number }>({
        totalHours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = parseISO(time);
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            // Convert days to hours and add to the remaining hours
            const totalHours = (days * 24) + hours;

            setCountdown({ totalHours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formattedDate = format(parseISO(time), 'EEE, MMM dd, yyyy');
    const formattedJackpot = formatJackpot(parseInt(jackpot));

    return (
        <div className="mx-auto relative rounded-2xl w-[85%] h-[280px] md:h-[180px] bg-[#BAE1FF29] mt-20 min-[412px]:mt-60  min-[413px]:mt-24 min-[420px]:mt-24  min-[430px]:mt-36 min-[490px]:mt-44 min-[536px]:mt-52 min-[584px]:mt-60 sm:mt-60 md:mt-6 border border-[#7ABFF4]">
            <Image src={golfball1} alt="Golfball" className='absolute' width={60} height={60} />
            <Image src={golfball2} alt="Golfball" className='absolute top-32 left-10' width={40} height={40} />
            <Image src={golfball3} alt="Golfball" className='absolute right-10' width={60} height={60} />
            <Image src={golfball4} alt="Golfball" className='absolute right-0 top-40' width={30} height={30} />
            <div className="flex ">
                <div className="mx-auto flex flex-col md:flex-row md:gap-24">
                    <div className="flex flex-col mt-5">
                        <p className="font-inter text-[20px] md:text-[28px] text-[#121212] text-center font-semibold ">{formattedDate}</p>
                        <div className="flex mt-4 text-[45px] text-[#24475B52]">
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">
                                {String(countdown.totalHours).padStart(2, '0')}
                                <span className="text-[10px] block font-normal -mt-2">HOURS</span>
                            </span>:
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">
                                {String(countdown.minutes).padStart(2, '0')}
                                <span className="text-[10px] block font-normal -mt-2">MINUTES</span></span>:
                            <span className="rounded-md w-[85px] text-center text-white text-[45px] font-bold h-20 bg-[#222222]">
                                {String(countdown.seconds).padStart(2, '0')}
                                <span className="text-[10px] block font-normal -mt-2">SECONDS</span></span>
                        </div>
                    </div>
                    <div className="mt-7">
                        <p className="font-inter text-[16px] sm:text-[25px] text-[#121212] text-center font-semibold">Estimated Jackpot</p>
                        <p className="font-inter mt-2 text-[32px] text-center md:text-[40px] lg:text-[68px] text-[#2366BC] font-bold">{formattedJackpot}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}