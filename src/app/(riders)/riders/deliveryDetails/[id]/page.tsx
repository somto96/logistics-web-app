"use client"

import CustomSkeleton from '@/components/CustomSkeleton';
import FormButton from '@/components/FormElements/FormButton';
import FormRadioButton from '@/components/FormElements/FormRadioButton';
import FormTextArea from '@/components/FormElements/FormTextArea';
import { useAuth } from '@/providers/AuthProvider';
import backendClient from '@/services/ImperiumApiClient';
import { UpdatePackagePayload } from '@/types/requests/PackagePayload';
import { PackageAdminListData, PackageStatus } from '@/types/responses/PackageAdminListData';
import { getStatusColorClass } from '@/utils/colorUtils';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { getSessionToken } from '@/utils/sessionUtils';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';

backendClient.setToken(getSessionToken() || '');

export default function DeliveryDetails({ params }: { params: { id: string } }) {

    // Refs
    const modalRef = React.createRef<HTMLDivElement>()

    // Hooks
    const router = useRouter();
    const { session } = useAuth()

    // State
    const [data, setData] = React.useState<PackageAdminListData>();
    const [reason, setReason] = React.useState<string>('');
    const [isOther, setIsOther] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false)

    // Helpers
    const fetchPackageDetails = async()=>{
        backendClient.setToken(getSessionToken() || '');
        backendClient.setLoading('rider', true);
        
        try {
            let response = await backendClient.getSinglePackage(params.id)

            backendClient.setLoading('rider', false);
            if (response.responseObject) {
                setData(response.responseObject);
                return response.responseObject
            }
            
        } catch (err: any) {
            backendClient.setLoading('rider', false);
            if (err?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    }

    // Handlers
    const toggleModal = ()=>{
        document.body.classList.toggle('overflow-hidden')
        modalRef.current?.classList.toggle('hidden');
    }

    const handleReasonSelect = (value: string, isOther: boolean = false)=>{
        setReason(value);
        setIsOther(isOther)
    }

    const handleUpdateTrackingStatus = async ()=>{
        backendClient.setToken(getSessionToken() || '');

        let payload: UpdatePackagePayload = {
            status: 6,
            trackingNumber: data?.trackingNumber || ""
        }
        setLoading(true)
        
        try {
            let response = await backendClient.updatePackageStatus(payload)

            setLoading(false)
            if (response.responseObject) {
                ToastNotify({
                    type: 'success',
                    message: response.responseObject,
                    position: 'top-right',
                });
                fetchPackageDetails()
            }
            
        } catch (err: any) {
            setLoading(false)
            if (err?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    }

    const handleComplete = ()=>{
        if (confirm("Are you sure you want to complete this order ?")) {
            handleUpdateTrackingStatus()
        }
    }

    // Effect
    React.useEffect(()=>{
        fetchPackageDetails()
    },[])

    return(
        <>
        <div 
            ref={modalRef}
            // id="imperium-modal" 
            className="transition hidden duration fixed inset-0 z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 hs-overlay-backdrop"
        >
            
            <div className='h-full w-full items-center justify-center flex'>
                <div className='sm:w-[90%] md:w-[400px] w-[90%] bg-white rounded-lg flex flex-col text-black p-4'>

                    <div className='p-3 flex flex-col'>
                        <p className='text-center mb-4 mt-3'>
                            Reasons for canceling this delivery?
                        </p>
                        <div className='space-y-4 flex-1'>
                            <div className='flex items-center space-x-3'>
                                <FormRadioButton
                                    checked={reason.toLowerCase() === ('Customer not reachable').toLowerCase()}
                                    onChecked={()=> handleReasonSelect('Customer not reachable')}
                                />
                                <p className='text-sm'>
                                    Customer not reachable
                                </p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <FormRadioButton
                                    checked={reason.toLowerCase() === ('Customer rejected package').toLowerCase()}
                                    onChecked={()=> handleReasonSelect('Customer rejected package')}
                                />
                                <p className='text-sm'>
                                    Customer rejected package
                                </p>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <FormRadioButton
                                    checked={reason.toLowerCase() === ('Could not find an address').toLowerCase()}
                                    onChecked={()=> handleReasonSelect('Could not find an address')}
                                />
                                <p className='text-sm'>
                                    Could not find an address
                                </p>
                            </div>
                            <div className='flex items-start space-x-3'>
                                <FormRadioButton
                                    checked={isOther}
                                    onChecked={()=> handleReasonSelect('', true)}
                                />
                                <div className='space-y-2 w-full'>
                                    <p className='text-sm'>
                                        Others
                                    </p>
                                    <FormTextArea
                                        className='border border-site-gray-border'
                                        placeholder='Type reason here...'
                                        value={isOther ? reason : undefined}
                                        disabled={!isOther}
                                        onChange={(e)=>{
                                            setReason(e.target.value)
                                        }}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className='flex items-center mt-8 justify-center gap-3'>
                            <button
                                onClick={toggleModal}
                                className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-black bg-white border border-black`}
                            >
                                Back
                            </button>
                            <button
                                // onClick={handleAssign}
                                className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black`}
                            >
                                Cancel Delivery
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
        <div className="w-screen h-screen bg-white text-black flex flex-col">

            {/** Header */}
            <div className="p-5 relative  bg-black">
                <p className="text-lg text-center text-white">
                    Delivery Details
                </p>
                <div className='absolute left-0 top-0 p-5 h-full flex items-center'>
                    <button
                        className='text-sm text-white'
                        onClick={router.back}
                    >
                        <MdArrowBack size={28} />
                    </button>
                </div>
            </div>

            {/** Info Section */}
            <section className='flex-1'>

                {/** Tracking Details */}
                <div className='p-5 space-y-3'>
                    <h3 className='font-bold text-sm'>
                        Tracking Details
                    </h3>
                    
                    <CustomSkeleton isLoading={backendClient.riderListLoading}>
                        <div className={`bg-site-gray-F2 rounded-lg p-4 space-y-3 ${backendClient.riderListLoading ? 'min-h-[134px]' : ''}`}>
                            <div className='flex items-center text-sm'>
                                <p className='text-sm font-extralight'>
                                    Tracking ID:
                                </p>
                                <div className='flex-1'></div>
                                <p className='font-semibold'>
                                    { data?.trackingNumber }
                                </p>
                            </div>
                            <div className='flex items-center text-sm'>
                                <p className='text-sm font-extralight'>
                                    Delivery Date:
                                </p>
                                <div className='flex-1'></div>
                                <p className='font-semibold'>
                                    { moment(data?.expectedDeliveryDate).format('DD/MM/YYYY') }
                                </p>
                            </div>
                            <div className='flex items-center text-sm'>
                                <p className='text-sm font-extralight'>
                                    Delivery Attempts:
                                </p>
                                <div className='flex-1'></div>
                                <p className='font-semibold'>
                                    0
                                </p>
                            </div>
                            <div className='flex items-center text-sm'>
                                <p className='text-sm font-extralight'>
                                    Status:
                                </p>
                                <div className='flex-1'></div>
                                <p className={`font-semibold ${getStatusColorClass(data?.status).text}`}>
                                    { data?.status }
                                </p>
                            </div>
                        </div>
                    </CustomSkeleton>
                    
                </div>

                {/** Receiver Details */}
                <div className='p-5 space-y-3'>
                    <h3 className='font-bold text-sm'>
                        Receiver Details
                    </h3>
                    
                    <CustomSkeleton isLoading={backendClient.riderListLoading}>
                        <div className={`bg-site-gray-F2 rounded-lg p-4 space-y-3 ${backendClient.riderListLoading ? 'min-h-[134px]' : ''}`}>
                            <p className='text-sm font-semibold'>
                                { data?.customerFirstName.toUpperCase() } { data?.customerLastName.toUpperCase() }
                            </p>
                            <p className='text-sm'>
                                { data?.deliveryAddress }
                            </p>
                            <p className='text-sm font-semibold text-site-gray-82'>
                                { data?.customerPhoneNumber }
                            </p>
                        </div>
                    </CustomSkeleton>
                    
                </div>

                {/** Sender Details */}
                <div className='p-5 space-y-3'>
                    <h3 className='font-bold text-sm'>
                        Sender Details
                    </h3>
                    
                    <CustomSkeleton isLoading={backendClient.riderListLoading}>
                        <div className={`bg-site-gray-F2 rounded-lg p-4 space-y-3 ${backendClient.riderListLoading ? 'min-h-[134px]' : ''}`}>
                            <p className='text-sm font-semibold'>
                                { data?.customerFirstName.toUpperCase() } { data?.customerLastName.toUpperCase() }
                            </p>
                            <p className='text-sm'>
                                { data?.pickUpAddress }
                            </p>
                            <p className='text-sm font-semibold text-site-gray-82'>
                                { data?.customerPhoneNumber }
                            </p>
                        </div>
                    </CustomSkeleton>
                    
                </div>
            </section>

            {/** Actions */}
            <div className='flex items-center p-5 justify-center gap-3'>
                <button
                    onClick={toggleModal}
                    className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-black bg-white border border-black`}
                >
                    Cancel
                </button>
                {
                    data?.status !== PackageStatus.DELIVERED &&
                    <FormButton
                        loading={loading}
                        onClick={handleComplete}
                        className={`min-w-[136px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black`}
                    >
                        Complete
                    </FormButton>
                }
            </div>

        </div>
        </>
    )
}