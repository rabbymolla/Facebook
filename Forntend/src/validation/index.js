import * as Yup from "yup";

export const singUp = Yup.object({
  fname: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Plz Enter Your First Name"),
  lname: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Plz Enter Your last Name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Plz Enter Your Email"),
  password: Yup.string()
    .min(8, "Must be 8 characters")
    .required("Plz Enter Your Password"),
  gender: Yup.string().required("Plz Enter Your Gender"),
});
export const singIn = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Plz Enter Your Email"),
  password: Yup.string()
    .min(8, "Must be 8 characters")
    .required("Plz Enter Your Password"),
});
export const forgotPass = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Plz Enter Your Email"),
  password: Yup.string()
    .min(8, "Must be 8 characters")
    .required("Plz Enter New Password"),
});
export const userOtp = Yup.object({
  otp: Yup.string()
    .min(6, "Must be 6 characters")
    .required("Plz Enter Your OTP"),
});
