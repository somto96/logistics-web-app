"use client"

import React from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Carousel, { ControlProps } from "nuka-carousel"
import HeroTrackPackageForm from '@/forms/HeroTrackPackageForm';
import Image from 'next/image';
import { HeroTrackPackageFormState } from '@/forms/HeroTrackPackageForm/schema';
import { AiOutlineClose } from "react-icons/ai";
import { FaCircle, FaRegCircle } from "react-icons/fa6";
import { PackageTrackingData } from '@/types/responses/PackageTrackingData';
import moment from 'moment'
import backendClient from '@/services/ImperiumApiClient';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { GoArrowRight } from "react-icons/go";
import { BsArrowLeftCircle } from "react-icons/bs";

const HomeCarousel: React.FC<any> = ()=>{

    // Ref
    const modalRef = React.createRef<HTMLDivElement>()

    // State
    const [packageData, setPackageData] = React.useState<PackageTrackingData>();
    const [nextPage, setNextPage] = React.useState<boolean>();

    // Handlers
    const handleFormSubmit = async (state: HeroTrackPackageFormState)=>{
        document.body.classList.toggle('overflow-hidden')
        modalRef.current?.classList.toggle('hidden');

        // Get tracking information
        try {
            let response = await backendClient.getTrackingInformationForPackage(state.trackingId)

            if (response.responseObject) {
                ToastNotify({
                    type: 'success',
                    message: response.message,
                    position: 'top-right',
                });
                setPackageData(response.responseObject)
            }
        } catch (err: any) {
            document.body.classList.toggle('overflow-hidden')
            modalRef.current?.classList.toggle('hidden');
            ToastNotify({
                type: 'error',
                message: err?.response?.data?.message || err?.response?.data?.title,
                position: 'top-right',
            });
        }
        
    }

    // Elements
    const heroFormDisplay = (
        <div className='sm:w-1/2 w-full space-y-8 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:px-0 px-3'>
            <h1 className='text-6xl text-white font-bold text-center'>
                Delivery made easy
            </h1>
            <h3 className='text-lg text-white text-center tracking-wider'>
                Ingtegrate our easy-to-use logistics platform to your businesses
            </h3>
            <HeroTrackPackageForm
                onFormSubmit={handleFormSubmit}
            />
        </div>
    )
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
    const slide1 = (
        <div className="h-screen w-full bg-[url('/images/pngs/slider-one.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
        </div>
    )
    const slide2 = (
        <div className="h-screen w-full bg-[url('/images/pngs/slider-two.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
        </div>
    )
    const slide3 = (
        <div className="h-screen w-full bg-[url('/images/pngs/slider-three.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
        </div>
    )

    // Variables
    type DeliveryStep = {
        title: string;
        description: {
            message: string;
            date: string;
        },
        done: boolean;
        active?: boolean;
    }
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

    // Tracking detail pages
    const trackingDetailPage1 = (
        <div className='col-span-3 bg-white opacity-90 z-10 rounded-b-lg flex flex-col'>
                            
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
                    <button 
                        type="button" 
                        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-black"
                        onClick={()=> setNextPage(true)}
                    >
                        View more details
                        <GoArrowRight size={20} />
                    </button>
                </div>
            </div>

        </div>
    )
    const trackingDetailPage2 = (
        <div className='col-span-3 bg-white opacity-90 z-10 rounded-b-lg flex flex-col'>

            {/** Header */}
            <div className='border-b flex items-center py-3 px-5'>
                <button
                    className='cursor-pointer'
                    onClick={()=> setNextPage(false)}
                >
                    <BsArrowLeftCircle size={30} />
                </button>
                <div className='flex-1'></div>
                <p className='text-xs font-medium'>
                    Order Picked up
                </p>
            </div>

            {/** Package Details */}
            <div className='space-y-2 border-b py-3 px-5'>
                <p className='text-[10px] font-medium text-gray-500'>
                    PACKAGE DETAILS
                </p>
                <div>
                    <p className='text-xs text-gray-500'>
                        Package description
                    </p>
                    <p className='text-sm'>
                        { packageData?.packageDescription || "---" }
                    </p>
                </div>
                <div>
                    <p className='text-xs text-gray-500'>
                        Note
                    </p>
                    <p className='text-sm'>
                        { packageData?.notes ?? 'Delivery should be swift, customer needs package urgently.'}
                    </p>
                </div>
            </div>

            {/** Pickup Address */}
            <div className='space-y-2 border-b py-3 px-5'>
                <p className='text-[10px] font-medium text-gray-500'>
                    PICKUP ADDRESS
                </p>
                <div>
                    <p className='text-sm'>
                        { packageData?.pickUpAddress || "---" }
                    </p>
                </div>
                <div>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        { packageData?.customerFirstName.toUpperCase() } { packageData?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerPhoneNumber || "---" }
                    </p>
                </div>
            </div>

            {/** Pickup Rider Details */}
            <div className='space-y-2 border-b py-3 px-5'>
                <p className='text-[10px] font-medium text-gray-500'>
                    PICKUP RIDER DETAILS
                </p>
                <div>
                    <p className='text-sm'>
                        { packageData?.pickUpRider || "---" }
                    </p>
                </div>
                <div>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        { "---" } 
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { "---" } 
                    </p>
                </div>
            </div>

            {/** Delivery Address */}
            <div className='space-y-2 border-b py-3 px-5'>
                <p className='text-[10px] font-medium text-gray-500'>
                    DELIVERY ADDRESS
                </p>
                <div>
                    <p className='text-sm'>
                        { packageData?.deliveryAddress || "---" }
                    </p>
                </div>
                <div>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        { packageData?.customerFirstName.toUpperCase() } { packageData?.customerLastName.toUpperCase() }
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { packageData?.customerPhoneNumber || "---" }
                    </p>
                </div>
            </div>

            {/** DELIVERY RIDER DETAILS */}
            <div className='space-y-2 border-b py-3 px-5'>
                <p className='text-[10px] font-medium text-gray-500'>
                    DELIVERY RIDER DETAILS
                </p>
                <div>
                    <p className='text-sm'>
                        { packageData?.deliveryRider || "---" }
                    </p>
                </div>
                <div>
                    <p className='text-[10px] text-gray-500 font-medium'>
                        { "---" } 
                    </p>
                    <p className='text-[10px] text-gray-500'>
                        { "---" } 
                    </p>
                </div>
            </div>
        </div>
    )

    // Tracking Modal Content
    const trackingModalContent = (
        <div className='h-full w-full items-center justify-center flex'>
            <div className='sm:w-1/2 bg-white rounded-lg h-[90%] flex flex-col text-black'>

                {/** Header */}
                <div className='flex py-4 px-6 items-center relative border-b border-gray-300'>
                    <Image 
                        src={'/images/svgs/logo-color.svg'} 
                        alt={'imperium logistics'} 
                        width={97}
                        height={68}
                    />
                    <div className='flex-1 px-4'>
                        <div className='space-x-1'>
                            <p className='text-xl font-medium text-black'>
                                Tracking information
                            </p>
                            <p className='text-sm text-black'>
                                Tracking #: { packageData?.trackingNumber }
                            </p>
                        </div>
                    </div>
                    <div className='justify-self-end'>
                        <button
                            className='hover:bg-[#4F4F4F]/10 text-black p-2 rounded-lg absolute top-3 right-3'
                            onClick={()=>{
                                document.body.classList.toggle('overflow-hidden')
                                modalRef.current?.classList.toggle('hidden');
                                setPackageData(undefined)
                                setNextPage(false)
                            }}
                        >
                            <AiOutlineClose size={20} />
                        </button>
                    </div>
                </div>

                {/** Information */}
                <div className="grid grid-cols-5 flex-1 rounded-b-lg relative bg-[url('/images/pngs/map.png')] bg-no-repeat">
                    <div className="col-span-2">
                        <Image 
                            className='absolute left-5 bottom-10'
                            src={'/images/svgs/track-route.svg'} 
                            alt={'tracking marker map'} 
                            width={489}
                            height={415}
                        />
                    </div>
                    { nextPage ? trackingDetailPage2 : trackingDetailPage1 }
                </div>
            </div>
        </div>
    )

    // Handlers
    const renderCenterLeftControls = (props: ControlProps)=>{

        return(
            <button className='p-4 rounded-full bg-[#4F4F4F] hidden md:block ml-8'
                onClick={props.previousSlide}
            >
                <BsChevronLeft className="text-white" size={20} />
            </button>
        )
    }

    const renderCenterRightControls = (props: ControlProps)=>{

        return(
            <button className='p-4 rounded-full bg-[#4F4F4F] hidden md:block mr-8'
                onClick={props.nextSlide}
            >
                <BsChevronRight className="text-white" size={20} />
            </button>
        )
    }

    return(
        <>
        <div 
            ref={modalRef}
            // id="imperium-modal" 
            className="transition duration hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
        >
            {
                !packageData &&
                <div className='h-full flex items-center justify-center'>
                    <p className='text-white'>{ "Fetching Package..." }</p>
                </div>
            }
            {
                packageData && trackingModalContent
            }

            
        </div>
        <div className="relative top-0 left-0 h-screen w-full">

            {/** Static Form */}
            { heroFormDisplay }

            {/** Static Image in the top right corner */}
            <div className='absolute top-0 right-0 mt-12 z-10'>
                <Image
                    src={'/images/svgs/corner-tr.svg'}
                    alt="imperium logistics star"
                    width={152}
                    height={72}
                />
            </div>

            {/** Static Image in the top left corner */}
            <div className='absolute bottom-0 left-0 z-10'>
                <Image
                    src={'/images/svgs/corner-bl.svg'}
                    alt="imperium logistics star"
                    width={152}
                    height={82}
                />
            </div>

            <Carousel
                wrapAround
                renderCenterLeftControls={renderCenterLeftControls}
                renderCenterRightControls={renderCenterRightControls}
            >
                { slide1 }
                { slide2 }
                { slide3 }
            </Carousel>
        </div>
        </>
    )
}

export default HomeCarousel