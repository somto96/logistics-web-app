import { PackageAdminListData } from '@/types/responses/PackageAdminListData';
import React from 'react';
import Image from 'next/image';
import { RiderData } from '@/types/responses/RiderData';

export interface RiderAdminPackageCardProps{
    packageData?: PackageAdminListData;
    riderData?: RiderData;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const RiderAdminPackageCard: React.FC<RiderAdminPackageCardProps> = ({ packageData, riderData, onClick })=>{

    // const colorClass = getStatusColorClass(packageData?.status)

    return(
        <div 
            onClick={onClick}
            className='rounded-md bg-site-gray-F2 p-4 min-h-[100px] hover:bg-[#ebebeb] flex items-center'
        >

            <div className='space-y-4 flex-1'>
                {/** Logo and Tracking Data */}
                <div className='flex items-center space-x-2'>
                    <Image
                        src={'/images/pngs/motorcycle.png'}
                        loading="lazy"
                        alt={"motorcycle"}
                        width={32}
                        height={32}
                    />
                    <p className='text-sm text-black font-semibold'>
                        { riderData?.fullName }
                    </p>
                </div>

                {/** Details */}
                <div className='text-site-gray-text'>
                    <p className='text-xs'>
                        { packageData?.pickUpAddress }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RiderAdminPackageCard;