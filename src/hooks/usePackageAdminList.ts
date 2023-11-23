import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { PackageAdminListData } from "@/types/responses/PackageAdminListData";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { getCookie } from "cookies-next";
import axios, { AxiosResponse } from "axios";
import useSWR from 'swr'
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "@/types/responses/SignInResponseData";

function getSessionToken() {
    const session = getCookie(AUTH_KEY)?.toString();

    if (session) {
        let parsedSession = JSON.parse(session);
        return (parsedSession as SignInResponseData)?.token
    }
    
}


export function usePackagaAdminList(query: PaginatedQuery){

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers:{
            'Authorization': `Bearer ${getSessionToken()}`
        },
    });
    

    // Fetcher
    const fetcher = (url: string) => client.post(url, query).
    then((res: AxiosResponse<ApiResponse<PaginatedResponse<PackageAdminListData>>>) => res.data);

    // Fetching hook
    const apiUrl = `/Package/adminlist`
    const { data, error, mutate } = useSWR(apiUrl, fetcher, { shouldRetryOnError: false });

    console.log(data);

    return {
        data: data?.responseObject,
        isLoading: !error && !data,
        error: error,
        mutate: mutate
    }
}