import React from "react";
import DashboardPageHeader from "@/components/Layouts/DashboardPageHeader";
import DashboardSidebar from "@/components/Layouts/DashboardSidebar";
import { checkAccessToDashboardPages } from "@/utils/guardUtils";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // await checkAccessToDashboardPages();
  return (
    <div className="h-screen flex flex-col">
      <DashboardPageHeader />
      <div className="flex-1 grid md:grid-cols-5 no-scrollbar">
        <div className="col-span-1">
          <DashboardSidebar />
        </div>
        <div
          style={{
            height: 'calc(100vh - 84px)'
          }}
          id="main-content"
          className="relative flex flex-col col-span-4 overflow-y-scroll no-scrollbar bg-white"
        >
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;