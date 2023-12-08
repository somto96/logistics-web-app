import * as yup from "yup";

let alphanumericRegex = /^[aA-zZ0-9]+$/;

export const ProfileUpdateFormSchema = yup.object({
    contactFullName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    email: yup.string().required().email(),
    phoneNumber: yup.string().required().min(8),
});

export type ProfileUpdateFormState = yup.InferType<typeof ProfileUpdateFormSchema>;