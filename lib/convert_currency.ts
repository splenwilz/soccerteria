// Send a request to the exchange rate API https://v6.exchangerate-api.com/v6/API/pair/{from}/{to}
interface ExchangeRate {
    result: string;
    conversion_rate: number;
    base_code: string;
    target_code: string;
    documentation: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    terms_of_use: string;
}
/**
 * Converts an amount from one currency to another using the exchange rate API.
 *
 * @param {number} amount - The amount to be converted.
 * @param {string} from - The currency code of the amount to be converted from.
 * @param {string} to - The currency code of the amount to be converted to.
 * @return {Promise<number>} The converted amount.
 */
export const convertCurrency = async (amount: number, from: string, to: string) => {
    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/268220a9659ced5866b9a27c/pair/${from}/${to}`
        );
        const data: ExchangeRate = await response.json();
        const rate = data.conversion_rate;
        const convertedAmount = amount * rate;
        return convertedAmount;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return 0; // Default to 0 if there's an error
    }
}