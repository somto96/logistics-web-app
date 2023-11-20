import Link from 'next/link';
import React from 'react';

const SetupYourAccountSection: React.FC<any> = ()=>{

    return(
        <div className="aos-init aos-animate sm:p-20 p-10 bg-[url('/images/pngs/create-account-banner.png')] bg-no-repeat bg-cover"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-delay="0"
        >
            <div className='flex'>
                <div className='justify-self-start flex flex-col'>
                    <p className='text-xl mb-3'>
                        Set up your account for free now
                    </p>
                    <div className='self-center'>
                        <Link
                            href={'/create-account'}
                            className='min-w-10 inline-flex items-center px-4 h-10 text-sm font-medium text-center text-white bg-black rounded-full'>
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetupYourAccountSection;