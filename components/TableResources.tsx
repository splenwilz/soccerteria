import { getMatchList } from "@/lib/user";
import Livescore from "./Livescore";
import Prediction from "./Prediction";

export default async function TableResources() {
    const matchList = await getMatchList()
    return (
        <>
            <div className="flex  mx-auto justify-center items-center max-w-[1100px] mt-8 ">
                <div className="flex flex-col md:flex-row gap-6">
                    <Prediction matchList={matchList} />
                    <Livescore />
                </div>
            </div>
        </>
    );
}