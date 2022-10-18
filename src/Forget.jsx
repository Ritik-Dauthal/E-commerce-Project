import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";
import FancyInput from "./FancyInput";

function callForgetApi(values) {
  console.log(
    "sending data",
    values.email,
    values.Newpassword,
    values.Confirm_password
  );
}

const Schemaforget = Yup.object().shape({
  email: Yup.string().email().required(),
  Newpassword: Yup.string().min(8).required(),
  Confirm_password: Yup.string().min(8).required(),
});

const InitialValues = {
  email: "",
  Newpassword: "",
  Confirm_password: "",
};
export function Forget({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
}) {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-screen h-full p-5 bg-gray-900 rounded-sm lg:h-fit lg:w-fit "
      >
        <h1 className="mb-4 space-y-4 text-2xl text-red-500">
          Forget Password ?
        </h1>
        <div className="w-full p-5 space-y-10 border-4 lg:space-y-2 border-cyan-900 lg:w-fit h-fit">
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

          <Input
            values={values.Newpassword}
            errors={errors.Newpassword}
            touched={touched.Newpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            name="Newpassword"
            type="password"
            id="Newpassword"
            required
            autoComplete="password"
            placeholder="Enter New Password"
          />

          <FancyInput
            values={values.Confirm_password}
            errors={errors.Confirm_password}
            touched={touched.Confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="Confirm_password"
            type="password"
            id="Confirm_password"
            required
            autoComplete="password"
            placeholder="Enter Password Again"
          />

          <button type="submit" className="flex text-xl text-red-500">
            Submit
          </button>
        </div>
        <div>
          <Link
            to="/login"
            className="text-xl text-red-500 underline md:text-lg"
          >
            Back to Login{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}
const myHoc = withFormik({
  validationSchema: Schemaforget,
  initialValues: InitialValues,
  handleSubmit: callForgetApi,
});

const EasyForget = myHoc(Forget);
export default EasyForget;
