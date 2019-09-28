import React from 'react';

import './style.css';

const labeledCheckboxInput = ({ id, name, value, currentValue, onChange }) => {
    return (
        <div className="radio-item">
            <input
                id={id}
                type="checkbox"
                name={name}
                value={value}
                checked={currentValue === null ? false : currentValue.includes(value)}
                onChange={onChange}
            />
            <label htmlFor={id}>{value}</label>
        </div>
    );
}

export default labeledCheckboxInput;