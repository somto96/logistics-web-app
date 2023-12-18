"use client"

import CustomSkeleton from "@/components/CustomSkeleton";
import FormInput from "@/components/FormElements/FormInput";
import { useRiderAnalytics } from "@/hooks/useRiderAnalytics";
import { CiSearch } from "react-icons/ci";
import { MdArrowBack } from "react-icons/md";
import backendClient from '@/services/ImperiumApiClient';
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { getSessionToken } from "@/utils/sessionUtils";
import React from "react";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { PackageAdminListData } from "@/types/responses/PackageAdminListData";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import RiderPackageCard from "@/components/Riders/RiderPackageCard";

backendClient.setToken(getSessionToken() || '');

export default function DeliveryHistory() {

    // Hooks
    const { session } = useAuth();
    const router = useRouter()

    // Fetch Data
    const {
        data: analytics,
        isLoading
    } = useRiderAnalytics()

    // State
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 20,
        },
        status: 7
    });
    const [data, setData] = React.useState<PaginatedResponse<PackageAdminListData>>()
    const [selectedPackage, setSelectedPackage] = React.useState<PackageAdminListData>()


    // Helpers
    const fetchRiderPackageList = async(params: PaginatedQuery)=>{
        backendClient.setToken(getSessionToken() || '');
        backendClient.setLoading('rider', true);
        
        try {
            let response = await backendClient.getRiderPackageList(params)

            backendClient.setLoading('rider', false);
            if (response.responseObject) {
                setData(response.responseObject);
                return response.responseObject
            }
            
        } catch (err: any) {
            backendClient.setLoading('rider', false);
            if (err?.response?.status === 401 && !session) {
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

    // Effect
    React.useEffect(()=>{
        fetchRiderPackageList(query)
    },[query])
   
    return(
        <div className="w-screen h-screen bg-white text-black flex flex-col">

            <div className="p-5 relative  bg-black">
                <p className="text-lg text-center text-white">
                    Delivery History
                </p>
                {/* <div className='absolute left-0 top-0 p-5 h-full flex items-center'>
                    <button
                        className='text-sm text-white'
                        onClick={router.back}
                    >
                        <MdArrowBack size={28} />
                    </button>
                </div> */}
            </div>

            {/** Statistics */}
            <div className="grid grid-cols-3 p-5 gap-4">
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-site-gray-F2 p-3 flex flex-col h-[104px]">
                        <p className="text-[#4F4F4F] text-xs"> 
                            Total Delivery Attempted
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold">
                            { analytics?.totalDeliveryAttempted || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-site-gray-F2 p-3 flex flex-col h-[104px]">
                        <p className="text-[#4F4F4F] text-xs"> 
                            Total Delivery Successful
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold">
                            { analytics?.totalDeliverySuccessful || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
                <CustomSkeleton isLoading={isLoading}>
                    <div className="rounded-xl bg-site-gray-F2 p-3 flex flex-col h-[104px]">
                        <p className="text-[#4F4F4F] text-xs"> 
                            Total Delivery Failed
                        </p>
                        <div className="flex-1"></div>
                        <p className="font-bold">
                            { analytics?.totalDeliveryFailed || 0 }
                        </p>
                    </div>
                </CustomSkeleton>
            </div>

            {/** List */}
            <div className="px-5 py-2 space-y-3">
                <p className="text-sm">
                    All History
                </p>
                <form action="">
                    <FormInput
                        placeholder="Search by tracking ID"
                        className="rounded-full border-site-gray-label border"
                        startAdornment={
                            <CiSearch />
                        }
                    />
                </form>
            </div>
            <div className="flex-1 p-5 space-y-4 overflow-y-scroll">
                {
                    backendClient.riderListLoading ?
                    [1,2,3].map((item)=>(
                        <CustomSkeleton isLoading key={`${item}rpldst`}>
                            <RiderPackageCard/>
                        </CustomSkeleton>
                    ))
                    :
                    data?.items.map((item, i)=>(
                        <RiderPackageCard
                            key={`${item.id}rplst`}
                            packageData={item}
                            onClick={()=>{
                                router.push(`/riders/deliveryDetails/${item.id}`)
                            }}
                        />
                    ))
                }
            </div>
        </div>
    )
}