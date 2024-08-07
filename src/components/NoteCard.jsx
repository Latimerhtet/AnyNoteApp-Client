import React from "react";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";
const NoteCard = () => {
  return (
    <section className="w-2/5 border-t-2 border-fuchsia-600 shadow-lg p-4 rounded-md">
      <p className="text-xl font-bold mb-1">Lorem ipsum dolor sit.</p>
      <hr />
      <p className="text-sm mt-1 mb-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
        nulla sequi asperiores. Ad officiis magni magnam assumenda doloremque
        saepe facere, molestiae eveniet in voluptas autem! Optio nemo amet
        aliquid praesentium?
      </p>
      <hr />
      <div className="flex pt-3 gap-5 justify-end">
        <FaEye className="text-3xl cursor-pointer text-fuchsia-600 p-1.5 hover:bg-slate-300 rounded-full " />
        <Link to={"/edit/:id"}>
          <MdEdit className=" text-3xl cursor-pointer  text-fuchsia-600 p-1.5 hover:bg-slate-300 rounded-full" />
        </Link>
        <IoTrash className="text-3xl cursor-pointer text-red-600 p-1.5 hover:bg-slate-300 rounded-full" />
      </div>
    </section>
  );
};

export default NoteCard;
