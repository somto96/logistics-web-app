import Head from 'next/head';
import { HeroSection } from '@/components/Hero/HeroSection';
import { Header } from '@/components/Header';
import { PackageDeliveryAndTrackingGuide } from '@/components/PackageGuide/PackageDeliveryAndTrackingGuide';
import { CreateAccountBanner } from '@/components/CreateAccountBanner';
import { DashboardPreview } from '@/components/DashboardPreview/DashboardPreview';
import { TestimonialSection } from '@/components/Testimonials';
import { ContactUs } from '@/components/ContactUs/ContactUs';
import { Footer } from '@/components/Footer/Footer';
import { useAppDispatch } from '@/utils/hooks/useReduxHooks';
import { useEffect, useState } from 'react';
import { resetOnboardingData } from 'store/onboarding/slice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    dispatch(resetOnboardingData());
  }, []);

  useEffect(() => {
    const changeBg = () => {
      if (window.scrollY >= 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', changeBg);

    return () => {
      window.removeEventListener('scroll', changeBg);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Imperium Logistics</title>
        <meta name="description" content="Imperium Logistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showMenuList showMobileNav background={scroll ? 'brand.black' : 'transparent'} />
      <HeroSection />
      <PackageDeliveryAndTrackingGuide />
      <CreateAccountBanner />
      <DashboardPreview />
      <TestimonialSection />
      <ContactUs />
      <Footer />
    </>
  );
}
