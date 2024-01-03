import FormInput from '@/components/FormElements/FormInput';
import React from 'react';
import { AddRiderFormSchema, AddRiderFormState } from './schema';
import { useFormik } from 'formik';
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from '@/utils/sessionUtils';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import GoogleCityAutocomplete from '@/components/FormElements/GoogleCityAutocomplete';
import { GrLocation } from 'react-icons/gr';
import Image from 'next/image';
import FormButton from '@/components/FormElements/FormButton';
import { RiderData } from '@/types/responses/RiderData';
import { UpdateRiderPayload } from '@/types/requests/UpdateRider';

export interface AddRiderFormProps{
    onSuccess?: ()=> void;
    riderData?: RiderData;
}

const AddRiderForm: React.FC<AddRiderFormProps> = ({
    onSuccess, riderData
})=>{

    // Initial values
    let initialValues: AddRiderFormState = {
        fullName: riderData?.fullName || '',
        phoneNumber: riderData?.phoneNumber || '',
        email: riderData?.email || '',
        frequentLocation: riderData?.frequentLocation || '',
        bikeRegistrationNumber: riderData?.bikeRegistrationNumber || '',
        licenseNumber: riderData?.licenseNumber || ''
    }

    // State
    const [loading, setLoading] = React.useState<boolean>(false);

    // Formik
    const { 
        handleChange, errors, setFieldValue,
        handleSubmit, values, isValid,
    } =  useFormik({
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: AddRiderFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{

            backendClient.setToken(getSessionToken() || '');
            setLoading(true);
    
            // Create new rider
            let updatePayload : UpdateRiderPayload = {
                id: riderData?.id || '',
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                frequentLocation: values.frequentLocation,
                bikeRegistrationNumber: values.bikeRegistrationNumber,
                licenseNumber: values.licenseNumber
            }
            try {
                let response = riderData ? (await backendClient.updateRiderProfile(updatePayload)) : (await backendClient.createRiderProfile(values))
    
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

    // Hanlders
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }

    return(
        <form 
            onSubmit={handleFormSubmit}
            className='p-5 flex flex-col h-full relative'
        >

            {/** Profile */}
            <div className="flex flex-col items-center py-5">
                <Image 
                    className="rounded-full mb-4" 
                    src="/images/svgs/user-avatar.svg" 
                    alt={"New Rider avatar"}
                    width={60}
                    height={60}
                />
                <button
                    // onClick={handleUpdateTracking}
                    className={`min-w-[110px] inline-flex items-center justify-center px-2 h-8 text-sm text-center rounded-full text-black bg-white border border-black`}
                >
                    Add Picture
                </button>
            </div>
            
            {/** Inputs */}
            <div className='space-y-5 flex-1'>
                <FormInput
                    label="CONTACT FULL NAME"
                    className="border-[#333333] border py-2"
                    error={!!errors.fullName}
                    errorMessage={errors.fullName}
                    onChange={handleChange('fullName')}
                    value={values.fullName}
                />
                <FormInput
                    label="PHONE NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                />
                <FormInput
                    label="COMPANY EMAIL"
                    className="border-[#333333] border py-2"
                    error={!!errors.email}
                    errorMessage={errors.email}
                    onChange={handleChange('email')}
                    value={values.email}
                />
                <GoogleCityAutocomplete
                    handleSelect={(city)=>{
                        setFieldValue('frequentLocation', city)
                    }}
                    label="FREQUENT DELIVERY LOCATION"
                    className="border-[#333333] border py-2"
                    endAdornment={
                        <GrLocation size={20} />
                    }
                    error={!!errors.frequentLocation}
                    errorMessage={errors.frequentLocation}
                    onChange={handleChange('frequentLocation')}
                    value={values.frequentLocation}
                />
                <FormInput
                    label="BIKE REGISTRATION NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.bikeRegistrationNumber}
                    errorMessage={errors.bikeRegistrationNumber}
                    onChange={handleChange('bikeRegistrationNumber')}
                    value={values.bikeRegistrationNumber}
                    endAdornment={
                        <p>#</p>
                    }
                />
                <FormInput
                    label="RIDER LICENCE NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.licenseNumber}
                    errorMessage={errors.licenseNumber}
                    onChange={handleChange('licenseNumber')}
                    value={values.licenseNumber}
                    endAdornment={
                        <p>#</p>
                    }
                />
            </div>
            <div className='flex items-center mt-6 justify-center'>
                <FormButton
                    loading={loading}
                    disabled={!isValid || loading}
                    type='submit'
                    className={`min-w-[110px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black font-semibold disabled:bg-site-gray-border`}
                >
                    { riderData ? "Save Changes" : "Add Rider" }
                </FormButton>
            </div>
        </form>
    )
}

export default AddRiderForm;