import * as yup from "yup";

export const SignInFormSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required()
});

export type SignInFormState = yup.InferType<typeof SignInFormSchema>;