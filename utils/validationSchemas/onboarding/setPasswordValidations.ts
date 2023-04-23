import * as Yup from 'yup';
export const setPasswordSchema = () => {
  return Yup.object({
    password: Yup.string()
      .trim('Password cannot contain spaces')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .trim('Password cannot contain spaces')
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });
};
