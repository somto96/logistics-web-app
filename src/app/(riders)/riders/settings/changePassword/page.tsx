"use client"

import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Image from "next/image";
import RiderProfileUpdateForm from '@/forms/RiderProfileUpdateForm';
import ChangeRiderPasswordForm from '@/forms/ChangeRiderPasswordForm';
import { useRouter } from 'next/navigation';

export default function RiderChangePasswordPage() {

    // Hooks
    const { refreshCurrentUser } = useAuth();
    const router = useRouter()

    // Handlers
    const handleOnSuccess = ()=>{
        refreshCurrentUser()
    }

    return(
        <div className="w-screen h-screen bg-white text-black flex flex-col">

            {/** Header */}
            <div className="p-5 relative  bg-black">
                <p className="text-lg text-center text-white">
                    Change Password
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

            {/** Form */}
            <div className='py-5 px-8'>
                <ChangeRiderPasswordForm
                />
            </div>
            
        </div>
    )
}