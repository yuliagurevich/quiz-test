import React from "react";

const labeledRadioInput = ({ id, name, value, currentValue, onChange }) => {
    return (
        <div className="radio-item">
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={value === currentValue}
                onChange={onChange}
            />
            <label htmlFor={id}>{value}</label>
        </div>
    );
};

export default labeledRadioInput;
