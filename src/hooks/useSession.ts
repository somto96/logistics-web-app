"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { jwtDecode} from "jwt-decode";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";

function isMyTokenExpired(token: string) {
    let decoded = jwtDecode<{ sub: string; email: string; iat: number; exp: number }>(token);
    let isExpired = Date.now() >= decoded.exp * 1000;
    return isExpired;
}

export function useSession() {
    
    // Hooks
    const router = useRouter()

    // Represents the tokens we get from the Login call
    const [session, setSession] = React.useState<SignInResponseData>();

    React.useEffect(()=>{

        // Get auth from cookie
        const currentAuth = getCookie(AUTH_KEY)?.toString();

        if (currentAuth) {

            let parsedAuth = JSON.parse(currentAuth);
            if (isMyTokenExpired((parsedAuth as SignInResponseData)?.token)) {
                ToastNotify({
                    type: 'error',
                    message: "Your session timed out"
                })
                deleteCookie(AUTH_KEY)
                setSession(undefined)
                router.replace('/sign-in');
            }  
            else{
                setSession(JSON.parse(currentAuth));
            }
            
        }
    }, [router])

    return session
}