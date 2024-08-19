import React, { useContext, useState } from "react";

// import for validation with formik
import { Formik, Form, Field } from "formik";
import StyledErrMsg from "./StyledErrMsg";
import * as yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { Alert, Fade, Snackbar } from "@mui/material";
import { UserContext, UserContextProvider } from "../contexts/UserContext";
const AuthForm = ({ isLogin }) => {
  const { token, updatedToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = yup.object({
    username: isLogin
      ? null
      : yup
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

  const authSubmit = async (values) => {
    const { username, email, password } = values;
    setSubmitting(true);

    let url = `${import.meta.env.VITE_API_URL}/register`;
    let userData = { username, email, password };

    if (isLogin) {
      url = `${import.meta.env.VITE_API_URL}/login`;
      userData = { email, password };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.status === 201) {
      setSubmitting(false);
      setRedirect(true);
    } else if (response.status === 200) {
      console.log(data);
      updatedToken(data);
      setSubmitting(false);
      setRedirect(true);
    } else if (response.status === 401) {
      setSubmitting(false);
      setSnackBarOpen(true);
      setSnackBarMsg(data.message);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 2000);
    } else {
      setSubmitting(false);
      setSnackBarOpen(true);
      setSnackBarMsg(data.errorsMsg[0].msg);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 2000);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

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
            {!isLogin && (
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
            )}

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
              {submitting ? (
                <button className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md disabled:text-lime-500-600  ">
                  Submitting...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md"
                >
                  {isLogin ? "Login" : "Register"}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        TransitionComponent={Fade}
        key={Fade}
        autoHideDuration={1200}
      >
        <Alert severity="error">{snackbarMsg}</Alert>
      </Snackbar>
    </section>
  );
};

export default AuthForm;
