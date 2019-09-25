import React from "react";

import "./style.css";

const button = ({ text, isDisabled, ...props }) => {
  return (
    <button className="button" disabled={isDisabled} {...props}>
      {text}
    </button>
  );
};

export default button;
