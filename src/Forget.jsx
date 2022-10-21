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
    <div>
      <section className="bg-gray-500 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forget Password ?
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
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
                </div>
                <div>
                  <label
                    htmlFor="Newpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>

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
                </div>
                <div>
                  <label
                    htmlFor="Confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>

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
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>

                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Back to Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
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
