'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiHome, FiSettings } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
// import { useSession } from "@/hooks/useSession";
import { RxExit } from "react-icons/rx";
import { useAuth } from "@/providers/AuthProvider";
import Image from 'next/image';

interface MenuItem{
    icon?: React.ReactNode;
    label: string;
    active: boolean;
    href?: string;
    children?: MenuItem[];
}

const RiderDashboardSidebar: React.FC<any> = ()=>{

    // Hook
    const pathname = usePathname();
    // const session = useSession()
    const { session, signOut, user } = useAuth()
    const router = useRouter()

    // Classes
    const activeClass = 'flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-black font-medium rounded-lg hover:bg-gray-100';
    const inactiveClass = 'flex items-center gap-x-3.5 py-2 px-2.5 text-white font-medium rounded-lg hover:bg-gray-100 hover:text-black';

    // Helpers
	const isActiveRoute = (name: string)=>{
		let indexOfLastStroke = pathname.lastIndexOf('/');
		let endPath = pathname.slice(indexOfLastStroke + 1);

		return (
		endPath.toLowerCase() === name.toLowerCase() 
		// router.pathname.toLowerCase().includes(name.toLowerCase())
		)
	}
    const isUserManagementActive = ()=>{
        return isActiveRoute('customers') || isActiveRoute('riders')
    }

    // Handlers
    const handleLogout = ()=>{
        signOut()
        router.replace('/sign-in');
    }

    const toggleHamburger = ()=>{
        document.getElementById('dsh-burger')?.click()
    }

    // Menu Items
    const menuItems: MenuItem[] = [
        {
            icon: <MdOutlineDashboard size={20} />,
            label: "Dashboard",
            active: isActiveRoute("back-office") || isActiveRoute("user"),
            href: '#'
        }
    ]

    // Icons
    const deliveryIcon = (
        <svg width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 631">
        <g id="Group 638">
        <path id="Vector" d="M18.7941 9.661C18.473 9.62224 18.1811 9.85204 18.1428 10.1734C17.6613 14.2081 14.225 17.2509 10.1498 17.2509C8.27544 17.2509 6.45049 16.5935 5.01113 15.4001C3.74313 14.3488 2.82729 12.9302 2.39089 11.3595L3.09097 11.744C3.37463 11.8998 3.73077 11.7962 3.88656 11.5125C4.04235 11.2288 3.93874 10.8726 3.65508 10.7168L1.85699 9.72921C1.57363 9.57357 1.21764 9.67687 1.0617 9.96007L0.0727763 11.7559C-0.0833211 12.0394 0.0199809 12.3957 0.303337 12.5518C0.668937 12.7193 0.953209 12.5651 1.09924 12.3212L1.32919 11.9036C1.85271 13.6118 2.87338 15.1499 4.26315 16.3022C5.91232 17.6696 8.00292 18.4226 10.1497 18.4226C14.8181 18.4226 18.7546 14.936 19.3063 10.3121C19.3448 9.9909 19.1153 9.6993 18.7941 9.661Z" fill="#4F4F4F"/>
        <path id="Vector_2" d="M19.6457 5.00351C19.3487 4.87549 19.0037 5.01236 18.8757 5.30945L18.6912 5.73731C18.0896 4.26865 17.1077 2.95914 15.8498 1.96991C14.211 0.681152 12.2398 0 10.1497 0C8.02169 0 5.94558 0.74112 4.30358 2.0871C2.68416 3.41431 1.55562 5.26672 1.12594 7.30286C1.0591 7.61948 1.26174 7.9303 1.57836 7.99713C1.96959 8.00995 2.21434 7.82059 2.27248 7.54486C2.64739 5.76859 3.6325 4.15222 5.04638 2.99332C6.47948 1.8187 8.29192 1.17188 10.1497 1.17188C11.9745 1.17188 13.6952 1.76636 15.1254 2.89093C16.2849 3.8028 17.1757 5.02564 17.6906 6.39404L16.9488 6.07498C16.6518 5.94727 16.3069 6.08444 16.179 6.38168C16.0512 6.67893 16.1885 7.02362 16.4857 7.15149L18.3705 7.96219C18.7091 8.06671 18.9958 8.00842 19.1402 7.65595L19.9518 5.77347C20.0799 5.47638 19.9429 5.13168 19.6457 5.00351Z" fill="#4F4F4F"/>
            <g id="11 - 20">
        <path 
            id="Vector_3" 
            d="M11.3891 5C11.6082 5 11.7859 5.17766 11.7859 5.39683V5.79365H13.77V8.1746H12.9689L14.0585 11.1682C14.1284 11.3472 14.1668 11.5419 14.1668 11.7456C14.1668 12.6223 13.4562 13.3329 12.5795 13.3329C11.84 13.3329 11.2187 12.8273 11.0423 12.1429H9.35492C9.17871 12.8275 8.55724 13.3333 7.81762 13.3333C7.046 13.3333 6.40297 12.7827 6.25998 12.053C6.0065 11.9205 5.8335 11.6551 5.8335 11.3492V7.38095C5.8335 7.16179 6.01116 6.98413 6.23032 6.98413H9.0081C9.22726 6.98413 9.40492 7.16179 9.40492 7.38095V9.36508C9.40492 9.58424 9.58259 9.7619 9.80175 9.7619H10.5954C10.8146 9.7619 10.9922 9.58424 10.9922 9.36508V5.79365H9.80175V5H11.3891ZM7.81762 10.9524C7.3793 10.9524 7.02397 11.3077 7.02397 11.746C7.02397 12.1844 7.3793 12.5397 7.81762 12.5397C8.25594 12.5397 8.61127 12.1844 8.61127 11.746C8.61127 11.3077 8.25594 10.9524 7.81762 10.9524ZM12.5795 10.952C12.1412 10.952 11.7859 11.3073 11.7859 11.7456C11.7859 12.184 12.1412 12.5393 12.5795 12.5393C13.0178 12.5393 13.3732 12.184 13.3732 11.7456C13.3732 11.6503 13.3564 11.5588 13.3255 11.4741L13.319 11.4569C13.2035 11.1614 12.916 10.952 12.5795 10.952ZM12.1244 8.1746H11.7859V9.36508C11.7859 10.0226 11.2529 10.5556 10.5954 10.5556H9.80175C9.14427 10.5556 8.61127 10.0226 8.61127 9.36508H6.62715V10.6961C6.918 10.3666 7.34354 10.1587 7.81762 10.1587C8.55724 10.1587 9.17871 10.6646 9.35492 11.3492H11.0421C11.2182 10.6644 11.8398 10.1583 12.5795 10.1583C12.6735 10.1583 12.7656 10.1665 12.8551 10.1822L12.1244 8.1746ZM8.61127 7.77778H6.62715V8.57143H8.61127V7.77778ZM12.9764 6.5873H11.7859V7.38095H12.9764V6.5873Z" 
            fill="black"
        />
        </g>
        </g>
        </g>
        </svg>

    )


    // Elements
    const sidebarNav = (
        <nav className="flex flex-col h-full">
            <div className="mb-10 bg-black p-5">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-[2px] rounded-full flex items-center justify-center">
                        <Image
                            src={'/images/svgs/profile-avatar.svg'}
                            loading="lazy"
                            alt={user?.rider?.fullName || "User avatar"}
                            width={65}
                            height={65}
                        />
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">
                            { user?.rider?.fullName }
                        </p>
                        <p className="text-xs text-site-gray-border">
                            { user?.rider?.phoneNumber }
                        </p>
                    </div>
                </div>
            </div>
            <ul className="space-y-4 flex-1">
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-black font-medium rounded-lg hover:bg-gray-100 hover:text-black`} 
                        href={session?.role.toLocaleLowerCase() === 'admin' ? '/dashboard/backoffice' : '/dashboard/user'}
                        onClick={toggleHamburger}
                    >
                        <FiHome size={20} />
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-black font-medium rounded-lg hover:bg-gray-100 hover:text-black`} 
                        href={session?.role.toLocaleLowerCase() === 'admin' ? '/dashboard/backoffice' : '/dashboard/user'}
                        onClick={toggleHamburger}
                    >
                        { deliveryIcon }
                        Delivery History
                    </Link>
                </li>
                <li>
                    <Link 
                        onClick={toggleHamburger}
                        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-black font-medium rounded-lg hover:bg-gray-100 hover:text-black`} 
                        href={session?.role.toLocaleLowerCase() === 'admin' ? '/dashboard/backoffice/settings' : '/dashboard/user/settings'}
                    >
                        <FiSettings size={20} />
                        Settings
                    </Link>
                </li>
            </ul>
            <button 
                className={`flex items-center gap-x-3.5 py-2.5 px-2.5 text-white font-medium w-full bg-black`} 
                onClick={handleLogout}
            >
                <RxExit size={20} />
                Logout
            </button>
        </nav>
    )

    return(
        <div 
            id="hs-overlay-dashboard-rider" 
            className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white hidden" 
            tabIndex={-1}
        >
            { sidebarNav }
        </div>
    )
}

export default RiderDashboardSidebar;