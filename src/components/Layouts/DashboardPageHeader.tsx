"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useSession } from '@/hooks/useSession';

const DashboardPageHeader: React.FC<any> = ()=>{

    const session = useSession();

    return(
        <header 
            className={`sticky top-0 w-full py-3 flex md:px-20 px-4 z-20 bg-black`}
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

        </header>
    )
}

export default DashboardPageHeader