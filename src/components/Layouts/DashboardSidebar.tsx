'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

interface MenuItem{
    icon?: React.ReactNode;
    label: string;
    active: boolean;
    href?: string;
    children?: MenuItem[];
}

const DashboardSidebar: React.FC<any> = ()=>{

    // Hook
    const pathname = usePathname();

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

    // Menu Items
    const menuItems: MenuItem[] = [
        {
            icon: <MdOutlineDashboard size={20} />,
            label: "Dashboard",
            active: isActiveRoute("back-office") || isActiveRoute("user"),
            href: '#'
        }
    ]

    return(
        <div 
            id="docs-sidebar" 
            className="bg-black h-full p-5">
            <nav>
                <ul className="space-y-8">
                    <li>
                        <Link 
                            className={isActiveRoute("back-office") || isActiveRoute("user") ? activeClass : inactiveClass} 
                            href="#"
                        >
                           <MdOutlineDashboard size={20} />
                            Dashboard
                        </Link>
                    </li>
                    
                    <li>
                        <div className="hs-accordion-group" data-hs-accordion-always-open>
                            <div 
                                className={`hs-accordion ${isUserManagementActive() ? 'active' : ''} hs-accordion-active:bg-gray-100 hover:bg-gray-100 rounded-lg`} 
                                id="hs-basic-heading-e"
                            >
                                <button 
                                    aria-controls="hs-basic-collapse-e"
                                    className="hs-accordion-toggle hs-accordion-active:bg-gray-100 flex items-center gap-x-3.5 py-2 px-2.5 text-white hs-accordion-active:text-black font-medium hover:text-black hover:bg-gray-100 w-full rounded-lg" 
                                    // href="#"
                                >
                                    <LuUsers size={20} />
                                    User Management
                                </button>
                                <div 
                                    id="hs-basic-collapse-e" 
                                    className={`hs-accordion-content ${isUserManagementActive() ? '' : 'hidden'} w-full overflow-hidden transition-[height] duration-300 bg-gray-100 rounded-lg`} 
                                    aria-labelledby="hs-basic-heading-e"
                                >
                                    <Link 
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 ${isActiveRoute('customers') ? 'text-black' : 'text-gray-400'} text-sm hover:text-black `}
                                        href="#"
                                    >
                                    {/* <MdOutlineDashboard size={20} /> */}
                                        Customers
                                    </Link>
                                    <Link 
                                        className={`flex items-center gap-x-3.5 py-2 px-2.5 ${isActiveRoute('riders') ? 'text-black' : 'text-gray-400'} text-sm hover:text-black `}
                                        href="#"
                                    >
                                    {/* <MdOutlineDashboard size={20} /> */}
                                        Delivery Riders
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link 
                            className={isActiveRoute('settings') ? activeClass : inactiveClass} 
                            href="#"
                        >
                           <FiSettings size={20} />
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default DashboardSidebar;