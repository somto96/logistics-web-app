"use client"

import React from "react";
import { PaginatedQuery } from "@/types/requests/PaginatedQuery";
import { useRouter } from "next/navigation";
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from "@/utils/sessionUtils";
import Image from "next/image";
import ProfileUpdateForm from "@/forms/ProfileUpdateForm";
import ChangePasswordForm from "@/forms/ChangePasswordForm";
import { useAuth } from "@/providers/AuthProvider";



backendClient.setToken(getSessionToken() || '');

type DashboardViewType = 'main'|'assign'|'package'|'tracking'

export default function UserSettings() {

    // Hooks
    const router = useRouter()
    // const session = useSession();
    const { session, user } = useAuth()

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
                    companyData={user?.company}
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