import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import isTokenAuthenticate from "../../utils/isLogin";
const Navbar = () => {
  const { token, updatedToken } = useContext(UserContext);

  const signOutHandler = () => {
    updatedToken(null);
    window.location.reload();
  };

  return (
    <nav className="m-8 flex gap-4 justify-between items-center">
      <h1 className="font-bold w-1/4 text-2xl text-fuchsia-600">
        <Link to={"/"}>ANYNOTE.io</Link>
      </h1>
      {!token ? (
        <div className="flex gap-5">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to={"/create"}>
            <p className="p-2 border-2 border-fuchsia-600 text-fuchsia-600 rounded-lg transition-all hover:bg-fuchsia-600 hover:text-white">
              Share Note
            </p>
          </Link>
          <button
            className="p-2 border-2 border-fuchsia-600 text-fuchsia-600 rounded-lg transition-all hover:bg-fuchsia-600 hover:text-white"
            onClick={signOutHandler}
          >
            Sign out
          </button>
        </div>
      )}

      {/* <input
        type="text"
        className="p-2 w-3/4  border-2 border-fuchsia-600 placeholder:text-fuchsia-600 outline-none rounded-md"
        placeholder="Search note..."
      /> */}
    </nav>
  );
};

export default Navbar;
