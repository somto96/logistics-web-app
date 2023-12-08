"use client"

import { useFormik } from "formik";
import React from "react";
import FormInput from "@/components/FormElements/FormInput";
import FormButton from "@/components/FormElements/FormButton";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import backendClient from '@/services/ImperiumApiClient';

import { ChangePasswordFormSchema, ChangePasswordFormState, } from "./schema";
import { SignInResponseData } from "@/types/responses/SignInResponseData";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CreatePasswordPayload } from "@/types/requests/CreatePasswordPayload";
import { setCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookie.config";

export interface ChangePasswordFormProps{
    // userSession?: SignInResponseData;
    // onFormSubmit?: (state: SignInFormState) => void;
    companyId?: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
    companyId
})=>{

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmVisible, setConfirmVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: ChangePasswordFormState = {
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
        validationSchema: ChangePasswordFormSchema,
        enableReinitialize: true,
        onSubmit: async (values, actions)=>{

            let payload: CreatePasswordPayload = {
                companyId: companyId || '',
                password: values.password,
                confirmPassword: values.confirmPassword
            }

            setLoading(true)
    
            // Create Password
            try {
                let response = await backendClient.createPassword(payload)
    
                if (response.responseObject) {
                    setLoading(false)
                    
                    setCookie(AUTH_KEY, JSON.stringify(response.responseObject));
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

    // Handlers
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        handleSubmit(e)
    }
    const handlePasswordVisibleClick = ()=>{
        setVisible(!visible);
    }

    return(
        <form onSubmit={handleFormSubmit}
            className="space-y-8"
        >

            <div className="grid md:grid-cols-2 gap-6">
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
            
            </div>
            
            <FormButton
                type="submit"
                loading={loading}
                disabled={loading || !isValid}
                className="disabled:opacity-40 font-normal"
            >
                Change
            </FormButton>
            
        </form>
    )
}

export default ChangePasswordForm;