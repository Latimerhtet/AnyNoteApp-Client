import React, { useEffect, useState } from "react";
import NoteFrom from "../components/NoteFrom";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const getNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`);
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <div>
      <NoteFrom isCreate={false} editNote={data} />
    </div>
  );
};

export default Edit;
