"use client"

import { useFormik } from "formik";
import React from "react";
import { SignInFormSchema, SignInFormState } from "./schema";
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

export interface SignInFormProps{
    // onFormSubmit?: (state: SignInFormState) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
    // onFormSubmit
})=>{

    // Hooks
    const router = useRouter();

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: SignInFormState = {
        email: "",
        password: ""
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
        validationSchema: SignInFormSchema,
        onSubmit: async (values, actions)=>{
            let payload: SignInPayload = {
                email: values.email,
                password: values.password
            }

            setLoading(true)
    
            // Get tracking information
            try {
                let response = await backendClient.signIn(payload)
    
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
        <form className="sm:w-[500px] w-[85%] rounded-xl shadow-lg bg-white/90" onSubmit={handleFormSubmit}>
            <div className="p-5 border-b border-gray-400">
                <p className="text-[22px] font-medium tracking-wide">
                    Sign in
                </p>    
            </div>
            <div className="sm:p-5 p-3">
                <div className="sm:p-5 p-3">
                    <FormInput
                        label="COMPANY EMAIL"
                        className="border-[#333333] border"
                        endAdornment={
                            <LuMail size={20} />
                        }
                        error={!!errors.email}
                        errorMessage={"Email is required"}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="sm:p-5 p-3">
                    <FormInput
                        label="PASSWORD"
                        className="border-[#333333] border"
                        type={visible ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        error={!!errors.password}
                        errorMessage="Please enter your password"
                        endAdornment={
                            <MdOutlineRemoveRedEye
                                className={'cursor-pointer'}
                                size={20} 
                                onClick={handlePasswordVisibleClick}
                            />
                        }
                    />
                </div>
                <div className="flex items-center sm:px-5 px-3">
                    <div className="inline-flex items-center">
                        <input 
                            type="checkbox" 
                            className="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                            id="hs-default-checkbox"
                        />
                        <label 
                            htmlFor="hs-default-checkbox" 
                            className="cursor-pointer text-sm ms-2"
                        >
                            Remember me
                        </label>
                    </div>
                    <div className="flex-1"></div>
                    <Link 
                        href={'#'}
                        className="text-sm underline"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="my-5 flex justify-center">
                    <FormButton
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        // className='min-w-10 inline-flex items-center px-5 h-10 text-sm font-medium text-center text-white bg-black rounded-full'
                    >
                        Sign in
                    </FormButton>
                </div>
                <div className="text-center">
                    <span className="text-sm text-gray-500">
                        New member? {" "}
                        <Link 
                            href={'create-account'}
                            className="text-black font-medium"
                        >
                            Create Account
                        </Link>
                    </span>
                </div>
            </div>
        </form>
    )
}

export default SignInForm;