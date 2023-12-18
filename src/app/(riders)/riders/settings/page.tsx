"use client"

import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Image from "next/image";
import { FiEdit, FiLock } from 'react-icons/fi';
import { FaChevronRight } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function RiderSettingsPage() {

    // Hooks
    const { user } = useAuth()
    const router = useRouter()

    return(
        <div className="w-screen h-screen bg-white text-black flex flex-col">

            {/** Header */}
            <div className="p-5 relative  bg-black">
                <p className="text-lg text-center text-white">
                    Settings
                </p>
                <div className='absolute left-0 top-0 p-5 h-full flex items-center'>
                    <button
                        className='text-sm text-white'
                        onClick={router.back}
                    >
                        <MdArrowBack size={28} />
                    </button>
                </div>
            </div>

            {/** Profile */}
            <div className='bg-black p-5'>
                <div className='flex items-center'>
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
                    <div className='flex-1'></div>
                    <div>
                        <FiEdit 
                            size={20} 
                            className="text-white cursor-pointer" 
                        />
                    </div>
                </div>
            </div>

            {/** Action Section */}
            <section className='mt-3'>
                <div className='flex items-center p-5 border-b border-site-gray-border cursor-pointer hover:opacity-60'>
                    <div className='flex items-center gap-3'>
                        <FiLock size={20} />
                        <p className='text-black'>
                            Change Password
                        </p>
                    </div>
                    <div className='flex-1'></div>
                    <div>
                        <FaChevronRight />
                    </div>
                </div>
            </section>
            
        </div>
    )
}