import React from "react";
import Image from 'next/image';
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { twMerge } from "tailwind-merge";
import { deleteCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookie.config";
import { useRouter } from "next/navigation";

export interface UserProfileDropdownProps{
    session?: SignInResponseData;
    containerClassname?: string;
    disabled?: boolean;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ session, containerClassname, disabled })=>{

    // Hooks
    const router = useRouter();

    // Variables
    let defaultContainerClasses = 'hs-dropdown relative inline-flex';
    let containerClasses = twMerge(defaultContainerClasses, containerClassname);

    // Handlers
    const handleLogout = ()=>{
        deleteCookie(AUTH_KEY)
        router.replace('/sign-in');
    }

    if (disabled) {
        return (
            <button 
                id="hs-dropdown-default" 
                type="button" 
                disabled
                className="hs-dropdown-toggle py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none">
                    <Image
                        src={'/images/svgs/profile-avatar.svg'}
                        loading="lazy"
                        alt={session?.name || "User avatar"}
                        width={24}
                        height={24}
                    />
                { session?.name || "--" }
            </button>
        )
    }
    
    return(
        <div className={containerClasses}>
            <button 
                id="hs-dropdown-default" 
                type="button" 
                className="hs-dropdown-toggle py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    <Image
                        src={'/images/svgs/profile-avatar.svg'}
                        loading="lazy"
                        alt={session?.name || "User avatar"}
                        width={24}
                        height={24}
                    />
                { session?.name || "--" }
                <svg 
                    className="hs-dropdown-open:rotate-180 w-4 h-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>

            <div 
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" 
                aria-labelledby="hs-dropdown-default"
            >
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default UserProfileDropdown;