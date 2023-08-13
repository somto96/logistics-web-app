import React, { useState } from 'react'
import { DashboardView } from './DashboardView';
import { AdminPackageDetailsView } from './AdminPackageDetailsView';
import { AssignPackagesView } from './AssignPackagesView';
import { AdminTrackingInfoScreen } from './AdminTrackingInfoScreen';

export const AdminMainView = () => {
    const [activeScreen, setActiveScreen] = useState("dashboard-view");
    return (
        <>
            {activeScreen === "dashboard-view" && <DashboardView setActiveScreen={setActiveScreen} />}          
            {activeScreen === "package-details-view" && <AdminPackageDetailsView setActiveScreen={setActiveScreen} />}          
            {activeScreen === "assign-package-view" && <AssignPackagesView setActiveScreen={setActiveScreen} />}
            {activeScreen === "view-tracking-info" && <AdminTrackingInfoScreen setActiveScreen={setActiveScreen} />}          
        </>
    )
}
