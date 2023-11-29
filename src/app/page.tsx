import LandingPageLayout from "@/components/Layouts/LandingPageLayout";
import ContactUsSection from "@/components/PageSections/LandingPageSections/HomeSections/ContactUsSection";
import DashboardPreviewSection from "@/components/PageSections/LandingPageSections/HomeSections/DashboardPreviewSection";
import HomeCarousel from "@/components/PageSections/LandingPageSections/HomeSections/HomeCarousel";
import PackageDeliverySection from "@/components/PageSections/LandingPageSections/HomeSections/PackageDeliverySection";
import SetupYourAccountSection from "@/components/PageSections/LandingPageSections/HomeSections/SetupYourAccountSection";
import TestimonialSection from "@/components/PageSections/LandingPageSections/HomeSections/TestimonialSection";


export default function Home() {
	return (
		<LandingPageLayout>
            <HomeCarousel/>
            <PackageDeliverySection/>
            {/* <SetupYourAccountSection/> */}
            <DashboardPreviewSection/>
            {/* <TestimonialSection/> */}
            <ContactUsSection/>
        </LandingPageLayout>
	)
}