import LandingPageLayout from "@/components/Layouts/LandingPageLayout";
import AboutUsFirstSection from "@/components/PageSections/LandingPageSections/AboutUsSections/AboutUsFirstSection";
import AboutUsContactUsSection from "@/components/PageSections/LandingPageSections/AboutUsSections/AboutUsContactUsSection";
import LeaderShipTeamSection from "@/components/PageSections/LandingPageSections/AboutUsSections/LeaderShipTeamSection";
import MissionVisionSection from "@/components/PageSections/LandingPageSections/AboutUsSections/MisionVisionSection";
import StatsSection from "@/components/PageSections/LandingPageSections/AboutUsSections/StatsSection";
import Link from "next/link";
import { FiHome } from "react-icons/fi";


export default function AboutUs() {

    // Elements
    const separatorIcon = (
        <svg 
            className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    )

	return (
		<LandingPageLayout sticky>

            {/** Bread Crumb area */}
            <nav className="md:px-20 px-4 py-2 bg-[#F2F2F2]">
                <ol className="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
                    <li className="inline-flex items-center">
                        <Link 
                            className="flex items-center text-gray-500 focus:outline-none" 
                            href="#"
                        >
                            <FiHome size={18} />
                        </Link>
                        { separatorIcon }
                    </li>
                    <li className="inline-flex items-center">
                        <Link 
                            className="flex items-center text-sm text-gray-500" 
                            href="#"
                        >
                            About us
                        </Link>
                    </li>
                    {/* <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate" aria-current="page">
                        Application
                    </li> */}
                </ol>
            </nav>

            <AboutUsFirstSection/>
            <MissionVisionSection/>
            <StatsSection/>
            <LeaderShipTeamSection/>
            <AboutUsContactUsSection/>
           
        </LandingPageLayout>
	)
}