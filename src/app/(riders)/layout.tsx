import RiderDashboardSidebar from "@/components/Layouts/RiderDashboardSidebar";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

async function processRedirect(): Promise<void> {

	const selectors: any = headers().get("x-selector-agents");

	const { isMobileOnly } = JSON.parse(selectors); 

	if (!isMobileOnly) {
		notFound()
    }
	
}

const RidersGroupLayout = async ({ children }: { children: React.ReactNode })=>{
    // await processRedirect();
    return (
		<>
			<RiderDashboardSidebar/>
			{ children} 
		</>
	);
}

export default RidersGroupLayout;