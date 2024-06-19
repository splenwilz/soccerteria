import { PredictionData } from "@/app/(user)/dashboard/summary/DataTable";

export function loadStoredPredictionDataFromLocalStorage(): PredictionData {
    const storedPredictionData = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('predictionData') || '{}') : {};
    return storedPredictionData;
}