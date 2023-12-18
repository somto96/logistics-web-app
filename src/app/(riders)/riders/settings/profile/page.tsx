"use client"

import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Image from "next/image";
import RiderProfileUpdateForm from '@/forms/RiderProfileUpdateForm';
import { useRouter } from 'next/navigation';

export default function RiderProfileSettingsPage() {

    // Hooks
    const { user, refreshCurrentUser } = useAuth();
    const router = useRouter();

    // Handlers
    const handleOnSuccess = ()=>{
        refreshCurrentUser()
    }

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

            {/** Image Update */}
            <div className='px-5 py-10 flex items-center flex-col gap-4'>
                <Image
                    src={'/images/svgs/profile-avatar.svg'}
                    loading="lazy"
                    alt={user?.rider?.fullName || "User avatar"}
                    width={65}
                    height={65}
                />
                <button
                    // onClick={toggleModal}
                    className={`min-w-[136px] inline-flex items-center justify-center px-4 h-8 text-sm text-center rounded-full text-black bg-white border border-black hover:opacity-90`}
                >
                    Change Picture
                </button>
            </div>

            {/** Form */}
            <div className='py-5 px-8'>
                <RiderProfileUpdateForm
                    riderData={user?.rider}
                    onSuccess={handleOnSuccess}
                />
            </div>
            
        </div>
    )
}