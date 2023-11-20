"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const LandingPageHeader: React.FC<any> = ()=>{

    // Ref
    const headerRef = React.createRef<HTMLHeadElement>();
    const hamburgerRef = React.createRef<HTMLButtonElement>();
    
    // Hooks
    const pathname = usePathname()

   // MenuItems
    type HomeMenuItem = {
        text: string;
        href: string;
    };
    const menuItems: HomeMenuItem[] = [
        { text: 'Home', href: '/' },
        { text: 'Our services', href: '#' },
        { text: 'About us', href: '#' },
        { text: 'Sign in', href: '#' },
    ];

    // Mobile Off canvas
    const mobileOffCanvas = (
        <div 
            id="hs-overlay-right" 
            className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-black hidden" 
            tabIndex={-1}
        >
            <div className="flex justify-between items-center py-3 px-4">
                {/* <h3 className="font-bold text-gray-800 dark:text-white">
                    Offcanvas title
                </h3> */}
                <button 
                    type="button" 
                    className="font-semibold rounded-full border border-transparent text-white hover:bg-gray-100 ml-auto" 
                    data-hs-overlay="#hs-overlay-right"
                >
                <span className="sr-only">Close modal</span>
                    <AiOutlineClose size={20} />
                </button>
            </div>
            <div className="p-4 space-y-8">
                {
                    menuItems.map((item, i) => (
                        <Link
                            key={`${i}hmn`}
                            href={item.href}
                            onClick={()=> hamburgerRef.current?.click()}
                            // className='text-white font-medium hover:text-gray-100'
                            className={`text-sm ${pathname === item.href ? 'text-white' : 'text-white'} font-light hover:font-medium block`}
                            >
                            
                            {item.text}
                        </Link>
                    ))
                }
                <Link
                    href={'/create-account'}
                    className='min-w-10 inline-flex items-center px-4 h-10 text-sm font-medium text-center text-black bg-white rounded-full hover:bg-slate-200'>
                    Create Account
                </Link>
            </div>
        </div>
    )



    // Effects
    React.useEffect(()=>{
        const changeBg = () => {
            if (window.scrollY >= 50) {
                headerRef.current?.classList.add('bg-black')
            } else {
                headerRef.current?.classList.remove('bg-black')
            }
        };
      
        window.addEventListener('scroll', changeBg);
      
        return () => {
            window.removeEventListener('scroll', changeBg);
        };

    },[])

    return(
        <>
        { mobileOffCanvas }
        <header 
            ref={headerRef}
            className='fixed top-0 w-full py-3 flex md:px-20 px-4 z-20'
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

            {/** Actions */}
            <div className='justify-self-end'>

                {/** Menu Links */}
                <div className='space-x-5 md:inline-flex hidden items-center h-full'>
                    {
                        menuItems.map((item, i) => (
                            <Link
                                key={`${i}hmn`}
                                href={item.href}
                                // className='text-white font-medium hover:text-gray-100'
                                className={`text-sm ${pathname === item.href ? 'text-white' : 'text-white'} font-light hover:font-medium`}
                                >
                                
                                {item.text}
                            </Link>
                        ))
                    }
                    <Link
                        href={'/create-account'}
                        className='min-w-10 inline-flex items-center px-4 h-10 text-sm font-medium text-center text-black bg-white rounded-full hover:bg-slate-200'>
                        Create Account
                    </Link>
                </div>

                <button 
                    ref={hamburgerRef}
                    type="button" 
                    className="font-semibold text-white block md:hidden" 
                    data-hs-overlay="#hs-overlay-right"
                >
                    <RxHamburgerMenu size={30} />
                </button>
            </div>

        </header>
        </>
    )
}

export default LandingPageHeader;