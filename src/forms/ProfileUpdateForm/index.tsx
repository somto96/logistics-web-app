"use client"

import { useFormik } from "formik";
import React from "react";
import FormInput from "@/components/FormElements/FormInput";
import Link from "next/link";
import { LuMail } from "react-icons/lu";
import FormButton from "@/components/FormElements/FormButton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import backendClient from '@/services/ImperiumApiClient';
import { useRouter } from "next/navigation";
import { FiUser, FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import GoogleCityAutocomplete from "@/components/FormElements/GoogleCityAutocomplete";
import FormSelect from "@/components/FormElements/FormSelect";
import { NigerianStates } from "@/constants/location.config";
import { useSession } from "@/hooks/useSession";
import { ProfileUpdateFormSchema, ProfileUpdateFormState } from "./schema";
import { SignInResponseData } from "@/types/responses/SignInResponseData";

export interface ProfileUpdateFormProp{
    userSession?: SignInResponseData;
    // onFormSubmit?: (state: SignInFormState) => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProp> = ({
    userSession
})=>{

    // Hooks
    const router = useRouter();

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: ProfileUpdateFormState = {
        contactFullName: userSession?.name || '',
        address: "",
        city: "",
        state: "",
        email: userSession?.email || '',
        phoneNumber: userSession?.phoneNumber || ''
    }

    // Handlers
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }
    const handlePasswordVisibleClick = ()=>{
        setVisible(!visible);
    }

    // Formik
    const { 
        handleChange, errors, setFieldValue,
        handleSubmit, isValid, values
    } =  useFormik({
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: ProfileUpdateFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{
        }
    });

    return(
        <form onSubmit={handleFormSubmit}
            className="space-y-8"
        >

            <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                    label="CONTACT FULLNAME"
                    className="border-[#333333] border"
                    endAdornment={
                        <FiUser size={20} />
                    }
                    error={!!errors.contactFullName}
                    errorMessage={errors.contactFullName}
                    onChange={handleChange('contactFullName')}
                    value={values.contactFullName}
                />
                <FormInput
                    label="COMPANY PHONE NUMBER"
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
            
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                
                <FormInput
                    label="COMPANY EMAIL"
                    className="border-[#333333] border"
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    errorMessage={errors.email}
                    endAdornment={
                        <LuMail size={20} />
                    }
                    disabled
                    value={values.email}
                />
                <FormInput
                    label="COMPANY ADDRESS"
                    className="border-[#333333] border"
                    endAdornment={
                        <GrLocation size={20} />
                    }
                    error={!!errors.address}
                    errorMessage={errors.address}
                    onChange={handleChange('address')}
                    value={values.address}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                
                <GoogleCityAutocomplete
                    handleSelect={(city)=>{
                        setFieldValue('city', city)
                    }}
                    label="CITY"
                    className="border-[#333333] border"
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
                    className="border-[#333333] border"
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

            
            <FormButton
                type="submit"
                loading={loading}
                disabled={loading || !isValid}
                className="disabled:opacity-40 font-normal"
            >
                Save Changes
            </FormButton>
            
        </form>
    )
}

export default ProfileUpdateForm;