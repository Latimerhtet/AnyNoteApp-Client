import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Create from "../pages/Create";
const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="bg-fuchsia-600 fixed bottom-5 right-8 p-4 rounded-full cursor-pointer shadow-lg hover:shadow-2xl "
    >
      <FaPlus className="text-2xl text-white" />
    </Link>
  );
};

export default Plus;
