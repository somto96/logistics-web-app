"use client"

import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import LoadingModal from '@/components/Modals/LoadingModal';
import { AuthProvider } from './AuthProvider';

const Providers: React.FC<any> = ({ children })=>{

    return(
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <AuthProvider>
                { children }
            </AuthProvider>
            <ToastContainer />
        </ReCaptchaProvider>
    )
}

export default Providers;