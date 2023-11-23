import Link from "next/link";
import React from "react";
import Image from 'next/image';
import { BsTelephone } from "react-icons/bs";
import { TbMail } from "react-icons/tb";

const LandingPageFooter: React.FC<any> = ()=>{

    // MenuItems
    type FooterMenuItem = {
        text: string;
        href: string;
    };
    const quickLinksMenu: FooterMenuItem[] = [
        { text: 'About us', href: 'about-us' },
        { text: 'Track', href: '#' },
        { text: 'API Documentation', href: '#' },
        { text: 'Pricing', href: '#' },
    ];
    const getStartedLinksMenu: FooterMenuItem[] = [
        { text: 'Create account', href: '#' },
        { text: 'Sign in', href: '#' },
    ];
    const legalLinksMenu: FooterMenuItem[] = [
        { text: 'Terms and conditions', href: '#' },
        { text: 'Privacy policy', href: '#' },
    ];

    return(
        <footer className="bg-[url('/images/pngs/footer-bg.png')] bg-no-repeat bg-cover bg-center">

            {/** Links */}
            <div 
                data-aos="fade-down"
                data-aos-duration="11000"
                data-aos-easing="linear"
                className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 p-8 border-b md:gap-4 gap-6 aos-init aos-animate"
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

                {/** Quick Links */}
                <div className="space-y-3 text-white">
                    <h3 className="font-bold text-lg">
                        QUICK LINKS
                    </h3>
                    <div className="space-y-3">
                        {
                            quickLinksMenu.map((item, i)=>(
                                <Link
                                    key={`${i}hmft`}
                                    href={item.href}
                                    className={`block`}
                                >
                                    
                                    {item.text}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/** Get Started Links */}
                <div className="space-y-3 text-white">
                    <h3 className="font-bold text-lg">
                        GET STARTED
                    </h3>
                    <div className="space-y-3">
                        {
                            getStartedLinksMenu.map((item, i)=>(
                                <Link
                                    key={`${i}hmft`}
                                    href={item.href}
                                    className={`block`}
                                >
                                    
                                    {item.text}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/** Legal Links */}
                <div className="space-y-3 text-white">
                    <h3 className="font-bold text-lg">
                        LEGAL
                    </h3>
                    <div className="space-y-3">
                        {
                            legalLinksMenu.map((item, i)=>(
                                <Link
                                    key={`${i}hmft`}
                                    href={item.href}
                                    className={`block`}
                                >
                                    
                                    {item.text}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/** News Letter */}
                <div className="space-y-3 text-white md:col-span-1 col-span-2">
                    <h3 className="font-bold text-lg">
                        SUBSCRIBE FOR NEWSLETTER
                    </h3>
                    <p>
                        Do not miss any update from us
                    </p>
                    <div>
                        <input 
                            type="text" 
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-none text-black" 
                            placeholder="Enter your email address"
                        />
                        <button 
                            type="button" 
                            className="py-2 px-4 inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-[#333333] text-white mt-4"
                        >
                            Submit
                        </button>
                    </div>
                </div>

            </div>

            {/** Contact */}
            <div 
                data-aos="fade-up"
                data-aos-duration="13000"
                data-aos-easing="linear"
                className="flex items-center p-8 border-b flex-wrap md:gap-4 aos-init aos-animate"
            >
                
                {/** Social media icons */}
                <div className="inline-flex items-center">
                    <Link
                        href={'#'}
                    >
                        <Image
                            src={'/images/svgs/ig-icon.svg'}
                            alt="Imperium Logistics Instagram"
                            width={92}
                            height={92}
                        />
                    </Link>
                    <Link
                        href={'#'}
                    >
                        <Image
                            src={'/images/svgs/twitter-icon.svg'}
                            alt="Imperium Logistics Twitter"
                            width={92}
                            height={92}
                        />
                    </Link>
                    <Link
                        href={'#'}
                    >
                        <Image
                            src={'/images/svgs/fb-icon.svg'}
                            alt="Imperium Logistics Facebook"
                            width={92}
                            height={92}
                        />
                    </Link>
                    <Link
                        href={'#'}
                    >
                        <Image
                            src={'/images/svgs/linkedin-icon.svg'}
                            alt="Imperium Logistics LinkedIn"
                            width={92}
                            height={92}
                        />
                    </Link>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center sm:space-x-3 sm:flex-row flex-col sm:space-y-0 space-y-3 justify-center sm:justify-start w-full sm:w-auto">
                    <h3 className="font-bold text-lg text-white">
                        CONTACT US:
                    </h3>
                    <Link 
                        href="tel:+2348095594903" 
                        className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md bg-[#E8FAF8]"
                        // onClick={()=> setNextPage(true)}
                    >
                        <BsTelephone size={18} className="text-[#828282]" />
                        +2348095594903
                    </Link>
                    <Link 
                        href="mailto:email@example.com" 
                        className="py-3 px-5 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md bg-[#E8FAF8]"
                        // onClick={()=> setNextPage(true)}
                    >
                        <TbMail size={20} className="text-[#828282]" />
                        email@example.com
                    </Link>
                </div>
            </div>

            <div className="p-5">
                <p className="text-[#e0e0e0] text-center text-sm">
                    All Rights Reserved © logistics 2022
                </p>
            </div>
        </footer>
    )
}

export default LandingPageFooter