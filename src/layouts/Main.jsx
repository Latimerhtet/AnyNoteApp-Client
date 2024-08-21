import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import isTokenAuthenticate from "../../utils/isLogin";

const Main = () => {
  const { token, reload, setReload } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    isTokenAuthenticate();
  }, []);
  if (reload) {
    navigate("/");
    window.location.reload();
    setReload(false);
  }
  return (
    <section className="max-w-4xl mx-auto  ">
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Main;
