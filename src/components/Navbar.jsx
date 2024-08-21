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
    <nav className="m-8 flex flex-col gap-4 justify-between items-start">
      <div className="w-full flex gap-4 justify-between items-start">
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
      </div>
      {token?.username && (
        <p className="self-end text-fuchsia-600 font-mono">
          Login in as {token.username}
        </p>
      )}
    </nav>
  );
};

export default Navbar;
