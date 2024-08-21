import React, { useContext, useEffect, useState } from "react";
import NoteFrom from "../components/NoteFrom";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { isTokenAuthorized } from "../../utils/isLogin";

const Edit = () => {
  const { token } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const getNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`);
    const data = await response.json();
    setData(data);
    // if (token.userId !== data.author) {
    //   setRedirect(true);
    // }
    const isAuthorized = await isTokenAuthorized(data.author).then((result) => {
      console.log(result.ok);
      if (result.ok === false) {
        setRedirect(true);
      }
    });

    console.log("this is from edit page");
    console.log(data.author);
  };

  useEffect(() => {
    getNote();
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <NoteFrom isCreate={false} editNote={data} />
    </div>
  );
};

export default Edit;
