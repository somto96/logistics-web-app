"use client"

import CustomSkeleton from '@/components/CustomSkeleton';
import { useRiders } from '@/hooks/useRiders';
import { useAuth } from '@/providers/AuthProvider';
import { PaginatedQuery } from '@/types/requests/PaginatedQuery';
import { PackageAdminListData } from '@/types/responses/PackageAdminListData';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import { getSessionToken } from '@/utils/sessionUtils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlus } from "react-icons/fa6";
import backendClient from '@/services/ImperiumApiClient';
import { AssignPackagaePayload } from '@/types/requests/PackagePayload';
import FormButton from '@/components/FormElements/FormButton';

export interface AssignDeliveryProps{
    packageListData?: PackageAdminListData[];
    onAddDelivery?: ()=> void;
    onAssign?: ()=> void;
    onGoBack?: ()=> void;
}

const AssignDelivery: React.FC<AssignDeliveryProps> = ({
    packageListData, onAddDelivery, onGoBack, onAssign
})=>{

    // Hooks
    const router = useRouter()
    const { session } = useAuth()

    // State
    const [query, setQuery] = React.useState<PaginatedQuery>({
        pagedQuery:{
            pageNumber: 1,
            pageSize: 10,
        }
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedId, setSelectedId] = React.useState<string>('');

    // Fetched data
    const { data, isLoading, error } = useRiders(query);

    // Effect
    React.useEffect(()=>{
        if (error) {
            if (error?.response?.status === 401 && !session) {
                router.replace('/sign-in')
            }
            else{
                ToastNotify({
                    type: 'error',
                    message: error?.response?.data?.message || error?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    },[error])

    // Handlers
    const handleAssign = async (riderId?: string)=>{
        backendClient.setToken(getSessionToken() || '');
        setLoading(true);

        // Payload
        let payload: AssignPackagaePayload = {
            riderId: riderId || '',
            packageIds: packageListData?.map((item)=> item.id) || []
        }
        
        try {
            let response = await backendClient.assignPackage(payload)

            setLoading(false)
            if (response.responseObject) {
                onAssign && onAssign()
                // return response.responseObject
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

    return(
        <div className="h-full flex flex-col">

            {/** Header */}
            <div className="p-5 border-gray-300 relative">
                <p className="font-bold text-lg text-center">
                    Assign Delivery
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

            {/** Tracking Ids */}
            <div className='p-7 bg-[#333333] flex gap-5 flex-wrap items-center sticky top-0'>
                {
                    packageListData?.map((item, i)=>(
                        <div className='w-[250px] rounded-xl bg-white p-3 space-y-2' key={`${i}tidhlst`}>
                            <div className='text-sm'>
                                <span className='text-sm text-[#4f4f4f]'>
                                    Tracking ID: {" "}
                                </span>
                                <span className='font-medium'>
                                    { item.trackingNumber }
                                </span>
                            </div>
                            <div className='text-xs text-[#4f4f4f]'>
                                <span>
                                    Location: {" "}
                                </span>
                                <span className='font-medium'>
                                    { item.deliveryState }
                                </span>
                            </div>
                        </div>
                    ))
                }
                <button 
                    onClick={onAddDelivery}
                    className='inline-flex border-dashed border border-white items-center p-3 h-10 text-xs text-white rounded-lg'
                >
                    <FaPlus size={10} className="mr-2" />
                    <p>
                        Add Delivery
                    </p>
                </button>
            </div>

            {/** Rider List */}
            <div className='py-5 h-full'>
                {
                    isLoading &&
                    <CustomSkeleton isLoading></CustomSkeleton>
                }
                {
                    !isLoading &&
                    data?.items.map((item, i)=>(
                        <div className='border-b border-[#bdbdbd] p-5 flex items-center' key={`${i}ridlst`}>

                            {/** Rider Profile */}
                            <div className='flex gap-3 items-center'>
                                <Image 
                                    className="rounded-full" 
                                    src="/images/svgs/user-avatar.svg" 
                                    alt={item.fullName}
                                    width={60}
                                    height={60}
                                />
                                <div className='space-y-2'>
                                    <p className='font-semibold pl-3'>
                                        { item.fullName }
                                    </p>
                                    <div className='bg-[#f9f9f9] rounded-full p-3 text-xs'>
                                        <span>
                                            Frequent location: {" "}
                                        </span>
                                        <span className='font-medium text-black'>
                                            { item.frequentLocation }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex-1'></div>

                            <FormButton 
                                loading={!!(selectedId && loading)}
                                onClick={()=>{
                                    setSelectedId(item.id);
                                    handleAssign(item.id)
                                }}
                                className='min-w-[95px] inline-flex items-center justify-center px-4 h-10 text-sm text-center text-white bg-black rounded-lg font-normal'
                            >
                                Assign
                            </FormButton>
                        </div>
                    ))
                }
                
            </div>

        </div>
    )
}

export default AssignDelivery;