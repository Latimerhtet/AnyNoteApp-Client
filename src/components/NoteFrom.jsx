import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import StyledErrMsg from "./StyledErrMsg";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteFrom = ({ isCreate, editNote }) => {
  const initialValues = {
    title: editNote.title || "",
    content: editNote.content || "",
  };
  console.log(initialValues.title);

  const [redirect, setRedirect] = useState(false);

  // Note form validate schema
  const noteFormSchema = yup.object({
    title: yup
      .string()
      .min(3, "title is too short")
      .max(20, "title is too long")
      .required("title is required!"),
    content: yup.string().required("Content is required!"),
  });

  // form submit function
  const submit = async (values) => {
    if (isCreate) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        setRedirect(true);
      } else {
        toast("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: "Bounce",
        });
      }
    } else if (!isCreate) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/edit/${editNote._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.status === 201) {
        setRedirect(true);
      }
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="p-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold ">
          {isCreate ? "Create a Note " : "Edit your note"}
        </h2>
        <Link
          to={"/"}
          className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full"
        >
          <MdOutlineArrowBackIosNew />
        </Link>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={noteFormSchema}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-3 mb-4">
              <label htmlFor="title">Note Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              />
              <StyledErrMsg name="title" />
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <label htmlFor="content">Note Content</label>
              <Field
                as="textarea"
                rows={10}
                type="text"
                id="content"
                name="content"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              ></Field>
              <StyledErrMsg name="content" />
            </div>
            <button
              type="submit"
              className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteFrom;
