import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const enterEmailSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .matches(emailRegex, 'Enter a valid email address')
    .required('Email is required'),
});