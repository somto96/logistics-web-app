"use client"

import { useFormik } from "formik";
import React from "react";
import FormInput from "@/components/FormElements/FormInput";
import FormButton from "@/components/FormElements/FormButton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import backendClient from '@/services/ImperiumApiClient';
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ChangeRiderPasswordFormSchema, ChangeRiderPasswordFormState } from "./schema";

export interface ChangePasswordFormProps{
    // userSession?: SignInResponseData;
    // onFormSubmit?: (state: SignInFormState) => void;
    companyId?: string;
}

const ChangeRiderPasswordForm: React.FC<ChangePasswordFormProps> = ({
    companyId
})=>{

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [currentVisible, setCurrentVisible] = React.useState<boolean>(false);
    const [confirmVisible, setConfirmVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: ChangeRiderPasswordFormState = {
        currentPassword: "",
        password: "",
        confirmPassword: ""
    }


    // Formik
    const { 
        handleChange, errors, setFieldValue,
        handleSubmit, isValid, values
    } =  useFormik({
        validateOnBlur: false,
        initialValues: initialValues,
        validationSchema: ChangeRiderPasswordFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{
        }
    });

    // Handlers
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }
    const handlePasswordVisibleClick = ()=>{
        setVisible(!visible);
    }
    const handleCurrentPasswordVisibleClick = ()=>{
        setCurrentVisible(!visible);
    }

    return(
        <form onSubmit={handleFormSubmit}
            className="space-y-8"
        >

            <FormInput
                label="CURRENT PASSWORD"
                className="border-[#333333] border"
                type={visible ? 'text' : 'password'}
                onChange={handleChange('currentPassword')}
                error={!!errors.currentPassword}
                errorMessage={errors.currentPassword}
                endAdornment={
                    <MdOutlineRemoveRedEye
                        className={'cursor-pointer'}
                        size={20} 
                        onClick={handleCurrentPasswordVisibleClick}
                    />
                }
            />
            <FormInput
                label="PASSWORD"
                className="border-[#333333] border"
                type={visible ? 'text' : 'password'}
                onChange={handleChange('password')}
                error={!!errors.password}
                errorMessage={errors.password}
                endAdornment={
                    <MdOutlineRemoveRedEye
                        className={'cursor-pointer'}
                        size={20} 
                        onClick={handlePasswordVisibleClick}
                    />
                }
            />
            <FormInput
                label="CONFIRM PASSWORD"
                className="border-[#333333] border"
                type={confirmVisible ? 'text' : 'password'}
                onChange={handleChange('confirmPassword')}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                endAdornment={
                    <MdOutlineRemoveRedEye
                        className={'cursor-pointer'}
                        size={20} 
                        onClick={()=> setConfirmVisible(!confirmVisible)}
                    />
                }
            />
        
            
            <div className="flex justify-center">
                <FormButton
                    type="submit"
                    loading={loading}
                    disabled={loading || !isValid}
                    className="disabled:opacity-40 font-normal"
                >
                    Change Password
                </FormButton>
            </div>
            
        </form>
    )
}

export default ChangeRiderPasswordForm;