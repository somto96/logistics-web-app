"use client"

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SignInPageHeader: React.FC<any> = ()=>{

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
        <header 
            className={`fixed top-0 w-full py-3 flex md:px-20 px-4 z-20`}
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

export default SignInPageHeader