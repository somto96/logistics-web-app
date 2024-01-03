"use client"

import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa6';
import Image from 'next/image';
import { PackageAdminListData } from '@/types/responses/PackageAdminListData';
import moment from 'moment';
import { statusOptions } from '@/constants/dropdown.config';
import FormSelect from '@/components/FormElements/FormSelect';
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from '@/utils/sessionUtils';
import { UpdatePackagePayload } from '@/types/requests/PackagePayload';
import FormButton from '@/components/FormElements/FormButton';

backendClient.setToken(getSessionToken() || '');

export interface TrackingInfoProps{
    packageData?: PackageAdminListData;
    onGoBack?: ()=> void;
    onUpdateTrackingStatus?: (payload: UpdatePackagePayload) => void;
    isLoading?: boolean;
}

type DeliveryStep = {
    title: string;
    description: {
        message: string;
        date: string;
    },
    done: boolean;
    active?: boolean;
}

const TrackingInfo: React.FC<TrackingInfoProps> = ({
    packageData, onGoBack, isLoading, onUpdateTrackingStatus
})=>{


    // State
    const [isError, setIsError] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<{ value: any; label: string }>({
        value: 0,
        label: ''
    })
    // const [packageData, setPackageData]= React.useState<PackageAdminListData>();

    // // Effect
    // React.useEffect(()=>{
    //     if (data) {
    //         setPackageData(data)
    //     }
    // },[data])

    // Handlers
    const handleUpdateTrackingStatus = ()=>{
        if (!status.label) {
            setIsError(true)
            return
        }
        let payload: UpdatePackagePayload = {
            status: status.value,
            trackingNumber: packageData?.trackingNumber || ''
        }
        onUpdateTrackingStatus && onUpdateTrackingStatus(payload)
        
    }

    const separator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-black bg-gray-400'
        />
    )
    const inactiveSeparator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-gray-400'
        />
    )
    const endSeparator = (
        <div 
            role="separator"
            className='w-[1px] border border-dashed h-full border-gray-400 opacity-0'
        />
    )

    const getLastStep = ()=>{
        if (packageData?.status === 'UnDelivered') {
            return {
                title: 'Undelivered',
                description: {
                    message: `We were unable to complete delivery to you. We’ll schedule another delivery to you. 
                    Please note that we may be forced to cancel this delivery if we are unable to deliver to you in the next 2 attempts.`,
                    date: `${moment(packageData?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
                },
                done: false,
                active: true
            }
        }

        if (packageData?.status === 'SLABreach') {
            return {
                title: 'In breach of SLA ',
                description: {
                    message: `For some reasons beyond our control, we cannot deliver at the stipulated time. 
                    We’ll schedule another delivery date and communicate with you. Please bear with us.`,
                    date: `${moment(packageData?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
                },
                done: false,
                active: true
            }
        }

        return {
            title: 'Delivered',
            description: {
                message: 'Package was successfully delivered',
                date: `${moment(packageData?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: false,
            active: packageData?.status === 'Delivered',
        }
    }
    const steps: DeliveryStep[] = [
        {
            title: 'Order Picked up',
            description: {
                message: 'Your package has been left at the pickup location',
                date: `${moment(packageData?.pickupDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['WareHouse', 'InDelivery',  'UnDelivered', 'SLABreach', 'Delivered'].includes(packageData?.status || ''),
            active: packageData?.status === 'PickedUp' 
        },
        {
            title: 'Order in Warehouse',
            description: {
                message: 'Package sorted and ready to be sent out to customer location',
                date: `${moment(packageData?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['InDelivery',  'UnDelivered', 'SLABreach', 'Delivered'].includes(packageData?.status || ''),
            active: packageData?.status === 'WareHouse'
        },
        {
            title: 'Order in Delivery ',
            description: {
                message: 'Package is on it’s way to customer location',
                date: `${moment(packageData?.expectedDeliveryDate).format('ddd D, YYYY')?.toUpperCase()}`,
            },
            done: ['UnDelivered', 'SLABreach', 'Delivered'].includes(packageData?.status || ''),
            active: packageData?.status === 'InDelivery'
        },
        getLastStep()
    ];

    const trackingDetailPage1 = (
        <div className='bg-white opacity-90 z-10 flex flex-col m-5'>
                            
            {/** Addresses */}
            <div className='flex py-3 px-5 border-b'>
                <div className='flex-1 space-y-2 p-3 border-r'>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        PICKUP ADDRESS
                    </p>
                    <p className='text-sm text-black'>
                        { packageData?.pickUpAddress }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerFirstName.toUpperCase() } { packageData?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerPhoneNumber }
                    </p>
                </div> 
                <div className='flex-1 space-y-2 p-3'>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        DELIVERY ADDRESS
                    </p>
                    <p className='text-sm text-black'>
                        { packageData?.deliveryAddress }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerFirstName.toUpperCase() } { packageData?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerPhoneNumber }
                    </p>
                </div>
            </div>

            {/** Tracking details */}
            <div className='flex-1 rounded-b-lg py-2 px-5'>
                <p className='text-sm font-medium text-gray-500 mb-3'>
                    TRACKING DETAILS
                </p>
                <div className='space-y-3 overflow-y-scroll'>
                    {
                        packageData && 
                        steps.map((item, index)=>(
                            <div className='flex'>
                                <div className='flex flex-col items-center space-y-1'>
                                    { 
                                        item.done ? 
                                            <FaCircle size={50}/> : 
                                        item.active ?  
                                        <FaRegCircle size={50} /> : <FaRegCircle size={50} className="text-gray-300"/>
                                    }
                                    { 
                                        index === steps.length - 1 ?
                                        endSeparator :
                                        item.done ? separator : inactiveSeparator
                                    }
                                </div>
                                <div>
                                    <h3 className='text-gray-500 font-medium'>
                                        { item.title }
                                    </h3>
                                    <div className='space-y-3'>
                                        <p className='text-gray-500 text-xs'>
                                            { item.description.message }
                                        </p>
                                        <p className='text-gray-500 text-[10px]'>
                                            { item.description.date }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='mt-5'>
                    {/* <button 
                        type="button" 
                        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-black"
                        // onClick={()=> setNextPage(true)}
                    >
                        View more details
                        <GoArrowRight size={20} />
                    </button> */}
                    <div className='flex items-center gap-4'>
                        <FormSelect
                            labelClass='text-sm'
                            placeholder='Select Status'
                            id='status filter'
                            options={statusOptions}
                            className='border border-site-gray-border min-w-[150px] py-2 rounded-full pr-4'
                            onChange={(e)=>{
                                console.log(e.target.value)
                                setIsError(false)
                                setStatus((prevState)=>({
                                    ...prevState,
                                    label: e.target.value
                                }))
                            }}
                            handleOptionSelect={(option)=>{
                                setIsError(false)
                                setStatus(option)
                            }}
                            onBlur={(e)=>{
                                let res = statusOptions.find((item)=> item.label.toLowerCase() === e.target.value.toLowerCase())
                                console.log(res)
                                if (res) {
                                    setStatus(res)
                                }
                                else{
                                    setStatus({ value: '', label: '' })
                                }
                            }}
                            value={status.label}
                            error={isError}
                            errorMessage=''
                        />
                        <FormButton
                            onClick={handleUpdateTrackingStatus}
                            loading={isLoading}
                            disabled={isLoading}
                            className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black`}
                        >
                            Update Tracking
                        </FormButton>
                    </div>
                </div>
            </div>

        </div>
    )
  

    return(
        <div className='h-full flex flex-col'>

            {/** Header */}
            <div className="p-5 border-b relative flex items-center">
                <div className='space-x-1'>
                    <p className='text-xl text-black'>
                        Tracking information
                    </p>
                    <p className='text-sm text-black'>
                        Tracking #: { packageData?.trackingNumber }
                    </p>
                </div>
                <div className='flex-1'></div>
                <div>
                    <button
                        className='text-sm'
                        onClick={onGoBack}
                    >
                        Back
                    </button>
                </div>
            </div>

            {/** Information */}
            <div className="grid md:grid-cols-2 flex-1 rounded-b-lg relative bg-[url('/images/pngs/map.png')] bg-no-repeat bg-cover">
                <div className='hidden md:block'>
                    <Image 
                        className='absolute left-5 bottom-10'
                        src={'/images/svgs/track-route.svg'} 
                        alt={'tracking marker map'} 
                        width={489}
                        height={415}
                    />
                </div>
                <Image 
                    className='absolute left-5 bottom-10 block md:hidden'
                    src={'/images/svgs/track-route.svg'} 
                    alt={'tracking marker map'} 
                    width={489}
                    height={415}
                />
                { trackingDetailPage1 }
            </div>

        </div>
    )
}

export default TrackingInfo;