import FormInput from '@/components/FormElements/FormInput';
import React from 'react';
import { useFormik } from 'formik';
import backendClient from '@/services/ImperiumApiClient';
import { getSessionToken } from '@/utils/sessionUtils';
import { ToastNotify } from '@/utils/helperFunctions/toastNotify';
import GoogleCityAutocomplete from '@/components/FormElements/GoogleCityAutocomplete';
import { GrLocation } from 'react-icons/gr';
import Image from 'next/image';
import FormButton from '@/components/FormElements/FormButton';
import { UpdateCompanyFormSchema, UpdateCompanyFormState } from './schema';
import { CompanyData } from '@/types/responses/CompanyData';
import { UpdateCompanyPayload } from '@/types/requests/UpdateCompany';
import { FiPhone, FiUser } from 'react-icons/fi';
import FormSelect from '@/components/FormElements/FormSelect';
import { NigerianStates } from '@/constants/location.config';

export interface UpdateCompanyFormProps{
    onSuccess?: ()=> void;
    companyData?: CompanyData;
}

const UpdateCompanyForm: React.FC<UpdateCompanyFormProps> = ({
    onSuccess, companyData
})=>{

    // Initial values
    let initialValues: UpdateCompanyFormState = {
        contactFullName: companyData?.owner.fullName || '',
        address: companyData?.address || '',
        city: companyData?.city || '',
        state: companyData?.state || '',
        phoneNumber: companyData?.phoneNumber || '',
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
        validationSchema: UpdateCompanyFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{

            backendClient.setToken(getSessionToken() || '');
            setLoading(true);
    
            // Create new rider
            let updatePayload : UpdateCompanyPayload = {
                ...values,
                id: companyData?.id || ''
            }
            try {
                let response = await backendClient.updateCompanyProfile(updatePayload)
    
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
                    error={!!errors.contactFullName}
                    errorMessage={errors.contactFullName}
                    onChange={handleChange('contactFullName')}
                    value={values.contactFullName}
                    endAdornment={
                        <FiUser size={20} />
                    }
                />
                <FormInput
                    label="COMPANY PHONE NUMBER"
                    className="border-[#333333] border py-2"
                    error={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                    endAdornment={
                        <FiPhone size={20} />
                    }
                />
                {/* <FormInput
                    label="COMPANY EMAIL"
                    className="border-[#333333] border py-2"
                    error={!!errors.email}
                    errorMessage={errors.email}
                    onChange={handleChange('email')}
                    value={values.email}
                    endAdornment={
                        <LuMail size={20} />
                    }
                /> */}
                <FormInput
                    label="COMPANY ADDRESS"
                    className="border-[#333333] border py-2"
                    error={!!errors.address}
                    errorMessage={errors.address}
                    onChange={handleChange('address')}
                    value={values.address}
                />
                <div className="grid md:grid-cols-2 gap-4">
                    
                    <GoogleCityAutocomplete
                        handleSelect={(city)=>{
                            setFieldValue('city', city)
                        }}
                        label="CITY"
                        className="border-[#333333] border py-2"
                        endAdornment={
                            <GrLocation size={20} />
                        }
                        error={!!errors.city}
                        errorMessage={errors.city}
                        onChange={handleChange('city')}
                        value={values.city}
                    />
                
                
                    <FormSelect
                        label="STATE"
                        className="border-[#333333] border py-2"
                        // endAdornment={
                        //     <GrLocation size={20} />
                        // }
                        error={!!errors.state}
                        errorMessage={errors.state}
                        onChange={handleChange('state')}
                        handleSelect={(value)=>{
                            setFieldValue('state', value)
                        }}
                        onBlur={(e)=>{
                            let res = NigerianStates.find((item)=> item.value.toLowerCase() === e.target.value.toLowerCase())
                            console.log(res)
                            if (res) {
                                setFieldValue('state', res.value)
                            }
                            else{
                                setFieldValue('state', '')
                            }
                        }}
                        value={values.state}
                        options={NigerianStates}
                    />
                    
                </div>
            </div>
            <div className='flex items-center mt-6 justify-center'>
                <FormButton
                    loading={loading}
                    disabled={!isValid || loading}
                    type='submit'
                    className={`min-w-[110px] inline-flex items-center justify-center px-4 h-10 text-sm text-center rounded-full text-white bg-black font-semibold disabled:bg-site-gray-border`}
                >
                    Save Changes
                </FormButton>
            </div>
        </form>
    )
}

export default UpdateCompanyForm;