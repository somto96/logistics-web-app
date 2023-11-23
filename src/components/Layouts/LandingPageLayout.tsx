import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import LandingPageFooter from './LandingPageFooter';

export interface LandingPageLayoutProps{
    sticky?: boolean;
    children?: React.ReactNode
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children, sticky })=>{

    return(
        <div className='min-h-screen flex flex-col bg-white'>
            <LandingPageHeader sticky={sticky}/>
            <main className='flex-1 flex flex-col'>
                { children }
            </main> 
            <LandingPageFooter/>
        </div>
    )
}

export default LandingPageLayout