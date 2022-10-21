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
    <>
      <div>
        <section className="bg-gray-500 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Signup
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
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
                      name="email"
                      type="email"
                      id="email-address"
                      required
                      autoComplete="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>

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
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>

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

                  <button
                    type="submit"
                    className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Signup
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Alredy have an account?
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
const myHoc = withFormik({
  initialvalues: initialvalues,
  validationSchema: SignupSchema,
  handleSubmit: callSignupApi,
});
const EAsySignIn = myHoc(Signup);

export default WithUser(EAsySignIn);
