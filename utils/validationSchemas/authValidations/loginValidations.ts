import * as Yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginSchema = () => {
  return Yup.object({
    email: Yup.string()
      .trim()
      .email('Invalid email address')
      .matches(emailRegex, 'Enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .trim('Password cannot contain spaces')
      .required('Please enter your password'),
  });
};
