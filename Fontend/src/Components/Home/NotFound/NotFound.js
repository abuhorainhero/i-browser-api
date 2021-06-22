import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="my-5 text-center">
      <h3 className="text-danger">This url NoT Found</h3>
      <Link to="/home">Back to Home..!</Link>
    </div>
  );
};

export default NotFound;
