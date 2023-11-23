import { cookies } from 'next/headers';
import { getCookie } from "cookies-next";
import { redirect } from 'next/navigation'
import { RedirectType } from "next/dist/client/components/redirect";
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from '@/types/responses/SignInResponseData';
import { jwtDecode} from "jwt-decode";

function isMyTokenExpired(token: string) {
    let decoded = jwtDecode<{ sub: string; email: string; iat: number; exp: number }>(token);
    let isExpired = Date.now() >= decoded.exp * 1000;
    return isExpired;
}

export function getSession() {
  const cookieStore = cookies()
  const currentAuth = getCookie(AUTH_KEY) || cookieStore.get(AUTH_KEY)?.value;

  if (currentAuth) {
    const session = JSON.parse(currentAuth);
    return session as SignInResponseData;
  }

  return "";
}

export const checkAccessToAuthPages = async () => {
  const session = getSession();

  if (session) {
    if (!isMyTokenExpired((session as SignInResponseData).token)) {
      redirect('/dashboard/back-office', RedirectType.replace);
    }
  }
};

export const checkAccessToDashboardPages = async () => {
    const session = getSession();

    console.log("SESSION: ", session);

    if (!session) {
      redirect('/sign-in', RedirectType.replace);
    }

    // if (isMyTokenExpired((session as SignInResponseData).token)) {
    //   console.log("SESSION EXPIRED: ", session);
    //   redirect('/sign-in', RedirectType.replace);
    // }  
};