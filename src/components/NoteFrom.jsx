import React from "react";
import { Form, Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
const NoteFrom = ({ isCreate }) => {
  return (
    <Form className="p-8">
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
      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="title">Note Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
        />
      </div>
      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="description">Note Description</label>
        <textarea
          rows={10}
          type="text"
          id="description"
          name="description"
          className="border-2 border-fuchsia-600 p-2 rounded-md outline-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-fuchsia-600 p-3 text-white w-full font-bold rounded-md"
      >
        Save
      </button>
    </Form>
  );
};

export default NoteFrom;
