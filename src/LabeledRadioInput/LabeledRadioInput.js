import React from "react";

const labeledRadioInput = ({ id, name, value, currentValue, onRadioChange }) => {
  return (
    <div className="radio-item">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={value === currentValue}
        onChange={onRadioChange}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default labeledRadioInput;
