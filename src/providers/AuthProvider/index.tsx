"use client"

import { AUTH_KEY, PROFILE_KEY } from "@/constants/cookie.config";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { CompanyData } from "@/types/responses/CompanyData";
import { RiderData } from "@/types/responses/RiderData";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import axios, { AxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function isMyTokenExpired(token: string) {
    let decoded = jwtDecode<{ sub: string; email: string; iat: number; exp: number }>(token);
    let isExpired = Date.now() >= decoded.exp * 1000;
    return isExpired;
}


export interface UserAuth{
    company?: CompanyData;
    rider?: RiderData;
}

interface AuthContextProps{
    setUser: (session: SignInResponseData)=> void;
    signOut: ()=> void;
    user?: UserAuth;
    authAttempted?: boolean;
    refreshCurrentUser: ()=> Promise<void>;
    isRefreshing: boolean;
    session?: SignInResponseData;
}

const AuthContext = React.createContext<AuthContextProps>({
    setUser: ()=> console.log('Nothing'),
    signOut:()=> console.log('Nothing'),
    refreshCurrentUser: ()=> (async()=> console.log('Nothing'))(),
    isRefreshing: false
});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: { children: React.ReactNode }) {

    // Hooks
    const router = useRouter()
    const pathname = usePathname();

    // Default Profile
    const currentSession = getCookie(AUTH_KEY)?.toString();
    const currentAuth = getCookie(PROFILE_KEY)?.toString();
    const defaultAuth = currentAuth ? JSON.parse(currentAuth) : undefined
    const defaultSession = currentSession ? JSON.parse(currentSession) : undefined
  
    // State
    const [user, setAuth] = React.useState<UserAuth|undefined>(defaultAuth);
    const [authAttempted, setAttemptedAuth] = React.useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
    const [session, setSession] = React.useState<SignInResponseData|undefined>(defaultSession);
 


    // Helpers
    const fetchCompany = async (token: string)=>{
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/Company/detail`;
        let requestConfig: AxiosRequestConfig = {
            headers:{
            Authorization: `Bearer ${token}`
            }
        }
        console.log("Fetching current user profile...") // Debug
        setIsRefreshing(true);

        try {
            let res = await axios.get<ApiResponse<CompanyData>>(url, requestConfig);
            console.log("Current user profile fetched: ", res.data.responseObject) // Debug

            if (res.data.responseObject) {
                let auth: UserAuth = {
                    company: res.data.responseObject
                }
                setCookie(PROFILE_KEY, JSON.stringify(auth));
                setAuth((prevState)=>({
                    ...prevState,
                    company: res.data.responseObject
                }))
            }

            setIsRefreshing(false);
            setAttemptedAuth(true);
    
        } 
        catch (error) {
            console.log(JSON.stringify(error));
            console.log("Error fetching current user profile!") // Debug
            setIsRefreshing(false);
        }
    }

    const fetchRider = async (id: string)=>{
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/Rider/id/${id}`;
        
        console.log("Fetching current user profile...") // Debug
        setIsRefreshing(true);

        try {
            let res = await axios.get<ApiResponse<RiderData>>(url);
            console.log("Current user profile fetched: ", res.data.responseObject) // Debug

            if (res.data.responseObject) {
                let auth: UserAuth = {
                    rider: res.data.responseObject
                }
                setCookie(PROFILE_KEY, JSON.stringify(auth));
                setAuth((prevState)=>({
                    ...prevState,
                    rider: res.data.responseObject
                }))
            }

            setIsRefreshing(false);
            setAttemptedAuth(true);
    
        } 
        catch (error) {
            console.log(JSON.stringify(error));
            console.log("Error fetching current user profile!") // Debug
            setIsRefreshing(false);
        }
    }

    const setUserSession = (session: SignInResponseData)=>{
        setSession(session);

        if (session.role.toLocaleLowerCase() === 'rider') {
            fetchRider(session.id)
        }

        if (session.role.toLocaleLowerCase() === 'company') {
            fetchCompany(session.token)
        }
    }

    const refreshCurrentUser = async ()=>{
        if (session?.role.toLocaleLowerCase() === 'rider') {
            fetchRider(session.id)
        }

        if (session?.role.toLocaleLowerCase() === 'company') {
            fetchCompany(session.token)
        }
    }

    const signOut = async()=>{
        deleteCookie(AUTH_KEY)
        deleteCookie(PROFILE_KEY)
        setAuth(undefined);
        setSession(undefined)
    }


    React.useEffect(() => {
        // Get auth from cookie
        const currentAuth = getCookie(AUTH_KEY)?.toString();

        if (currentAuth) {

            let parsedAuth = JSON.parse(currentAuth);
            if (isMyTokenExpired((parsedAuth as SignInResponseData)?.token)) {
                ToastNotify({
                    type: 'error',
                    message: "Your session timed out"
                })
                signOut()
                
                if (/(dashboard.*$|riders.*$)/.test(pathname)) {
                    router.replace('/sign-in');
                }
            }  
            else{
                setSession(parsedAuth)
            }
            
        }
        
    }, [router])


    

  // useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        setUser: setUserSession,
        signOut: signOut,
        user,
        session,
        authAttempted,
        isRefreshing,
        refreshCurrentUser
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}