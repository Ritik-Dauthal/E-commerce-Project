import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";
import FancyInput from "./FancyInput";
import axios from "axios";
import { WithUser } from "./WithProvider";

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
  fullName: Yup.string().required(),
});

const initialvalues = {
  email: "",
  password: "",
  fullName: "",
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
        className="flex flex-col w-screen h-full p-5 bg-gray-900 rounded-sm lg:h-fit lg:w-fit"
      >
        <h1 className="mb-4 space-y-4 text-2xl font-bold text-red-600">
          New User?
        </h1>
        <div className="w-full p-5 space-y-10 border-4 lg:space-y-2 border-cyan-900 lg:w-fit h-fit">
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

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-primary-dark"
          >
            SignIn
          </button>
        </div>
        <div className="flex text-xl text-red-500">
          <h4>Already have an account ? </h4>
          <Link
            to="/login"
            className="text-xl text-red-500 underline md:text-lg"
          >
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

export default WithUser(EAsySignIn);
