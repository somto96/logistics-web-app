"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSession } from '@/hooks/useSession';
import { RxHamburgerMenu } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import MobileDashboardSidebar from './MobileDashboardSidebar';

const DashboardPageHeader: React.FC<any> = ()=>{

    // Ref
    const hamburgerRef = React.createRef<HTMLButtonElement>();

    const session = useSession();
    const pathname = usePathname()

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

            <div className='justify-self-end flex items-center'>

                <button 
                    ref={hamburgerRef}
                    type="button" 
                    className="font-semibold text-white block xl:hidden" 
                    data-hs-overlay="#hs-overlay-dashboard-admin"
                >
                    <RxHamburgerMenu size={30} />
                </button>
            </div>

        </header>

        </>
    )
}

export default DashboardPageHeader