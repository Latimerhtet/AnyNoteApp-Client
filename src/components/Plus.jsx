import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className="bg-fuchsia-600 fixed  lg:bottom-10 lg:right-96 bottom-10 right-10 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-2xl "
    >
      <Tooltip title="Create">
        <IconButton>
          <FaPlus className="text-2xl text-white" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default Plus;
