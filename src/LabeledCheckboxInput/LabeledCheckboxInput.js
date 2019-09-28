import React from 'react';

import './style.css';

const labeledCheckboxInput = ({ id, name, value, currentValue, onChange }) => {
    return (
        <div>
            <input
                id
                type="checkbox"
                name
                value
                checked={value === currentValue}
                onChange={onChange}
            />
            <label htmlFor={id}>{value}</label>
        </div>
    );
}

export default labeledCheckboxInput;