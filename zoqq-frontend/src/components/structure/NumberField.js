import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function NumberField(props) {
    const { className, readOnly, value, setValue } = props;
    const [inputValue, setInputValue] = useState(value || '');
    const regexPattern = /^\d+(\.{1})?(\d{1,2})?$/;

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (regexPattern.test(inputValue) || !inputValue) {
            setInputValue(inputValue);
            setValue(inputValue);
        }
    };

    const inputStyle = {
        fontWeight: 500, // Add fontWeight style here
    };

    return (
        <TextField
            {...props}
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            className={className}
            InputProps={{
                readOnly,
                style: inputStyle, // Apply the style here
            }}
        />
    );
}

export default NumberField;
