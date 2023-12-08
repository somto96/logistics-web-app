import FormInput from '@/components/FormElements/FormInput';
import FormSelect from '@/components/FormElements/FormSelect';
import GoogleCityAutocomplete from '@/components/FormElements/GoogleCityAutocomplete';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { AddNewPackageFormSchema, AddNewPackageFormState } from './schema';
import { useFormik } from 'formik';
import { NigerianStates } from '@/constants/location.config';
import moment from 'moment';
import FormTextArea from '@/components/FormElements/FormTextArea';
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from '@/utils/sessionUtils';
import { CreatePackagePayload } from '@/types/requests/CreatePackagePayload';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import FormButton from '@/components/FormElements/FormButton';
import { MdOutlineClose } from 'react-icons/md';

export interface AddNewPackageFormProps{
    onSuccess?: ()=> void;
    onClose?: ()=> void;
}

const AddNewPackageForm: React.FC<AddNewPackageFormProps> = ({
    onSuccess, onClose
})=>{

    // Date Error
    type DateErrorState = {
        deliveryDate: boolean;
        pickupDate: boolean;
    }

    // State
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [dateErrors, setDateErrors] = React.useState<DateErrorState>({
        deliveryDate: false,
        pickupDate: false
    })

    // Initial values
    let initialValues: AddNewPackageFormState = {
        pickUpAddress: '',
        pickUpCity: '',
        pickUpState: '',
        pickUpLandmark: '',
        senderFirstname: '',
        senderLastname: '',
        senderPhoneNumber: '',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryLandmark: '',
        receiverFirstname: '',
        receiverLastname: '',
        receiverPhoneNumber: '',
        pickUpDate: '',
        deliveryDate: '',
        packageDescription: '',
        numberOfItems: 0,
        weightOfPackage: 0,
        CustomerLastName: '',
        CustomerFirstName: '',
        CustomerPhoneNumber: ''
    }

    // Handlers
    const handleNext = ()=> setActiveIndex(activeIndex + 1);
    const handlePrev = ()=> setActiveIndex(activeIndex - 1);
   
    // Formik
    const { 
        handleChange, errors, setFieldValue,
        handleSubmit, values, isValid,
    } =  useFormik({
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: AddNewPackageFormSchema,
        onSubmit: async (values, actions)=>{

            backendClient.setToken(getSessionToken() || '');
            setLoading(true);
    
            // Get tracking information
            try {
                let response = await backendClient.createNewPackage(values)
    
                if (response.responseObject) {
                    setLoading(false)
                    
                    ToastNotify({
                        type: 'success',
                        message: response.message,
                        position: 'top-right',
                    });
                    onSuccess && onSuccess()

                }
                else{
                    setLoading(false)
                }
            } catch (err: any) {
                setLoading(false)
                ToastNotify({
                    type: 'error',
                    message: err?.response?.data?.message || err?.response?.data?.title,
                    position: 'top-right',
                });
            }
        }
    });

    const handlePickUpOnChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{

        if (values.deliveryDate && moment(e.target.value).isValid()) {
            if (moment(values.deliveryDate) < moment(e.target.value)) {
                setDateErrors((prevState)=>({
                    ...prevState,
                    pickupDate: true
                }))
                setFieldValue('pickUpDate', '');
                return
            }
        }
        setDateErrors((prevState)=>({
            ...prevState,
            pickupDate: false
        }))
        setFieldValue('pickUpDate', e.target.value);
    }

    const handleDeliveryOnChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        if (values.pickUpDate && moment(e.target.value).isValid()) {
            if (moment(values.pickUpDate) > moment(e.target.value)) {
                setDateErrors((prevState)=>({
                    ...prevState,
                    deliveryDate: true
                }))
                setFieldValue('deliveryDate', '');
                return
            }
        }
        setDateErrors((prevState)=>({
            ...prevState,
            deliveryDate: false
        }))
        setFieldValue('deliveryDate', e.target.value);
    }


    type StepHeader = {
        active: boolean;
        text: string;
    }

    const headers: StepHeader[] = [
        {
            active: activeIndex >= 0,
            text: "Pickup Details"
        },
        {
            active: activeIndex >= 1 ,
            text: "Delivery Details"
        },
        {
            active: activeIndex >= 2,
            text: "Package Details"
        },
        {
            active: activeIndex >= 3,
            text: "Notes"
        }
    ]

    // Forms
    const pickupDetails = (
        <div>
            {/** Pickup Address */}
            <div className='border-b-2 py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Pickup Address
                </p>

                <FormInput
                    label="PICKUP ADDRESS"
                    className="border-[#333333] border py-2"
                    error={!!errors.pickUpAddress}
                    errorMessage={errors.pickUpAddress}
                    onChange={handleChange('pickUpAddress')}
                    value={values.pickUpAddress}
                />

                <div className="grid md:grid-cols-2 py-6 gap-8">
                    <GoogleCityAutocomplete
                        handleSelect={(city)=>{
                            setFieldValue('pickUpCity', city)
                        }}
                        label="CITY"
                        className="border-[#333333] border py-2"
                        endAdornment={
                            <GrLocation size={20} />
                        }
                        error={!!errors.pickUpCity}
                        errorMessage={errors.pickUpCity}
                        onChange={handleChange('pickUpCity')}
                        value={values.pickUpCity}
                    />
                    <FormSelect
                        label="STATE"
                        className="border-[#333333] border py-2"
                        // endAdornment={
                        //     <GrLocation size={20} />
                        // }
                        error={!!errors.pickUpState}
                        errorMessage={errors.pickUpState}
                        onChange={handleChange('pickUpState')}
                        handleSelect={(value)=>{
                            setFieldValue('pickUpState', value)
                        }}
                        onBlur={(e)=>{
                            let res = NigerianStates.find((item)=> item.value.toLowerCase() === e.target.value.toLowerCase())
                            console.log(res)
                            if (res) {
                                setFieldValue('pickUpState', res.value)
                            }
                            else{
                                setFieldValue('pickUpState', '')
                            }
                        }}
                        value={values.pickUpState}
                        options={NigerianStates}
                    />
                </div>

                <FormInput
                    label="LANDMARK"
                    className="border-[#333333] border py-2"
                    error={!!errors.pickUpLandmark}
                    errorMessage={errors.pickUpLandmark}
                    onChange={handleChange('pickUpLandmark')}
                    value={values.pickUpLandmark}
                />
            </div>

            {/** Pickup Address */}
            <div className='py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Sender
                </p>

                <div className="grid md:grid-cols-2 py-6 gap-8">
                    <FormInput
                        label="FIRST NAME"
                        className="border-[#333333] border py-2"
                        error={!!errors.senderFirstname}
                        errorMessage={errors.senderFirstname}
                        onChange={(e)=>{
                            setFieldValue('senderFirstname', e.target.value)
                            setFieldValue('CustomerFirstName', e.target.value)
                        }}
                        value={values.senderFirstname}
                    />
                    <FormInput
                        label="LAST NAME"
                        className="border-[#333333] border py-2"
                        error={!!errors.senderLastname}
                        errorMessage={errors.senderLastname}
                        onChange={(e)=>{
                            setFieldValue('senderLastname', e.target.value)
                            setFieldValue('CustomerLastName', e.target.value)
                        }}
                        value={values.senderLastname}
                    />
                </div>

                <FormInput
                    label="PHONE NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.senderPhoneNumber}
                    errorMessage={errors.senderPhoneNumber}
                    onChange={(e)=>{
                        setFieldValue('senderPhoneNumber', e.target.value)
                        setFieldValue('CustomerPhoneNumber', e.target.value)
                    }}
                    value={values.senderPhoneNumber}
                />
            </div>
        </div>
    )

    const deliveryDetails = (
        <div>
            {/** Delivery Details */}
            <div className='border-b-2 py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Delivery Details
                </p>

                <FormInput
                    label="DELIVERY ADDRESS"
                    className="border-[#333333] border py-2"
                    error={!!errors.deliveryAddress}
                    errorMessage={errors.deliveryAddress}
                    onChange={handleChange('deliveryAddress')}
                    value={values.deliveryAddress}
                />

                <div className="grid md:grid-cols-2 py-6 gap-8">
                    <GoogleCityAutocomplete
                        handleSelect={(city)=>{
                            setFieldValue('deliveryCity', city)
                        }}
                        label="CITY"
                        className="border-[#333333] border py-2"
                        endAdornment={
                            <GrLocation size={20} />
                        }
                        error={!!errors.deliveryCity}
                        errorMessage={errors.deliveryCity}
                        onChange={handleChange('deliveryCity')}
                        value={values.deliveryCity}
                    />
                    <FormSelect
                        label="STATE"
                        className="border-[#333333] border py-2"
                        // endAdornment={
                        //     <GrLocation size={20} />
                        // }
                        error={!!errors.deliveryState}
                        errorMessage={errors.deliveryState}
                        onChange={handleChange('deliveryState')}
                        handleSelect={(value)=>{
                            setFieldValue('deliveryState', value)
                        }}
                        onBlur={(e)=>{
                            let res = NigerianStates.find((item)=> item.value.toLowerCase() === e.target.value.toLowerCase())
                            console.log(res)
                            if (res) {
                                setFieldValue('deliveryState', res.value)
                            }
                            else{
                                setFieldValue('deliveryState', '')
                            }
                        }}
                        value={values.deliveryState}
                        options={NigerianStates}
                    />
                </div>

                <FormInput
                    label="LANDMARK"
                    className="border-[#333333] border py-2"
                    error={!!errors.deliveryLandmark}
                    errorMessage={errors.deliveryLandmark}
                    onChange={handleChange('deliveryLandmark')}
                    value={values.deliveryLandmark}
                />
            </div>

            {/** Receiver */}
            <div className='py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Receiver
                </p>

                <div className="grid md:grid-cols-2 py-6 gap-8">
                    <FormInput
                        label="FIRST NAME"
                        className="border-[#333333] border py-2"
                        error={!!errors.receiverFirstname}
                        errorMessage={errors.receiverFirstname}
                        onChange={handleChange('receiverFirstname')}
                        value={values.receiverFirstname}
                    />
                    <FormInput
                        label="LAST NAME"
                        className="border-[#333333] border py-2"
                        error={!!errors.receiverLastname}
                        errorMessage={errors.receiverLastname}
                        onChange={handleChange('receiverLastname')}
                        value={values.receiverLastname}
                    />
                </div>

                <FormInput
                    label="PHONE NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.receiverPhoneNumber}
                    errorMessage={errors.receiverPhoneNumber}
                    onChange={handleChange('receiverPhoneNumber')}
                    value={values.receiverPhoneNumber}
                />
            </div>
        </div>
    )

    const packageDetails = (
        <div>
            {/** Delivery Details */}
            <div className='border-b-2 py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Package delivery duration
                </p>

                <div className="grid md:grid-cols-2 py-6 gap-8">
                    <FormInput 
                        labelClass='text-sm'
                        label='PICKUP DATE'
                        type='date'
                        className='border border-site-gray-border min-w-[200px] py-2'
                        onChange={handlePickUpOnChange}
                        value={values.pickUpDate}
                        error={!!errors.pickUpDate}
                        errorMessage={errors.pickUpDate}
                    />
                    <FormInput 
                        labelClass='text-sm'
                        label='EXPECTED DELIVERY DATE'
                        type='date'
                        className='border border-site-gray-border min-w-[200px] py-2'
                        onChange={handleDeliveryOnChange}
                        value={values.deliveryDate}
                        error={!!errors.deliveryDate}
                        errorMessage={errors.deliveryDate}
                    />
                </div>

            </div>

            {/** Receiver */}
            <div className='py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Package Description
                </p>

                <div className="py-6">
                    <FormTextArea
                        // label="PHONE NUMBER"
                        className="border-[#333333] border py-2"
                        error={!!errors.packageDescription}
                        errorMessage={errors.packageDescription}
                        onChange={handleChange('packageDescription')}
                        rows={3}
                        value={values.packageDescription}
                    />
                </div>

            </div>
        </div>
    )

    const notes = (
        <div>
            {/** Delivery Details */}
            <div className='py-8 px-6'>
                <p className='text-2xl text-black font-bold text-center'>
                    Notes
                </p>

                <div className="py-6">
                    <FormTextArea
                        // label="PHONE NUMBER"
                        className="border-[#333333] border py-2"
                        rows={3}
                        value={values.notes}
                        onChange={handleChange('notes')}
                        error={!!errors.notes}
                        errorMessage={errors.notes}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <FormInput 
                        // labelClass='text-sm'
                        label='WEIGHT'
                        className='border border-site-gray-border min-w-[200px] py-2 pr-10'
                        onChange={handleChange('weightOfPackage')}
                        value={values.weightOfPackage}
                        error={!!errors.weightOfPackage}
                        errorMessage={errors.weightOfPackage}
                        type='number'
                        endAdornment={
                            <p>KG</p>
                        }
                    />
                    <FormInput 
                        // labelClass='text-sm'
                        label='NUMBER OF ITEMS'
                        className='border border-site-gray-border min-w-[200px] py-2'
                        onChange={handleChange('numberOfItems')}
                        value={values.numberOfItems}
                        error={!!errors.numberOfItems}
                        errorMessage={errors.numberOfItems}
                        type='number'
                    />
                </div>

            </div>
        </div>
    )

    return(
        <div className='p-5 flex flex-col h-full relative'>
            <div 
                className='absolute right-3 top-3 cursor-pointer z-10'
                onClick={(e)=>{
                    e.stopPropagation();
                    onClose && onClose()
                }}
            >
                <MdOutlineClose size={20} />
            </div>
            <ul className="relative flex flex-row overflow-x-scroll">
                {
                    headers.map((item, i)=>(
                        <li 
                            className={`flex items-center gap-x-2 shrink basis-0 flex-1 group pb-3 border-b-2 cursor-pointer min-w-[150px] px-3 ${item.active ? 'border-black' : ''}`}
                            onClick={()=> setActiveIndex(i)}
                        >
                             <span className="min-w-[28px] min-h-[28px] group inline-flex items-center align-middle">
                                <div className={`border-2 border-black rounded-full w-[32px] h-[32px] flex items-center justify-center ${item.active ? 'bg-black text-white' : 'text-black'}`}>
                                    { i + 1 }
                                </div>
                                <span className="ms-2 font-medium text-gray-800">
                                    { item.text }
                                </span>
                            </span>
                        </li>
                    ))
                }
            </ul>

            <div className='flex-1 overflow-y-scroll h-[40vh]'>
                { activeIndex === 0 && pickupDetails }
                { activeIndex === 1 && deliveryDetails }
                { activeIndex === 2 && packageDetails }
                { activeIndex === 3 && notes }
            </div>
            <div className='flex items-center'>
                {
                    activeIndex > 0 &&
                    <button
                        onClick={handlePrev}
                        className={`min-w-[110px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black font-semibold`}
                    >
                        Previous
                    </button>
                }
                <div className='flex-1'></div>
               {
                activeIndex !== 3 &&
                <button
                    onClick={handleNext}
                    // disabled
                    className={`min-w-[110px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black font-semibold disabled:opacity-40`}
                >
                    Next
                </button>
               }
               {
                activeIndex === 3 &&
                <FormButton
                    onClick={()=> {
                        if (!isValid) {
                            alert("Please fill in all required fields")
                            console.log(values)
                        }
                        handleSubmit()
                    }}
                    loading={loading}
                    // disabled
                    className={`min-w-[110px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black font-semibold disabled:opacity-40`}
                >
                    Create Delivery
                </FormButton>
               }
            </div>
        </div>
    )
}

export default AddNewPackageForm;