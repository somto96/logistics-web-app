import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import LandingPageFooter from './LandingPageFooter';

const LandingPageLayout: React.FC<any> = ({ children })=>{

    return(
        <div className='min-h-screen flex flex-col bg-white'>
            <LandingPageHeader/>
            <main className='flex-1 flex flex-col'>
                { children }
            </main> 
            <LandingPageFooter/>
        </div>
    )
}

export default LandingPageLayout