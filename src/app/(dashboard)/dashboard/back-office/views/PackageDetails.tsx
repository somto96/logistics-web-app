"use client"

import { PaginatedQuery } from '@/types/requests/PaginatedQuery';
import { PackageAdminListData, PackageStatus } from '@/types/responses/PackageAdminListData';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlus } from "react-icons/fa6";

export interface AssignDeliveryProps{
    packageData?: PackageAdminListData;
    onAddDelivery?: ()=> void;
    onGoBack?: ()=> void;
    onUpdateTracking?: (packageData?: PackageAdminListData)=> void;
    onAssign?: (packageData?: PackageAdminListData)=> void;
}

const PackageDetails: React.FC<AssignDeliveryProps> = ({
    packageData, onAddDelivery, onGoBack, onUpdateTracking, onAssign
})=>{

    // State
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 10,
        }
    });

    // Helpers
    const handleAssignBtnLabelText = (pckage?: PackageAdminListData) => {
        switch (pckage?.status) {
            case PackageStatus.AVAILABLE_FOR_PICKUP:
                if (pckage?.pickUpRider.includes("00000000")) {
                    return {
                        text: 'Assign',
                        disabled: false
                    };
                }
                return {
                    text: 'Assigned',
                    disabled: true
                };
                
            case PackageStatus.UNDELIVERED:
                return {
                    text: 'Reassign',
                    disabled: false
                };
            default:
                return {
                    text: 'Assigned',
                    disabled: true
                };
        }
    };
    const handleUpdateTracking = ()=>{
        onUpdateTracking && onUpdateTracking(packageData);
    }
    const handleAssign = ()=>{
        onAssign && onAssign(packageData)
    }

    // Fetched data
    // const { data, isLoading, error } = useRiders(query);

    // Effect
    // React.useEffect(()=>{
    //     if (error) {
    //         if (error?.response?.status === 401 && !session) {
    //             router.replace('/sign-in')
    //         }
    //         else{
    //             ToastNotify({
    //                 type: 'error',
    //                 message: error?.response?.data?.message || error?.response?.data?.title,
    //                 position: 'top-right',
    //             });
    //         }
    //     }
    // },[error])

    return(
        <div className="h-full flex flex-col bg-white">

            {/** Header */}
            <div className="p-5 border-b relative">
                <p className="font-bold text-lg text-center">
                    Delivery Details
                </p>
                <div className='absolute left-0 top-0 p-5'>
                    <button
                        className='text-sm'
                        onClick={onGoBack}
                    >
                        Back
                    </button>
                </div>
            </div>

            {/** Delivery Details */}
            <div className='px-5 pt-5 flex-1'>

                <div className='grid md:grid-cols-2 border-b border-site-gray-border gap-3 pb-5'>
                    <div className='bg-site-gray-text rounded-lg p-5 space-y-4'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-label'>Tracking ID</p>
                            <p className='text-sm text-white font-bold'>
                                { packageData?.trackingNumber }
                            </p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-label'>Delivery Date</p>
                            <p className='text-sm text-white font-bold'>
                                { moment(packageData?.expectedDeliveryDate).format('DD/MM/YYYY') }
                            </p>
                        </div>
                    </div>
                    <div className='bg-site-gray-text rounded-lg p-5 space-y-4'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-label'>Delivery Attempt</p>
                            <p className='text-sm text-white font-bold'>
                                0
                            </p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-label'>Status</p>
                            <p className='text-sm text-white font-bold'>
                                { packageData?.status }
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className='grid md:grid-cols-2 border-b border-site-gray-border gap-3 py-5'>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>Receiver Details</p>
                            <p className='text-sm text-black font-bold'>
                                { packageData?.customerFirstName }{" "}
                                { packageData?.customerLastName }
                            </p>
                        </div>
                        <p className='text-black text-sm'>
                            { packageData?.deliveryAddress }
                        </p>
                        <p className='text-site-gray-82 text-xs font-bold'>
                            { packageData?.customerPhoneNumber }
                        </p>
                    </div>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>Sender Details</p>
                            <p className='text-sm text-black font-bold'>
                                { packageData?.customerFirstName }{" "}
                                { packageData?.customerLastName }
                            </p>
                        </div>
                        <p className='text-black text-sm'>
                            { packageData?.pickUpAddress }
                        </p>
                        <p className='text-site-gray-82 text-xs font-bold'>
                            { packageData?.customerPhoneNumber }
                        </p>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 border-b border-site-gray-border gap-3 py-5'>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3 min-h-[136px]'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>Package Description</p>
                            <p className='text-sm text-black font-bold'>
                                { packageData?.packageDescription || '--' }
                            </p>
                        </div>
                    </div>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3 min-h-[136px]'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>Note</p>
                            <p className='text-sm text-black font-bold'>
                                { "--" }
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 border-b border-site-gray-border gap-3 py-5'>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3 min-h-[136px]'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>
                                Pickup Rider Details
                            </p>
                            <p className='text-sm text-black font-bold'>
                                { packageData?.pickUpRider || "--" }
                            </p>
                        </div>
                       
                        <p className='text-site-gray-82 text-xs font-bold'>
                            { packageData?.customerPhoneNumber || "--"}
                        </p>
                    </div>
                    <div className='bg-site-gray-label rounded-lg p-5 space-y-3 min-h-[136px]'>
                        <div className='space-y-1'>
                            <p className='text-xs text-site-gray-text'>Delivery Rider Details</p>
                            <p className='text-sm text-black font-bold'>
                                { packageData?.deliveryRider || "--" }
                            </p>
                        </div>
                        
                        <p className='text-site-gray-82 text-xs font-bold'>
                            { packageData?.customerPhoneNumber }
                        </p>
                    </div>
                </div>
                
            </div>

            {/** Actions */}
            <div className='flex items-center grow p-5 justify-center gap-3'>
                <button
                    // onClick={handleAssign}
                    className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-black bg-slate-100`}
                >
                    Delete
                </button>
                <button
                    onClick={handleUpdateTracking}
                    className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-black bg-white border border-black`}
                >
                    Update Tracking
                </button>
                <button
                    disabled={handleAssignBtnLabelText(packageData).disabled}
                    onClick={handleAssign}
                    className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full ${handleAssignBtnLabelText(packageData).disabled ? 'text-black bg-white border border-black' : 'text-white bg-black'}`}
                >
                    { handleAssignBtnLabelText(packageData).text }
                </button>
            </div>

        </div>
    )
}

export default PackageDetails;