"use client"

import { useFormik } from "formik";
import React from "react";
import FormInput from "@/components/FormElements/FormInput";
import Link from "next/link";
import { LuMail } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import FormButton from "@/components/FormElements/FormButton";
import { SignInPayload } from "@/types/requests/SignInPayload";
import { ToastNotify } from "@/utils/helperFunctions/toastNotify";
import backendClient from '@/services/ImperiumApiClient';
import { setCookie } from "cookies-next";
import { AUTH_KEY } from "@/constants/cookie.config";
import { useRouter } from "next/navigation";
import { CreateFormState } from "../CreateAccountForm/schema";
import { CreatePasswordFormSchema, CreatePasswordFormState } from "./schema";
import { CreateAccountPayload } from "@/types/requests/CreateAccountPayload";
import { CreatePasswordPayload } from "@/types/requests/CreatePasswordPayload";

export interface CreatePasswordFormProps{
    companyId?: string;
    // onFormSubmit?: (state: SignInFormState) => void;
}

const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({
    companyId
})=>{

    // Hooks
    const router = useRouter();

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [confirmVisible, setConfirmVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: CreatePasswordFormState = {
        password: "",
        confirmPassword: ""
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
        handleChange, errors,
        handleSubmit,
    } =  useFormik({
        initialValues: initialValues,
        validationSchema: CreatePasswordFormSchema,
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

                    if (response.responseObject.role === 'Company') {
                        router.replace('/dashboard/user')
                    }
                    else{
                        router.replace('/dashboard/back-office')
                    }

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
        <form className="sm:w-[820px] w-[85%] rounded-xl shadow-lg bg-white/90" onSubmit={handleFormSubmit}>
            <div className="p-5 border-b border-gray-400">
                <p className="text-[22px] font-medium tracking-wide text-center">
                    Email confirmed, kindly set your password
                </p>    
            </div>
            <div className="sm:p-5 p-3">
                <div className="sm:p-5 p-3">
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
                </div>
                <div className="sm:p-5 p-3">
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
                
                <div className="my-5 flex justify-center">
                    <FormButton
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="px-6"
                        // className='min-w-10 inline-flex items-center px-5 h-10 text-sm font-medium text-center text-white bg-black rounded-full'
                    >
                        Login
                    </FormButton>
                </div>
            </div>
        </form>
    )
}

export default CreatePasswordForm;