import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import StyledErrMsg from "./StyledErrMsg";
import * as yup from "yup";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { Alert, IconButton, Slide, Snackbar, Tooltip } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const NoteFrom = ({ isCreate, editNote }) => {
  const fileRef = useRef();
  const initialValues = {
    title: (editNote && editNote.title) || "",
    content: (editNote && editNote.content) || "",
    profile_img:
      !isCreate && editNote.profile_img ? editNote.profile_img : null,
  };
  const { token, setSeverity, setSnackBarMsg, setSnackBarOpen } =
    useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [fileImg, setFileImg] = useState(null);
  const [saving, setSaving] = useState(false);

  // format for images
  const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
  // Note form validate schema
  const noteFormSchema = yup.object({
    title: yup
      .string()
      .min(3, "title is too short")
      .max(100, "title is too long")
      .required("title is required!"),
    content: yup.string().required("Content is required!"),
    profile_img: yup
      .mixed()
      .nullable()
      .test("fileFormat", "File is not supported", (value) => {
        if (value) {
          const supportedFormats = ["jpg", "png", "jpeg"];
          return supportedFormats.includes(
            value.name ? value.name.split(".").pop() : value.split(".").pop()
          );
        }
        return true;
      }),
  });

  // file input handle function
  const handleFileInput = (event, setFieldValue) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileImg(URL.createObjectURL(selectedFile));
      setFieldValue("profile_img", selectedFile);
    }
  };

  // removing file input
  const removeFileImg = (setFieldValue) => {
    setFileImg(null);
    setFieldValue("profile_img", null);
    fileRef.current.value = "";
  };

  // form submit function
  const submit = async (values) => {
    setSaving(true);
    let APIURL;
    if (isCreate) {
      APIURL = `${import.meta.env.VITE_API_URL}/create`;
    } else {
      APIURL = `${import.meta.env.VITE_API_URL}/edit/${editNote._id}`;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("profile_img", values.profile_img);

    const response = await fetch(APIURL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.status === 201) {
      setSeverity("success");
      setSnackBarMsg("Created Successfully");
      setSnackBarOpen(true);
      setRedirect(true);
    } else {
      setSeverity("error");
      setSnackBarMsg("Something went wrong!");
      setSnackBarOpen(true);
    }
    setSaving(false);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="p-8 mb-10">
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
        {({ values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="flex flex-col gap-3 mb-4">
              <label htmlFor="title" className="font-bold">
                Note Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
              />
              <StyledErrMsg name="title" />
            </div>
            <div className="flex flex-col gap-3 mb-4 items-start">
              <label htmlFor="profile_img" className="font-bold">
                Cover Image <span className="font-medium">(Optional)</span>
              </label>
              <input
                type="file"
                id="profile_img"
                name="profile_img"
                hidden
                ref={fileRef}
                onChange={(e) => handleFileInput(e, setFieldValue)}
              />
              <div className="flex gap-5 items-start">
                <div
                  type="button"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                  className="cursor-pointer relative p-8 px-12 flex gap-3 items-center border-2 border-dashed border-fuchsia-600 text-fuchsia-600 rounded-lg "
                >
                  <span className="flex gap-3 items-center font-extrabold z-50">
                    <CloudUploadIcon />
                    Upload
                  </span>
                  {isCreate ? (
                    <>
                      {fileImg && (
                        <img
                          src={fileImg}
                          className="absolute top-0 left-0 h-full w-full opacity-40 object-cover   z-0"
                          alt="selected image"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {editNote.profile_img ? (
                        <img
                          src={
                            fileImg
                              ? fileImg
                              : `${import.meta.env.VITE_API_URL}/${
                                  editNote.profile_img
                                }`
                          }
                          className="absolute top-0 left-0 h-full w-full opacity-40 object-cover   z-0"
                          alt="selected image"
                        />
                      ) : (
                        fileImg && (
                          <img
                            src={fileImg}
                            className="absolute top-0 left-0 h-full w-full opacity-40 object-cover   z-0"
                            alt="selected image"
                          />
                        )
                      )}
                    </>
                  )}
                </div>
                {fileImg && (
                  <Tooltip title="remove">
                    <IconButton
                      type="button"
                      className="text-xl"
                      onClick={() => removeFileImg(setFieldValue)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <StyledErrMsg name="profile_img" />
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <label htmlFor="content" className="font-bold">
                Note Content
              </label>
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
            {saving ? (
              <button
                className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md"
                disabled={saving}
              >
                Saving...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-fuchsia-600 p-3 text-white w-1/3 float-end font-bold rounded-md"
              >
                {isCreate ? "Save note" : "Update note"}
              </button>
            )}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteFrom;
