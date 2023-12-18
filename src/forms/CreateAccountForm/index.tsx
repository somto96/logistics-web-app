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
import { CreateFormSchema, CreateFormState } from "./schema";
import { FiUser, FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import GoogleCityAutocomplete from "@/components/FormElements/GoogleCityAutocomplete";
import FormSelect from "@/components/FormElements/FormSelect";
import { NigerianStates } from "@/constants/location.config";
import { CreateAccountPayload } from "@/types/requests/CreateAccountPayload";

export interface SignInFormProps{
    // onFormSubmit?: (state: SignInFormState) => void;
}

const CreateAccountForm: React.FC<SignInFormProps> = ({
    // onFormSubmit
})=>{

    // Hooks
    const router = useRouter();

    // State
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Initial values
    let initialValues: CreateFormState = {
        contactFullName: "",
        companyName: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phoneNumber: ""
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
        validationSchema: CreateFormSchema,
        onSubmit: async (values, actions)=>{

            let payload: CreateAccountPayload = {
                contactFullName: values.contactFullName,
                companyName: values.companyName,
                address: values.address,
                city: values.city,
                state: values.state,
                email: values.email,
                phoneNumber: {
                    Number: values.phoneNumber,
                    CountryCode: '234'
                }
            }

            setLoading(true)
    
            // Get tracking information
            try {
                let response = await backendClient.createAccount(payload)
    
                if (response.responseObject) {
                    setLoading(false)
                    
                    ToastNotify({
                        type: 'success',
                        message: response.message,
                        position: 'top-right',
                    });
                    router.push('/sign-in')

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
        <form className="sm:w-[820px] w-[90%] rounded-xl shadow-lg bg-white/90 text-black" onSubmit={handleFormSubmit}>
            <div className="p-5 border-b border-gray-400">
                <p className="text-lg tracking-wide text-center">
                    Welcome, get started on joining our growing members
                </p>    
            </div>
            <div className="sm:p-5 p-3">
                <div className="grid md:grid-cols-2">
                    <div className="sm:p-5 p-3">
                        <FormInput
                            label="CONTACT FULLNAME"
                            className="border-[#333333] border"
                            endAdornment={
                                <FiUser size={20} />
                            }
                            error={!!errors.contactFullName}
                            errorMessage={errors.contactFullName}
                            onChange={handleChange('contactFullName')}
                        />
                    </div>
                    <div className="sm:p-5 p-3">
                        <FormInput
                            label="COMPANY NAME"
                            className="border-[#333333] border"
                            endAdornment={
                                <FiUser size={20} />
                            }
                            error={!!errors.companyName}
                            errorMessage={errors.companyName}
                            onChange={handleChange('companyName')}
                        />
                    </div>
                </div>
                <div className="sm:p-5 p-3">
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
                <div className="sm:p-5 p-3">
                    <FormInput
                        label="COMPANY EMAIL"
                        className="border-[#333333] border"
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        errorMessage={errors.email}
                        endAdornment={
                            <LuMail size={20} />
                        }
                    />
                </div>
                <div className="sm:p-5 p-3">
                    <FormInput
                        label="COMPANY ADDRESS"
                        className="border-[#333333] border"
                        endAdornment={
                            <GrLocation size={20} />
                        }
                        error={!!errors.address}
                        errorMessage={errors.address}
                        onChange={handleChange('address')}
                    />
                </div>
                <div className="grid md:grid-cols-2">
                    <div className="sm:p-5 p-3">
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
                    </div>
                    <div className="sm:p-5 p-3 z-[30]">
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
                </div>
                
                <div className="my-5 flex justify-center">
                    <FormButton
                        type="submit"
                        loading={loading}
                        disabled={loading || !isValid}
                        className="disabled:opacity-40"
                        // className='min-w-10 inline-flex items-center px-5 h-10 text-sm font-medium text-center text-white bg-black rounded-full'
                    >
                        Create Account
                    </FormButton>
                </div>
                <div className="text-center">
                    <span className="text text-gray-500">
                        Are you already a member? {" "}
                        <Link 
                            href={'sign-in'}
                            className="text-black font-medium"
                        >
                            Sign in
                        </Link>
                    </span>
                </div>
            </div>
        </form>
    )
}

export default CreateAccountForm;