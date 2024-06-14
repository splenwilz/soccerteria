export interface GeolocationResponse {
    ip: string;
    continent_code: string;
    continent_name: string;
    country_code2: string;
    country_code3: string;
    country_name: string;
    country_name_official: string;
    country_capital: string;
    state_prov: string;
    state_code: string;
    district: string;
    city: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    is_eu: boolean;
    calling_code: string;
    country_tld: string;
    languages: string;
    country_flag: string;
    geoname_id: string;
    isp: string;
    connection_type: string;
    organization: string;
    country_emoji: string;
    currency: {
        code: string;
        name: string;
        symbol: string;
    };
    time_zone: {
        name: string;
        offset: number;
        offset_with_dst: number;
        current_time: string;
        current_time_unix: number;
        is_dst: boolean;
        dst_savings: number;
        dst_exists: boolean;
        dst_start: string;
        dst_end: string;
    };
}

export const getUserCountry = async () => {
    try {
        const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=5d848db7493f4a6b9e9163e6ff466478");
        const data: GeolocationResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user's country:", error);
        return; // Default to US if there's an error
    }
};
