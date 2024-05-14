export default function YoutubeVideoContainer() {
    return (
        <div className="flex justify-center">
            <div className="w-[130px] -ml-[240px] md:-ml-[640px] z-0 -mt-[30px] h-[60px] md:h-[120px] bg-[#6151EE] absolute"></div>
            <div className="w-[130px] -ml-[240px] md:-ml-[640px] z-0 -mt-[0px] h-[220px] md:h-[420px] rounded-bl-3xl absolute border-2 border-[#6151EE]"></div>

            <div className="relative">
                <div className="w-[80px] md:w-[130px] md:ml-[640px] ml-[260px] -mt-[30px] z-0 h-[255px] md:h-[450px] absolute bg-[#6151EE4A]"></div>
                <div className="absolute md:ml-[191px] ml-[140px] -mt-[30px] z-0 inline-block w-0 h-0 border-solid rotate-[360deg] border-t-0 border-r-0 border-l-[120px] md:border-l-[450px] border-b-[255px] md:border-b-[450px] border-l-transparent border-r-transparent border-t-transparent border-b-[#6151EE4A]"></div>
            </div>



            <div className="flex justify-center items-center z-10 rounded-3xl">
                <iframe
                    className="rounded-xl w-[300px] md:w-[700px] h-[200px] md:h-[400px]"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}