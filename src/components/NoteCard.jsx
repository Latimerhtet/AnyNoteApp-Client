import React, { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoTrash } from "react-icons/io5";
import { Link } from "react-router-dom";
import { formatISO } from "date-fns";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import NoteDetail from "./NoteDetail";
import { UserContext } from "../contexts/UserContext";

const NoteCard = ({ note, getNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const { title, content, createdAt, _id } = note;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const formatedDate = formatISO(createdAt, { representation: "date" });

  const deleteNote = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    if (response.status === 204) {
      getNotes();
      customAlert("Deleted Successfully!");
    }
  };
  return (
    <section className="w-[250px] h-fit border-t-2 border-fuchsia-600 shadow-lg p-4 rounded-md">
      <p className="text-xl font-bold mb-1">{title}</p>
      <hr />
      <p className="text-sm mt-1 mb-2">{content.substr(0, 50)}</p>
      <hr />
      <p className="text-sm  font-bold pt-2">{formatedDate}</p>
      <div className="flex pt-3 gap-2 justify-end">
        <Tooltip title="See" onClick={handleOpen}>
          <IconButton>
            <FaEye className="text-xl cursor-pointer text-fuchsia-600  " />
          </IconButton>
        </Tooltip>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <NoteDetail note={note} />
        </Backdrop>

        <Link to={`/edit/${_id}`}>
          <Tooltip title="Edit">
            <IconButton>
              <MdEdit className=" text-xl cursor-pointer  text-fuchsia-600 " />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="Delete" onClick={deleteNote}>
          <IconButton>
            <IoTrash className="text-xl cursor-pointer text-red-600 " />
          </IconButton>
        </Tooltip>
      </div>
    </section>
  );
};

export default NoteCard;
