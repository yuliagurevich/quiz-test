import React from "react";

import "./style.css";

const Button = ({ text, isDisabled, ...props }) => {
  return (
    <button className="button" disabled={isDisabled} {...props}>
      {text}
    </button>
  );
};

export default Button;
