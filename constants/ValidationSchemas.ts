import { UserProps } from "@/data/PropTypes";
import * as yup from "yup";

const phoneReqEx = /^[0-9]{10}$/i;
const nameRegEx = /^[A-Z]{2,18}$/i;
const phoneCodeRegEx = /^\+[0-9]{1,2}$/i;
const countryCodeRegEx = /^[A-Z]{2}$/i;
const countryNameRegEx = /^[A-Z\s]{3, 18}$/i;
const usernameRegEx = /^[A-Z0-9]{5,18}$/i;
const passwordRegEx = /^[A-Z0-9._@*!#$%^&]{8,18}$/i;

const modelNameRegEx = /^[A-Z0-9._#]{2,18}$/i;

export const initRegistrationValues = {
  emailID: "",
  firstName: "",
  lastName: "",
  phone: "",
  phoneCode: "",
  countryCode: "",
  username: "",
  password: "",
  retypePassword: "",
  countryName: "",
};

export const registrationSchema = yup.object().shape({
  emailID: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  firstName: yup
    .string()
    .min(2, ({ min }) => `First Name must be atleast ${min} characters long`)
    .max(18, ({ max }) => `First Name must be atleast ${max} characters long`)
    .matches(nameRegEx, "First Name should contain only alphabets")
    .required("First Name is Required"),
  lastName: yup
    .string()
    .min(2, ({ min }) => `Last Name must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Last Name must be atleast ${max} characters long`)
    .matches(nameRegEx, "Last Name should contain only alphabets")
    .required("Last Name is Required"),
  phone: yup
    .string()
    .matches(phoneReqEx, "Phone number is invalid")
    .required("Phone Number is Required"),
  phoneCode: yup
    .string()
    .matches(phoneCodeRegEx, "Phone Code is invalid")
    .required("Select Country Code"),
  countryCode: yup
    .string()
    .matches(countryCodeRegEx, "Country Code is invalid")
    .required("Select a country"),
  countryName: yup
    .string()
    // .matches(countryNameRegEx, "Country Name is invalid")
    .required("Select a country"),
  username: yup
    .string()
    .matches(
      usernameRegEx,
      "Username should contain only alphanumeric characters"
    )
    .required(),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Password must be atleast ${max} characters long`)
    .matches(
      passwordRegEx,
      "Password should contain only [alphanumeric, '!', '@', '#','$','%','^','&','*'] characters"
    ),
  retypePassword: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Password must be atleast ${max} characters long`)
    .oneOf([yup.ref("password"), undefined], "Passwords do not match")
    .required("Please confirm password"),
});

export const initLoginValues = {
  username: "",
  password: "",
};

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .matches(
      usernameRegEx,
      "Username should contain only alphanumeric characters"
    )
    .required(),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Password must be atleast ${max} characters long`)
    .matches(
      passwordRegEx,
      "Password should contain only [alphanumeric, '!', '@', '#','$','%','^','&','*'] characters"
    ),
});

export const iniUserUpdateValues = {
  firstName: "",
  lastName: "",
  emailID: "",
  phone: "",
  countryCode: "",
};

export const userUpdateSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, ({ min }) => `First Name must be atleast ${min} characters long`)
    .max(18, ({ max }) => `First Name must be atleast ${max} characters long`)
    .matches(nameRegEx, "First Name should contain only alphabets")
    .required("First Name is Required"),
  lastName: yup
    .string()
    .min(2, ({ min }) => `Last Name must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Last Name must be atleast ${max} characters long`)
    .matches(nameRegEx, "Last Name should contain only alphabets")
    .required("Last Name is Required"),
  emailID: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  phone: yup
    .string()
    .matches(phoneReqEx, "Phone number is invalid")
    .required("Phone Number is Required"),
  // phoneCode: yup
  //   .string()
  //   .matches(phoneCodeRegEx, "Phone Code is invalid")
  //   .required("Select Country Code"),
  countryCode: yup
    .string()
    .matches(countryCodeRegEx, "Country Code is invalid")
    .required("Select a country"),
  // countryName: yup
  //   .string()
  //   // .matches(countryNameRegEx, "Country Name is invalid")
  //   .required("Select a country"),
});

export const initModelUpdateValues = {
  modelName: "",
};

export const modelUpdateSchema = yup.object().shape({
  modelName: yup
    .string()
    .min(2, ({ min }) => `Model name must be atleast ${min} characters long`)
    .max(18, ({ max }) => `Model name must be atmost ${max} characters long`)
    .matches(
      modelNameRegEx,
      "Model name should contain only [alphanumeric, '#', '_'] characters"
    ),
});
