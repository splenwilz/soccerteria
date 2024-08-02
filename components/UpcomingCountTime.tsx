'use client'
import Image from 'next/image'
import golfball1 from '../assets/images/golfball.png'
import golfball2 from '../assets/images/golfball2.png'
import golfball3 from '../assets/images/golfball3.png'
import golfball4 from '../assets/images/golfball4.png'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

interface UpcomingCountTimeProps {
    time: string;
    jackpot: string
}

export const formatJackpot = (amount: number) => {
    if (amount === undefined || amount === null) return '';
    return `€${(amount / 1000000).toFixed(0)} Million`;
};

// Define the UpcomingCountTime component
const UpcomingCountTime: React.FC<UpcomingCountTimeProps> = ({ time, jackpot }) => {
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
        <div className="mx-auto">
            <div className="mx-auto pb-4 relative rounded-md sm:rounded-2xl w-[100%] h-auto bg-[#BAE1FF29] mt-10 border border-[#7ABFF4]">
                <Image src={golfball1} alt="Golfball" className='absolute' width={40} height={40} />
                <Image src={golfball2} alt="Golfball" className='absolute top-16 left-10' width={30} height={30} />
                <Image src={golfball3} alt="Golfball" className='absolute right-20' width={40} height={40} />
                <Image src={golfball4} alt="Golfball" className='absolute right-10 top-16' width={30} height={30} />
                <div className="flex ">
                    <div className="mx-auto flex flex-col md:flex-row md:gap-24">
                        <div className="flex justify-center items-center gap-3">
                            <p className="font-inter text-[16px] md:text-[22px] text-[#121212] text-center font-semibold ">
                                {formattedDate}
                            </p>
                            <div className="flex mt-4 text-[35px] text-[#24475B52]">

                                <span className="rounded-md ml-[3px] w-[65px] text-center text-white text-[25px] pt-[4px] font-bold h-16 bg-[#222222]">
                                    {String(countdown.totalHours).padStart(2, '0')}
                                    <span className="text-[10px] block font-normal -mt-1">HOURS</span>
                                </span>
                                :
                                <span className="rounded-md ml-[3px] w-[65px] text-center text-white text-[25px] pt-[4px] font-bold h-16 bg-[#222222]">
                                    {String(countdown.minutes).padStart(2, '0')}
                                    <span className="text-[10px] block font-normal -mt-1">MINUTES</span>
                                </span>
                                :
                                <span className="rounded-md ml-[3px] w-[65px] text-center text-white text-[25px] pt-[4px] font-bold h-16 bg-[#222222]">
                                    {String(countdown.seconds).padStart(2, '0')}
                                    <span className="text-[10px] block font-normal -mt-1">SECONDS</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-3  mt-5 sm:mt-0">
                            <p className="font-inter text-[16px] sm:text-[22px] text-[#121212] text-center font-semibold">Estimated Jackpot</p>
                            <p className="font-inter text-[20px] text-center md:text-[36px] lg:text-[58px] text-[#2366BC] font-bold">
                                {formattedJackpot}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingCountTime