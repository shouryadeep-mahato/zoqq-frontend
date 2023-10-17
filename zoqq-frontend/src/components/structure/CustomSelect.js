import React from 'react';
import Select from 'react-select';

function CustomSelect(props) {
    const { options, placeholder, multiple, setValue } = props;

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                border: 'none',
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 2,
        }),
    };

    const handleChange = (selectedOptions) => {
        if (multiple) {
            // For multi-select, extract an array of values
            const selectedValues = selectedOptions.map((option) => option.value);
            setValue(selectedValues);
        } else {
            // For single-select, directly set the value
            setValue(selectedOptions.value);
        }
    };

    return (
        <div className='w-100 border-0'>
            <Select
                {...props}
                styles={customStyles}
                options={options}
                placeholder={placeholder || '--SELECT--'}
                isMulti={multiple}
                onChange={handleChange} // Use the handleChange function
            />
        </div>
    );
}

export default CustomSelect;
