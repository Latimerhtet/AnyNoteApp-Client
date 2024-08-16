import React from "react";
import { ErrorMessage } from "formik";
const StyledErrMsg = ({ name }) => {
  return (
    <div className="text-red-600 font-mono text-sm">
      <ErrorMessage name={name} />
    </div>
  );
};

export default StyledErrMsg;
