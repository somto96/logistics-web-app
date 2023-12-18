"use client"

import { useFormik } from "formik";
import React from "react";
import FormInput from "@/components/FormElements/FormInput";

import FormButton from "@/components/FormElements/FormButton";
import { FiUser, FiPhone } from "react-icons/fi";
import { RiderProfileUpdateFormSchema, RiderProfileUpdateFormState } from "./schema";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { RiderData } from "@/types/responses/RiderData";
import { UpdateRiderPayload } from "@/types/requests/UpdateRider";
import backendClient from '@/services/ImperiumApiClient';
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import { getSessionToken } from "@/utils/sessionUtils";

export interface RiderProfileUpdateFormProps{
    userSession?: SignInResponseData;
    riderData?: RiderData;
    onSuccess?: ()=> void;
    // onFormSubmit?: (state: SignInFormState) => void;
}

backendClient.setToken(getSessionToken() || '');

const RiderProfileUpdateForm: React.FC<RiderProfileUpdateFormProps> = ({
    onSuccess, riderData
})=>{

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: RiderProfileUpdateFormState = {
        fullName: riderData?.fullName || "",
        frequentLocation: riderData?.frequentLocation || "",
        bikeRegistrationNumber: riderData?.bikeRegistrationNumber || "",
        licenseNumber: riderData?.licenseNumber || "",
        phoneNumber: riderData?.phoneNumber || ""
    }

    // Handlers
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }
   

    // Formik
    const { 
        handleChange, errors, setFieldValue,
        handleSubmit, isValid, values
    } =  useFormik({
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: RiderProfileUpdateFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{
            backendClient.setToken(getSessionToken() || '');
            let payload: UpdateRiderPayload = {
                id: riderData?.id || "",
                fullName: values.fullName,
                phoneNumber: values.phoneNumber,
                frequentLocation: values.frequentLocation,
                bikeRegistrationNumber: values.bikeRegistrationNumber,
                licenseNumber: values.licenseNumber
            }

            setLoading(true)
    
            // Update Profile
            try {
                let response = await backendClient.updateRiderProfile(payload)
    
                if (response.responseObject) {
                    setLoading(false);

                    onSuccess && onSuccess()
                    
                    ToastNotify({
                        type: 'success',
                        message: response.message,
                        position: 'top-right',
                    });


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

    return(
        <form onSubmit={handleFormSubmit}
            className="space-y-8"
        >
            <FormInput
                label="FULLNAME"
                className="border-[#333333] border"
                endAdornment={
                    <FiUser size={20} />
                }
                error={!!errors.fullName}
                errorMessage={errors.fullName}
                onChange={handleChange('fullName')}
                value={values.fullName}
            />

            <FormInput
                label="PHONE NUMBER"
                className="border-[#333333] border"
                endAdornment={
                    <FiPhone size={20} />
                }
                error={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber}
                onChange={(e)=>{
                    setFieldValue('phoneNumber', e.target.value.replace(/\D/g, ''))
                }}
                value={values.phoneNumber}
            />
            
            <FormInput
                label="FREQUENT LOCATION"
                className="border-[#333333] border"
                error={!!errors.frequentLocation}
                errorMessage={errors.frequentLocation}
                onChange={handleChange('frequentLocation')}
                value={values.frequentLocation}
            />

            <FormInput
                label="LICENSE NUMBER"
                className="border-[#333333] border"
                error={!!errors.licenseNumber}
                errorMessage={errors.licenseNumber}
                onChange={handleChange('licenseNumber')}
                value={values.licenseNumber}
            />

            <FormInput
                label="BIKE REGISTRATION NUMBER"
                className="border-[#333333] border"
                error={!!errors.bikeRegistrationNumber}
                errorMessage={errors.bikeRegistrationNumber}
                onChange={handleChange('bikeRegistrationNumber')}
                value={values.bikeRegistrationNumber}
            />
            
            <div className="flex items-center justify-center">
                <FormButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className="disabled:opacity-40 font-normal hover:opacity-90"
                >
                    Save Changes
                </FormButton>
            </div>
            
        </form>
    )
}

export default RiderProfileUpdateForm;