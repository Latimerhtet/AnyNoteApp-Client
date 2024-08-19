import React from "react";
import { formatISO } from "date-fns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Person3Icon from "@mui/icons-material/Person3";
const NoteDetail = ({ note }) => {
  const { title, content, createdAt, profile_img, author } = note;
  return (
    <section className="bg-white text-fuchsia-600 w-1/3 p-10 rounded-md border-t-4 border-fuchsia-600  ">
      {profile_img && (
        <img
          src={`${import.meta.env.VITE_API_URL}/${profile_img}`}
          alt="cover-img"
          className="mb-5 w-full"
        />
      )}

      <p className="text-xl font-bold mb-4 flex gap-3">
        <ModeRoundedIcon />
        {title}
      </p>
      <p className="flex gap-2 mb-4">
        <Person3Icon />
        <p className=" font-bold">{author.username}</p>
      </p>
      <p className="mb-5  ">{content}</p>
      <p className="text-black text-sm font-bold flex items-center gap-3">
        <CalendarMonthIcon />
        {formatISO(createdAt, { representation: "date" })}
      </p>
    </section>
  );
};

export default NoteDetail;
