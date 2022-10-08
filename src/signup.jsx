import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";
import FancyInput from "./FancyInput";
import axios from "axios";

function callSignupApi(values, bag) {
  axios
    .post("https://myeasykart.codeyogi.io/signup", {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      bag.props.setuser(user);
    })
    .catch(() => {
      console.log("invalid");
    });
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  full_name: Yup.string().required(),
});

const initialvalues = {
  email: "",
  password: "",
  full_name: "",
};
export function Signup({
  handleSubmit,
  handleBlur,
  handleChange,
  errors,
  touched,
  values,
}) {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 bg-gray-100 rounded-sm w-fit"
      >
        <h1 className="mb-4 space-y-4 text-2xl font-bold text-red-600">
          New User?
        </h1>
        <div className="p-4 border-4">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <Input
                values={values.email}
                errors={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                id="email-address"
                required
                autoComplete="email"
                placeholder="Enter email"
              />
            </div>
            <div className="flex flex-col">
              <Input
                values={values.password}
                errors={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                id="password"
                required
                autoComplete="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex mt-4 mb-4 space-x-4">
            <div className="flex flex-col">
              <FancyInput
                values={values.fullName}
                errors={errors.fullName}
                touched={touched.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fullName"
                type="text"
                id="fullName"
                required
                autoComplete="fullName"
                placeholder="full_name"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-primary-default disabled:bg-primary-light"
          >
            SignIn
          </button>
        </div>
        <div className="flex">
          <h4>Already have an account ? </h4>
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
const myHoc = withFormik({
  initialvalues: initialvalues,
  validationSchema: SignupSchema,
  handleSubmit: callSignupApi,
});
const EAsySignIn = myHoc(Signup);

export default EAsySignIn;
