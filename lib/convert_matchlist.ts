import { Match } from "@/app/(admin)/admin/matchlist/matchList";

export function convertMatchListToPrediction(matches: Match[]): string[][] {
    return matches.map((match) => [
        [match.team1home || '', match.team1away || ''],
        [match.team2home || '', match.team2away || ''],
        [match.team3home || '', match.team3away || ''],
        [match.team4home || '', match.team4away || ''],
        [match.team5home || '', match.team5away || ''],
        [match.team6home || '', match.team6away || ''],
        [match.team7home || '', match.team7away || ''],
        [match.team8home || '', match.team8away || ''],
        [match.team9home || '', match.team9away || ''],
        [match.team10home || '', match.team10away || ''],
        [match.team11home || '', match.team11away || ''],
        [match.team12home || '', match.team12away || ''],
        [match.team13home || '', match.team13away || ''],
        [match.team14home || '', match.team14away || ''],
        [match.team15home || '', match.team15away || ''],
    ]).flat();
}