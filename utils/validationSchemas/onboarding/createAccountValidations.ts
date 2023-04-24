import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const createAccountSchema = Yup.object({
  contactFullName: Yup.string().required('Please enter your first name'),
  companyName: Yup.string().required('Please enter your last name'),
  phoneNumber: Yup.string().required('Please enter your phone number'),
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .matches(emailRegex, 'Enter a valid email address')
    .required('Email is required'),
  city: Yup.string().trim().required('Please enter a city'),
  state: Yup.string().required('Please select a state'),
  address: Yup.string().trim().required('Please enter your address')
});
