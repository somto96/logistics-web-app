import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { PackageAdminListData } from "@/types/responses/PackageAdminListData";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { getCookie } from "cookies-next";
import axios, { AxiosResponse } from "axios";
import useSWR from 'swr'
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from "@/utils/sessionUtils";
import { useRouter } from "next/navigation";
import React from 'react'
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";


export function usePackagaAdminList(query: PaginatedQuery){

    backendClient.setToken(getSessionToken() || '')

    // Hooks
    const router = useRouter()

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<PackageAdminListData[]>([]);
    const [cacheHash, setCacheHash] = React.useState({});
    

    const fetchAdminPackageList = async(params: PaginatedQuery)=>{
        // setLoading(true)
        backendClient.setToken(getSessionToken() || '')
        try {
            let response = await backendClient.getAdminPackageList(params)

            backendClient.setLoading('admin', false);
            if (response.responseObject) {
                setData(response.responseObject.items)
            }
            
        } catch (err: any) {
            backendClient.setLoading('admin', false);
            setLoading(false)
            if (err?.response?.status === 401 && !getSessionToken()) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    }

    React.useEffect(()=>{
        fetchAdminPackageList(query)
    },[query])


    return {
        data: data,
        isLoading: loading,
    }
}