import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <section>
      <p>Please Login First</p>
      <Link to={"/login"}>Login </Link>
    </section>
  );
};

export default Unauthorized;
