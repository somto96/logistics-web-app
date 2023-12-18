import { PackageAdminListData } from '@/types/responses/PackageAdminListData';
import React from 'react';
import Image from 'next/image';
import { GrLocation } from 'react-icons/gr';
import { FiCalendar } from 'react-icons/fi';
import moment from 'moment';
import { getStatusColorClass } from '@/utils/colorUtils';
import { FaChevronRight } from 'react-icons/fa6';

export interface RiderPackageCardProps{
    packageData?: PackageAdminListData;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const RiderPackageCard: React.FC<RiderPackageCardProps> = ({ packageData, onClick })=>{

    const colorClass = getStatusColorClass(packageData?.status)

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
                        { packageData?.trackingNumber.toUpperCase() }
                    </p>
                </div>

                {/** Details */}
                <div className='flex items-center space-x-2 text-site-gray-text'>
                    <div className='flex items-center px-3 py-1.5 rounded-full bg-[#D9D9D9] gap-1'>
                        <GrLocation size={14} className="text-site-gray-82" />
                        <p className='text-xs'>
                            { packageData?.deliveryCity }
                        </p>
                    </div>
                    <div className='flex items-center px-3 py-1.5 rounded-full bg-[#D9D9D9] gap-1'>
                        <FiCalendar size={14} className="text-site-gray-82" />
                        <p className='text-xs'>
                            { moment(packageData?.expectedDeliveryDate).format('DD/MM/YY') }
                        </p>
                    </div>
                    <div className={`flex items-center px-3 py-1.5 rounded-full ${colorClass.background}`}>
                        <p className={`text-xs text-white`}>
                            { packageData?.status }
                        </p>
                    </div>
                </div>
            </div>

            <FaChevronRight className="text-site-gray-82" />
        </div>
    )
}

export default RiderPackageCard;