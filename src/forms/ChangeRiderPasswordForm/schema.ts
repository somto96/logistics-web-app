import * as yup from "yup";

/**
 * ^ represents the starting of the string.
 * (?=.*[a-z]) represent at least one lowercase character.
 * (?=.*[A-Z]) represents at least one uppercase character.
 * (?=.*\\d) represents at least one numeric value.
 * (?=.[-+_!@#$%^&., ?]) represents at least one special character.
 * . represents any character except line break.
 * {.8,} represents minimum 8 in length.
 */
const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])(?=.*[0-9])(?=.{8,})"
);


export const ChangeRiderPasswordFormSchema = yup.object({

    currentPassword: yup.string().required("Please enter your current password"),

    password: yup.string().required("Please enter your password")
    .matches(regex, 'Password should contain at least 1 uppercase letter, 1 number, 1 special character, and should not be less than 8 in length'),
    confirmPassword: yup.string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
    
});

export type ChangeRiderPasswordFormState = yup.InferType<typeof ChangeRiderPasswordFormSchema>;