import Livescore from "./Livescore";
import Prediction from "./Prediction";

export default function TableResources() {
    return (
        <>
            <div className="flex  mx-auto justify-center items-center max-w-[1100px] mt-8 ">
                <div className="flex flex-col md:flex-row gap-6">
                    <Prediction />
                    <Livescore />
                </div>
            </div>
        </>
    );
}