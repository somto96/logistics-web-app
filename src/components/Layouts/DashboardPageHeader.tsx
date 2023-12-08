"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSession } from '@/hooks/useSession';
import { RxHamburgerMenu } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import MobileDashboardSidebar from './MobileDashboardSidebar';
import UserProfileDropdown from './UserProfileDropdown';
import AddNewPackageForm from '@/forms/AddNewPackageForm';

const DashboardPageHeader: React.FC<any> = ()=>{

    // Ref
    const hamburgerRef = React.createRef<HTMLButtonElement>();
    const modalRef = React.createRef<HTMLDivElement>()

    const session = useSession();
    const pathname = usePathname()

    // Handlers
    const toggleStepperModal = ()=>{
        document.body.classList.toggle('overflow-hidden')
        modalRef.current?.classList.toggle('hidden');
    }

    // Effect
    React.useEffect(()=>{
        if (typeof window !== undefined){
            let backdropEl = document.querySelector<HTMLDivElement>('[data-hs-overlay-backdrop-template]');
            backdropEl?.remove()
            document.body.style.overflow = '';
        }
    },[pathname])

    return(
        <>
        <div 
            ref={modalRef}
            // id="imperium-modal" 
            className="transition hidden duration fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
        >
            
            <div className='h-full w-full items-center justify-center flex'>
                <div className='sm:w-[90%] md:w-[950px] w-[90%] bg-white rounded-lg h-[90%] flex flex-col text-black'>

                    <AddNewPackageForm 
                        onSuccess={toggleStepperModal}
                        onClose={toggleStepperModal}
                    />

                </div>
            </div>
            
        </div>
        <MobileDashboardSidebar/>
       
        <header 
            className={`sticky top-0 w-full py-3 flex md:pl-20 md:pr-10 px-4 z-20 bg-black`}
        >
        
            {/** Logo */}
            <div>
                <Link href={'/'}>
                    <Image
                        src={'/images/svgs/header-logo.svg'}
                        loading="lazy"
                        alt="Imperium Logistics"
                        width={86}
                        height={60}
                    />
                </Link>
            </div>

            {/** Spacer */}
            <div className='flex-1'></div>

            <div className='justify-self-end flex items-center space-x-8'>

                {
                    session?.role === "Company" &&
                    <button
                        onClick={toggleStepperModal}
                        className={`min-w-10 inline-flex items-center px-4 h-10 text-sm text-center rounded-full text-black bg-white font-semibold`}
                    >
                        Add New Delivery
                    </button>
                }

                <UserProfileDropdown
                    session={session}
                    containerClassname='xl:inline-flex hidden'
                />

                <button 
                    id='dsh-burger'
                    // ref={hamburgerRef}
                    type="button" 
                    className="font-semibold text-white block xl:hidden" 
                    data-hs-overlay="#hs-overlay-dashboard-admin"
                    // onClick={()=> alert('CLICKED')}
                >
                    <RxHamburgerMenu size={30} />
                </button>
            </div>

        </header>

        </>
    )
}

export default DashboardPageHeader