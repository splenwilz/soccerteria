import Image from 'next/image'
import welcomebgimage from '../assets/images/welcomebgimage.png'
import ticket1 from '../assets/images/ticket1.png'
export default function Welcome() {
    return (
        <div className="flex flex-col md:flex-row pt-20 max-h-[600px] relative z-20">
            <div className={`bg-[url('../assets/images/welcomebg.png')] bg-no-repeat  h-[590px] w-full md:w-[72%] lg:w-[57%] -mt-40 bg-[rgba(0,0,0,0.3)] `}>
                <div className="md:ml-10 lg:ml-28 flex flex-col justify-center items-center md:justify-start md:items-start ">
                    <div className="flex mt-28 md:mt-40">
                        <Image src={ticket1} alt="ticket" className="w-[40px] h-[40px] border border-[#FFFFFF3D] p-1 mr-2 rounded-full bg-[#FFFFFF14]" />
                        <p className="text-white text-[28px] font-semibold font-inter">Special offer</p>
                    </div>
                    <p className="text-white mt-0 md:mt-8 font-inter text-[20px]">Monday, 15 April</p>
                    <div className="mt-1">
                        <span className="text-[#3180E5] font-inter font-semibold text-[30px]">€</span>
                        <span className=" font-inter text-[52px] font-extrabold text-white">105</span>
                        <span className="text-[#3180E5] font-inter font-semibold text-[30px] ml-[1px]">Million</span>
                    </div>
                    <p className="text-white text-center md:text-left mt-2 leading-6 md:leading-8 mx-5 md:mx-0 max-w-[480px] font-inter text-[14px] md:text-[16px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                    </p>
                    <button className="rounded-sm mt-8 mb-5 bg-[#2366BC] text-white font-inter font-semibold text-[16px] px-28 md:px-14 py-2">Play Now</button>
                </div>
            </div>
            <div className=" md:pt-32 md:-mt-40 md:-ml-20 bg-[rgba(38,39,38)] md:bg-transparent">
                <Image src={welcomebgimage} alt="Welcome Image" className='' width={600} height={800} />
            </div>
        </div>
    )
}