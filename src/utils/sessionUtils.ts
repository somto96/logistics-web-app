import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { getCookie } from "cookies-next";

export function getSessionToken() {
    const session = getCookie(AUTH_KEY)?.toString();

    if (session) {
        let parsedSession = JSON.parse(session);
        return (parsedSession as SignInResponseData)?.token
    }
    
}