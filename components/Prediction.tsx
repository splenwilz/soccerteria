'use client'
import { Match } from "@/app/(admin)/admin/matchlist/matchList";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { capitalizeTitle } from "@/lib/capitalize";
import { convertMatchListToPrediction } from "@/lib/convert_matchlist";
import { loadStoredPredictionDataFromLocalStorage } from "@/lib/prediction_data";
import { BoltIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type SelectedOptions = { [key: string]: Option[] };

type Option = '1' | 'X' | '2' | '0' | 'M';
export interface PredictionProps {
    matchList: Match[];
    maxWidth?: boolean
}

export default function Prediction({ matchList, maxWidth }: PredictionProps) {

    const newMatchList = convertMatchListToPrediction(matchList);

    const combinationAmounts: { [key: string]: number } = {
        '0-1': 2.25,
        '0-2': 6.75,
        '0-3': 20.25,
        '0-4': 60.75,
        '0-5': 182.25,
        '0-6': 546.75,
        '0-7': 1.640,
        '0-8': 4.920,
        '0-9': 14.762,

        '1-0': 1.50,
        '1-1': 4.50,
        '1-2': 13.50,
        '1-3': 40.50,
        '1-4': 121.50,
        '1-5': 364.50,
        '1-6': 1.093,
        '1-7': 3.280,
        '1-8': 9.841,

        '2-0': 3.00,
        '2-1': 9.00,
        '2-2': 27.00,
        '2-3': 81.00,
        '2-4': 243.00,
        '2-5': 729.00,
        '2-6': 2.187,
        '2-7': 6.561,
        '2-8': 19.683,

        '3-0': 6.00,
        '3-1': 18.00,
        '3-2': 54.00,
        '3-3': 162.00,
        '3-4': 486.00,
        '3-5': 1458.00,
        '3-6': 4374.00,
        '3-7': 13122.00,

        '4-0': 12.00,
        '4-1': 36.00,
        '4-2': 108.00,
        '4-3': 324.00,
        '4-4': 972.00,
        '4-5': 2916.00,
        '4-6': 8748.00,

        '5-0': 24.00,
        '5-1': 72.00,
        '5-2': 216.00,
        '5-3': 648.00,
        '5-4': 1944.00,
        '5-5': 5832.00,

        '6-0': 48.00,
        '6-1': 144.00,
        '6-2': 432.00,
        '6-3': 1296.00,
        '6-4': 3888.00,
        '6-5': 11664.00,

        '7-0': 96.00,
        '7-1': 288.00,
        '7-2': 864.00,
        '7-3': 2592.00,
        '7-4': 7776.00,
        '7-5': 23328.00,

        '8-0': 192.00,
        '8-1': 576.00,
        '8-2': 1728.00,
        '8-3': 5184.00,
        '8-4': 15552.00,

        '9-0': 384.00,
        '9-1': 1152.00,
        '9-2': 3456.00,
        '9-3': 10368.00,

        '10-0': 768.00,
        '10-1': 2304.00,
        '10-2': 6912.00,
        '10-3': 20736.00,

        '11-0': 1536.00,
        '11-1': 4608.00,
        '11-2': 13824.00,

        '12-0': 3072.00,
        '12-1': 9216.00,

        '13-0': 6144.00,
        '13-1': 18432.00,

        '14-0': 12288.00,
    };


    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        'game15_home': ['1'],
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const [doublesCount, setDoublesCount] = useState(0);
    const [triplesCount, setTriplesCount] = useState(0);
    const [selectedGamesCount, setSelectedGamesCount] = useState(0);
    let selectedTeams = Object.keys(selectedOptions).length




    useEffect(() => {
        const storedPredictionData = loadStoredPredictionDataFromLocalStorage();
        storedPredictionData.selectedOptions ? setSelectedOptions(storedPredictionData.selectedOptions) : setSelectedOptions({});
    }, []);


    const handleOptionSelect = (teamId: string, option: Option, isFifteenthGame: boolean = false, teamType: string = '') => {
        setSelectedOptions((prevOptions) => {
            const key = isFifteenthGame ? `game15_${teamType}` : teamId;
            const teamOptions = prevOptions[key] || [];

            let updatedTeamOptions;

            if (teamOptions.includes(option)) {
                // Remove the option if it is already selected
                updatedTeamOptions = teamOptions.filter(opt => opt !== option);
            } else {
                // Add the option if it is not already selected
                updatedTeamOptions = [...teamOptions, option];
            }

            // Sort the options in the specified order
            const optionOrder = ['1', 'X', '2', '0', 'M'];
            updatedTeamOptions.sort((a, b) => optionOrder.indexOf(a) - optionOrder.indexOf(b));

            // If there are no options left for the team, remove the team from the list
            if (updatedTeamOptions.length === 0) {
                const { [key]: _, ...restOptions } = prevOptions;
                return restOptions;
            } else {
                return {
                    ...prevOptions,
                    [key]: updatedTeamOptions,
                };
            }
        });
    };


    useEffect(() => {
        const calculateTotalAmount = () => {
            let doubles = 0;
            let triples = 0;
            let selectedGames = 0;
            let game15Home = selectedOptions['game15_home']?.length || 0;
            let game15Away = selectedOptions['game15_away']?.length || 0;

            console.warn(game15Home, game15Away);

            Object.keys(selectedOptions).forEach(key => {
                if (key !== 'game15_home' && key !== 'game15_away') {
                    const options = selectedOptions[key];
                    selectedGames += options.length;
                    if (options.length === 2) {
                        doubles += 1;
                    } else if (options.length === 3) {
                        triples += 1;
                    }
                }
            });

            let key = `${doubles}-${triples}`;
            let total = combinationAmounts[key] || 0.75;

            // Calculate the combinations for the 15th game
            if (game15Home > 0 && game15Away > 0) {
                let lastGameCombinations = game15Home * game15Away;
                total *= lastGameCombinations;
            }

            setTotalAmount(total);
            setDoublesCount(doubles);
            setTriplesCount(triples);
            setSelectedGamesCount(selectedGames);
        };

        calculateTotalAmount();
    }, [selectedOptions]);

    const handleGameSubmit = () => {
        setLoading(true);

        // Get the options for the last game
        const game15_home = selectedOptions['game15_home'] || [];
        const game15_away = selectedOptions['game15_away'] || [];

        const lastTeam = `${newMatchList[14][0]} - ${newMatchList[14][1]}`;
        const lastTeamSelection = `${game15_home.join(',')} - ${game15_away.join(',')}`;

        // Remove game15_home and game15_away from selectedOptions and add lastTeamAndSelection
        const selectedOptions2 = {
            ...Object.fromEntries(
                Object.entries(selectedOptions).filter(([key]) => key !== 'game15_home' && key !== 'game15_away')
            ),
            [lastTeam]: lastTeamSelection
        };

        const predictionData = {
            selectedOptions: selectedOptions2,
            totalAmount,
            doublesCount,
            triplesCount,
        };
        localStorage.setItem('predictionData', JSON.stringify(predictionData));

        // Redirect to the next page
        router.push('/dashboard/summary');
        setLoading(false);
    };

    const [loading, setLoading] = useState(false)

    return (
        // max-w-[700px] sm:max-w-[700px] md:max-w-[400px] xl:max-w-[700px]
        <div className={`bg-[#F1F0FE] p-2 pl-3 pr-3 rounded-lg  ${maxWidth ? 'w-full' : 'max-w-[400px] sm:max-w-[700px] md:max-w-[400px] xl:max-w-[700px]'}`}>
            <p className="text-center font-inter font-bold text-[16px] pb-2 pt-1 text-[#3A32A4]">Prediction</p>
            <Table className="bg-white rounded-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead className="">#</TableHead>
                        <TableHead>Prediction</TableHead>
                        <TableHead>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M3.22 7.595a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-3.25 3.25Zm8.25-3.25-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
                            </svg>
                        </TableHead>
                        <TableHead className="text-center">1</TableHead>
                        <TableHead className="pl-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-right">
                                <path fillRule="evenodd" d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                            </svg>
                        </TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {newMatchList.map((data, index) => {
                        const teamId = data[0] + ' - ' + data[1];
                        if (index === newMatchList.length - 1) {
                            // Split the last item into two rows for the 15th game
                            return (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <td className="font-medium pl-4 text-[12px]" rowSpan={2}>15</td>
                                        <td className="font-medium text-[14x] p-1">{capitalizeTitle(teamId)}</td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '0', true, 'home')} className={`rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] ${selectedOptions['game15_home']?.includes('0') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>0</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '1', true, 'home')} className={`rounded-full text-[12px] px-[16px] py-2 border border-[#00B660] ${selectedOptions['game15_home']?.includes('1') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>1</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '2', true, 'home')} className={`rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] ${selectedOptions['game15_home']?.includes('2') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>2</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, 'M', true, 'home')} className={`rounded-full text-[12px] px-[12.5px] py-2 border border-[#00B660] ${selectedOptions['game15_home']?.includes('M') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>M</button></td>
                                    </TableRow>
                                    <tr>
                                        <td className="font-medium text-[14px] p-1">{capitalizeTitle(teamId)}</td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '0', true, 'away')} className={`rounded-full text-[12px] px-[14.5px] py-2 border border-[#00B660] ${selectedOptions['game15_away']?.includes('0') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>0</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '1', true, 'away')} className={`rounded-full text-[12px] px-[16px] py-2 border border-[#00B660] ${selectedOptions['game15_away']?.includes('1') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>1</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '2', true, 'away')} className={`rounded-full text-[12px] px-[15px] py-2 border border-[#00B660] ${selectedOptions['game15_away']?.includes('2') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>2</button></td>
                                        <td className="p-1"><button onClick={() => handleOptionSelect(teamId, 'M', true, 'away')} className={`rounded-full text-[12px] px-[12.5px] py-2 border border-[#00B660] ${selectedOptions['game15_away']?.includes('M') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>M</button></td>
                                    </tr>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="font-medium pl-4 py-1 text-[12px]">{index + 1}</td>
                                    <td className="font-medium text-[14px] p-1">{capitalizeTitle(teamId)}</td>
                                    <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '1')} className={`rounded-full px-[16px] text-[12px] py-2 border border-[#00B660] ${selectedOptions[teamId]?.includes('1') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>1</button></td>
                                    <td className="p-1"><button onClick={() => handleOptionSelect(teamId, 'X')} className={`rounded-full px-[14.5px] text-[12px] py-2 border border-[#00B660] ${selectedOptions[teamId]?.includes('X') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>X</button></td>
                                    <td className="p-1"><button onClick={() => handleOptionSelect(teamId, '2')} className={`rounded-full px-[14.5px] text-[12px] py-2 border border-[#00B660] ${selectedOptions[teamId]?.includes('2') ? 'bg-[#00B660] text-[#FFFFFF]' : ''} font-semibold`}>2</button></td>
                                </tr>
                            );
                        }
                    })}


                </TableBody>
            </Table>
            <div className="flex mt-5 gap-2 m:gap-4 w-80 sm:w-96 mx-auto">
                <button className="bg-[#CEFFE8] w-12 h-12 rounded-sm p-1 hover:bg-[#baeed6]">
                    <BoltIcon className="w-6 h-6 text-center ml-1" />
                </button>
                <button className="bg-[#FFFFFF99] w-32 h-12 rounded-sm px-1 p-2 hover:bg-[#FFFFFF71] font-semibold">
                    Double {doublesCount}
                </button>
                <button className="bg-[#FFFFFF99] w-32 h-12 rounded-sm p-2 px-1 font-semibold">
                    Triple {triplesCount}
                </button>
                <button
                    className="bg-[#FFD1D5] w-12 h-12 rounded-sm p-2"
                    onClick={() => setSelectedOptions({})}
                >
                    <XMarkIcon className="w-6 h-6 text-center ml-1 text-[#D6293A]" />
                </button>
            </div>
            <div className="flex mt-5   w-auto ">
                <div className="mx-auto rounded-sm  bg-white pt-3 pb-3 flex flex-col lg:flex-row gap-3 lg:gap-10 w-[580px] justify-center items-center">
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p className="text-[12px] font-inter">Bet</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">{selectedGamesCount}</p>
                        </div>
                        <div className="">
                            <p className="text-[12px] font-inter">Amount</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">{totalAmount.toFixed(2)} €</p>
                        </div>
                        <div className="">
                            <p className="text-[12px] font-inter">Draw Date</p>
                            <p className="text-[15px] font-inter text-[#154583] font-medium">
                                {matchList?.[0]?.gameDate ? new Date(matchList[0].gameDate).toLocaleDateString() : ''}
                            </p>

                        </div>
                    </div>
                    <button
                        onClick={() => { handleGameSubmit(); setLoading(true); }}
                        className="bg-[#2366BC] disabled:bg-[#2366BC]/50 disabled:cursor-not-allowed text-white font-inter font-semibold text-[16px] px-7 py-2 rounded-sm"
                        disabled={selectedTeams < 16}
                    >
                        <div className="flex gap-4 justify-center">
                            <span className="">
                                Play Now
                            </span>
                            {loading && <Loader2 className="animate-spin w-4" />}
                        </div>
                    </button>
                </div>
            </div>
        </div>

    )
}