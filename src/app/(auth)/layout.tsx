import { checkAccessToAuthPages } from "@/utils/guardUtils";
import React from "react";

export interface AuthGroupLayoutProps{
    children?: React.ReactNode;
}

const AuthGroupLayout = async ({ children }: { children: React.ReactNode })=>{
    // await checkAccessToAuthPages();
    return children;
}

export default AuthGroupLayout;