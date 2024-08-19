import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";

const Main = () => {
  const { token } = useContext(UserContext);

  return (
    <section className="max-w-4xl mx-auto  ">
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Main;
