import * as yup from "yup";
export const  validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5,'Minnimum length is 5 character')
      .max(8,'Maximum length is 8 character')
      .matches(/^[a-z0-9]+$/i,'Only alphanumeric character allowed')
      .required("Username field is required")
      .trim(),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be more than 8 characters")
      .trim(),
  });
  export const signupSchema = yup.object().shape({
    username: yup
    .string()
      .matches(/^[a-z0-9]+$/i,'Only alphanumeric character allowed')
      .min(5,'Minnimum length is 5 character')
      .max(8,'Maximum length is 8 character')
      .required("Username field is required")
      .trim(),
      email: yup
      .string()
      .email('Please enter an valid email')
      .max(50,'Maximum length is 50 characters')
      .required('Email is required')
      .trim(),
      password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be more than 8 characters")
      .trim(),
      first_name: yup
      .string()
      .max(50,'Maximum length is 20 characters')
      .required('First Name is required')
      .trim(),
      last_name: yup
      .string()
      .max(50,'Maximum length is 20 characters')
      .required('Last Name is required')
      .trim()
  })
