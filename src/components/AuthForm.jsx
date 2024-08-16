import React from "react";

// import for validation with formik
import { Formik, Form, Field } from "formik";
import StyledErrMsg from "./StyledErrMsg";
import * as yup from "yup";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const authSubmit = (values) => {
    console.log(values);
  };
  const authFormSchema = yup.object({
    username: yup
      .string()
      .min(3, "username is too short!")
      .max(50, "username is too long")
      .required("Username is required"),
    email: yup.string().email("Invalid Email").required("Email is required!"),
    password: yup
      .string()
      .lowercase("All the characters must be lowercase")
      .min(4, "Must be at least 4 characters")
      .required("Password is required!"),
  });
  return (
    <section className="p-3 mb-10 flex flex-col items-center gap-5">
      <p className="text-xl font-bold">
        {isLogin ? "Login to your account" : "Register your account"}
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={authSubmit}
        validationSchema={authFormSchema}
      >
        {({ values, errors }) => (
          <Form className="w-3/5">
            {/* Username */}
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              />
              <StyledErrMsg name="username" />
            </div>

            {/* email */}
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              />
              <StyledErrMsg name="email" />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="password" className="font-bold">
                password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              />
              <StyledErrMsg name="password" />
            </div>
            <div>
              {isLogin ? (
                <Link className="hover:underline text-sm" to={"/Register"}>
                  Don't have an account?
                </Link>
              ) : (
                <Link className="hover:underline text-sm" to={"/login"}>
                  Already have an account?
                </Link>
              )}
              <button
                type="submit"
                className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AuthForm;
