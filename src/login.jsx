import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import FancyInput from "./FancyInput";
import Input from "./Input";
import axios from "axios";
import { WithUser, AlertUser } from "./WithProvider";

function callLoginApi(values, bag) {
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      bag.props.setuser(user);
      bag.props.SetAlert({ type: "success", message: "Welcome user 🤗" });
    })
    .catch(() => {
      bag.props.SetAlert({ type: "failed", message: "Invalid Data 😕" });
    });
}

const Schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

const initialValues = {
  email: "",
  password: "",
};
export function Login({
  handleSubmit,
  handleBlur,
  handleChange,
  touched,
  errors,
  values,
}) {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-screen h-full p-5 bg-gray-900 rounded-sm lg:h-fit lg:w-fit "
      >
        <h1 className="mb-4 space-y-4 text-2xl font-bold text-red-600">
          Login
        </h1>
        <div className="p-4 space-y-10 border-4 lg:space-y-2 border-cyan-800 h-fit">
          <Input
            values={values.email}
            errors={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email-address"
          />

          <FancyInput
            values={values.password}
            errors={errors.password}
            touched={touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            placeholder="Password"
          />

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-primary-dark "
          >
            Login
          </button>
          <Link
            to="/forget"
            className="text-xl text-red-500 underline md:text-lg"
          >
            forget password?
          </Link>
        </div>
        <div className="flex text-xl text-red-500">
          <h4>Already have an account ?</h4>
          <Link
            to="/signup"
            className="text-xl text-red-500 underline md:text-lg"
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
}
const myHoc = withFormik({
  validationSchema: Schema,
  initialValues: initialValues,
  handleSubmit: callLoginApi,
});

const EasyLogin = myHoc(Login);

export default AlertUser(WithUser(EasyLogin));
