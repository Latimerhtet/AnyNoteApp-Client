import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <section className="max-w-4xl mx-auto  ">
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Main;
