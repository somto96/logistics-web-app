import { NextRequest, NextResponse } from "next/server";
import { RouteType, authRoutes, protectedRoutes } from "./routes";
import { jwtDecode } from "jwt-decode";
import { AUTH_KEY } from "@/constants/cookie.config";
import { SignInResponseData } from "./types/responses/SignInResponseData";

function isMatchingRoute(routes: RouteType[], path: string){

    return routes.some((item)=>{
        if (item.pattern) {
            return item.pattern.test(path)
        }

        return item.path === path
    })
}

function isMyTokenExpired(token: string) {
    var decoded = jwtDecode<{ sub: string; email: string; iat: number; exp: number }>(token);
    let isExpired = Date.now() >= decoded.exp * 1000;
    return isExpired;
}

export function middleware(request: NextRequest){

    const session = request.cookies.get(AUTH_KEY)?.value;

    if (
        isMatchingRoute(protectedRoutes, request.nextUrl.pathname) &&
        (!session || isMyTokenExpired(JSON.parse(session).token))
    ) {
        request.cookies.delete(AUTH_KEY);
        
        const response = NextResponse.redirect(new URL("/sign-in", request.url));
        response.cookies.delete(AUTH_KEY);

        return response;
    }

    if (isMatchingRoute(authRoutes, request.nextUrl.pathname) && session) {
        let parsedSession: SignInResponseData = JSON.parse(session);

        if (parsedSession.role === 'Company') {
            const response = NextResponse.redirect(new URL("/dashboard/user", request.url));
            return response;
        }
        else{
            const response = NextResponse.redirect(new URL("/dashboard/back-office", request.url));
            return response;
        }
    }
}