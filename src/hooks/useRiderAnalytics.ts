import { ApiResponse } from "@/types/responses/ApiResponse";
import { getCookie } from "cookies-next";
import axios, { AxiosResponse } from "axios";
import useSWR from 'swr'
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { RiderAnalytics } from "@/types/responses/RiderData";

function getSessionToken() {
    const session = getCookie(AUTH_KEY)?.toString();

    if (session) {
        let parsedSession = JSON.parse(session);
        return (parsedSession as SignInResponseData)?.token
    }
    
}


export function useRiderAnalytics(){

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers:{
            'Authorization': `Bearer ${getSessionToken()}`
        },
    });
    

    // Fetcher
    const fetcher = (url: string) => client.get(url).
    then((res: AxiosResponse<ApiResponse<RiderAnalytics>>) => res.data);

    // Fetching hook
    const apiUrl = `/Rider/analytics`
    const { data, error, mutate } = useSWR(apiUrl, fetcher, { errorRetryCount: 5 });

    console.log(data);

    return {
        data: data?.responseObject,
        isLoading: !error && !data,
        error: error,
        mutate: mutate
    }
}