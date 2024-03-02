"use client"

import { AUTH_KEY, PERSIST_KEY, PROFILE_KEY } from "@/constants/cookie.config";
import { RefreshTokenPayload } from "@/types/requests/RefreshTokenPayload";
import { ApiResponse } from "@/types/responses/ApiResponse";
import { CompanyData } from "@/types/responses/CompanyData";
import { RefreshTokenResponseData } from "@/types/responses/RefreshTokenResponseData";
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
    setUser: (session: SignInResponseData, persist?: boolean)=> void;
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
    const currentPersist = getCookie(PERSIST_KEY)?.toString();
    const defaultAuth = currentAuth ? JSON.parse(currentAuth) : undefined
    const defaultSession = currentSession ? JSON.parse(currentSession) : undefined
    const defaultPersist = currentPersist ? Boolean(currentPersist) : false
  
    // State
    const [user, setAuth] = React.useState<UserAuth|undefined>(defaultAuth);
    const [authAttempted, setAttemptedAuth] = React.useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
    const [session, setSession] = React.useState<SignInResponseData|undefined>(defaultSession);
    const [isSessionExpired, setIsSessionExpired] = React.useState<boolean>(false);
    const [isSessionPersisted, setIsSessionPersisted] = React.useState<boolean>(defaultPersist);


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

    

    const setUserSession = (session: SignInResponseData, persist: boolean = false)=>{
        setSession(session);
        setIsSessionPersisted(persist)

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

    const refreshToken = async (token: string)=>{
        if (session) {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/refresh-token`;
            const config: AxiosRequestConfig = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            const payload: RefreshTokenPayload = {
                refreshToken: session.reIssueToken
            }
            
            console.log("Refreshing session...") // Debug
            setIsRefreshing(true);

            try {
                let res = await axios.post<ApiResponse<RefreshTokenResponseData>>(url, payload, config);
                console.log("session refrehsed: ", res.data.responseObject) // Debug

                if (res.data.responseObject) {

                    let cloneSession: SignInResponseData = { ...session }
                    cloneSession.token = res.data.responseObject.accessToken;
                    cloneSession.reIssueToken = res.data.responseObject.refreshToken;
                    setCookie(AUTH_KEY, JSON.stringify(cloneSession));
                    setUserSession(cloneSession)
                }

                setIsRefreshing(false);
        
            } 
            catch (error) {
                console.log(JSON.stringify(error));
                console.log("Error while refreshing user session!") // Debug
                setIsRefreshing(false);
            }
        }
    }

    const signOut = async()=>{
        deleteCookie(AUTH_KEY)
        deleteCookie(PROFILE_KEY)
        deleteCookie(PERSIST_KEY)
        setAuth(undefined);
        setSession(undefined)
        setIsSessionPersisted(false)
    }

    const monitorSession = ()=>{
        if (session?.token) {
            const myDecodedToken = jwtDecode<{ sub: string; email: string; iat: number; exp: number }>(session.token);
            
            if (myDecodedToken) {
                let timeToExpiration = myDecodedToken.exp - (Date.now()/1000);
                timeToExpiration = Math.floor(timeToExpiration * 1000);

                if (isSessionPersisted) {
                    timeToExpiration = timeToExpiration - 20000 // 20 seconds before session expires
                }

                console.log(timeToExpiration);

                if (timeToExpiration <= 0) {
                    setIsSessionExpired(true);
                }
                else{
                    setTimeout(()=>{
                        if (isSessionPersisted) {
                            refreshToken(session.token)
                        }
                        else{
                            setIsSessionExpired(true);
                        }
                    },timeToExpiration)
                }
            }
        }
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

    React.useEffect(()=>{
        monitorSession();
    },[]);

    React.useEffect(()=>{
        if (isSessionExpired) {
            setIsSessionExpired(false);
            ToastNotify({
                type: 'error',
                message: "Your session timed out"
            })
            signOut()
            
            if (/(dashboard.*$|riders.*$)/.test(pathname)) {
                router.replace('/sign-in');
            }
        }
    },[isSessionExpired]);


    

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