import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="m-8 flex gap-4 justify-between items-center">
      <h1 className="font-bold w-1/4 text-2xl text-fuchsia-600">
        <Link to={"/"}>ANYNOTE.io</Link>
      </h1>
      <div className="flex gap-5">
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>

      {/* <input
        type="text"
        className="p-2 w-3/4  border-2 border-fuchsia-600 placeholder:text-fuchsia-600 outline-none rounded-md"
        placeholder="Search note..."
      /> */}
    </nav>
  );
};

export default Navbar;
