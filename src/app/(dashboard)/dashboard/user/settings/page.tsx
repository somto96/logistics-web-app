"use client"

import React from "react";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { PackageAdminListData, PackageStatus } from "@/types/responses/PackageAdminListData";
import CustomSkeleton from "@/components/CustomSkeleton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from "@/utils/sessionUtils";
import { PaginatedResponse } from "@/types/responses/PaginatedResponse";
import { UpdatePackagePayload } from "@/types/requests/PackagePayload";
import moment from "moment";
import Image from "next/image";
import ProfileUpdateForm from "@/forms/ProfileUpdateForm";
import ChangePasswordForm from "@/forms/ChangePasswordForm";



backendClient.setToken(getSessionToken() || '');

type DashboardViewType = 'main'|'assign'|'package'|'tracking'

export default function BackOfficeHome() {

    // Hooks
    const router = useRouter()
    const session = useSession();

    type RowHash = {
        [key: string]: any;
    }  
    

    // State
    const [views, setViews] = React.useState<DashboardViewType>('main')
    const [rowHash, setRowHash] = React.useState<RowHash>({});
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tab, setTab] = React.useState<string>('profile');
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 20,
        }
    });
    const [data, setData] = React.useState<PaginatedResponse<PackageAdminListData>>()
    const [selectedPackage, setSelectedPackage] = React.useState<PackageAdminListData>()

    // Fetched data
    // const { data, isLoading, error } = usePackagaAdminList(query);
    const fetchCustomerPackageList = async(params: PaginatedQuery)=>{
        backendClient.setToken(getSessionToken() || '');
        setLoading(true)
        
        try {
            let response = await backendClient.getCustomerPackageList(params)

            backendClient.setLoading('admin', false);
            setLoading(false)
            if (response.responseObject) {
                setData(response.responseObject);
                return response.responseObject
            }
            
        } catch (err: any) {
            backendClient.setLoading('admin', false);
            setLoading(false)
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


    // Handlers
    const handleAssignBtnLabelText = (status: PackageStatus) => {
        switch (status) {
            case PackageStatus.AVAILABLE_FOR_PICKUP:
                return {
                    text: 'Assign',
                    disabled: false
                };
            case PackageStatus.UNDELIVERED:
                return {
                    text: 'Reassign',
                    disabled: false
                };
            default:
                return {
                    text: 'Assigned',
                    disabled: true
                };
        }
    };


    const handleAssign = ()=>{
        setViews('assign')
    }
    const handleGoBack = ()=> setViews('main');

    const handleUpdateTrackingStatus = async (payload: UpdatePackagePayload)=>{
        backendClient.setToken(getSessionToken() || '');
        setLoading(true)
        
        try {
            let response = await backendClient.updatePackageStatus(payload)

            setLoading(false)
            if (response.responseObject) {
                ToastNotify({
                    type: 'success',
                    message: response.responseObject,
                    position: 'top-right',
                });
                fetchCustomerPackageList(query)
                .then((value)=>{
                    let updatedPackage = value?.items.find((p)=> p.id === selectedPackage?.id)
                    if (updatedPackage) {
                        setSelectedPackage(updatedPackage);
                        console.log("UPDATE", updatedPackage)
                    }
                })
            }
            
        } catch (err: any) {
            setLoading(false)
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


    // Helpers
    const getStatusColorClass = (status: PackageStatus) =>{
        switch (status) {
            case PackageStatus.IN_DELIVERY:
                return {
                    text: "text-[#2d9bdb]",
                    border: "border-[#2d9bdb]"
                }

            case PackageStatus.UNDELIVERED:
                return {
                    text: "text-[#EB5757]",
                    border: "border-[#EB5757]"
                }
            case PackageStatus.WAREHOUSE:
                return {
                    text: "text-[#F2994A]",
                    border: "border-[#F2994A]"
                }
            case PackageStatus.DELIVERED:
                return {
                    text: "text-[#219653]",
                    border: "border-[#219653]"
                }
            case PackageStatus.SLA_BREACH:
                return {
                    text: "text-[#F2C94C]",
                    border: "border-[#F2C94C]"
                }
            default:
                return {
                    text: "text-black",
                    border: "border-black"
                };
        }
    }

    // Elements
    const profileSection = (
        <section className="px-8 py-4">

            {/** Profile Picture */}
            <div className="py-5 border-b">

                <div className="flex items-center">
                    <Image
                        src={'/images/svgs/profile-avatar.svg'}
                        loading="lazy"
                        alt={session?.name || "User avatar"}
                        width={100}
                        height={100}
                        className="inline-block rounded-full"
                    />

                </div>
            </div>
            <div className="py-8">
                <ProfileUpdateForm
                    userSession={session}
                />
            </div>
        
        </section>
    )
    const securitySection = (
        <section className="px-8 py-4">

            {/** Profile Picture */}
            <div className="py-5 border-b">
                <h1 className="text-black font-medium">
                    Change Password
                </h1>
            </div>
            <div className="py-8">
                <ChangePasswordForm
                    companyId={session?.id}
                />
            </div>
        
        </section>
    )
   


    return(
        <div className="h-full flex flex-col">
            
            {/** Header */}
            <div className="p-5 border-gray-300 flex items-center h-[68px] border-b">
                <p className="font-bold text-lg ">
                    Settings
                </p>
                <div className="flex-1"></div>

            </div>

            {/** Tab Nav */}
            <div className="px-5">
                <nav className="pt-3 flex border-b relative">
                    <div 
                        className="w-[120px] flex items-center justify-center py-3 cursor-pointer"
                        onClick={()=> setTab('profile')}
                    >
                        <p className={`${tab === 'profile' ? 'font-semibold text-black': 'text-site-gray-82'} `}>
                            Profile
                        </p>
                    </div>
                    <div 
                        className="w-[120px] flex items-center justify-center py-3 cursor-pointer"
                        onClick={()=> setTab('security')}
                    >
                        <p className={`${tab === 'security' ? 'font-semibold text-black': 'text-site-gray-82'} `}>
                            Security
                        </p>
                    </div>

                    <div className={`absolute h-[1px] bottom-0 w-[120px] bg-black  duration-150 transition-all ${tab === 'security' ? 'translate-x-[120px]' : 'translate-x-0'}`}/>
                </nav>
            </div>

            <div>
                { tab === 'profile' && profileSection }
                { tab === 'security' && securitySection }
            </div>


        </div>
    )
}