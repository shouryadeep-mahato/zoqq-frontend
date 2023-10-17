import React from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import CustomTextField from '../../../structure/CustomText'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from 'react-select'

function Transfer({ apiData,setCurrentState,transferFields,getReviewFields }) {debugger
    const [val, setVal] = useState();
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState("");
    const [incomeerror, setIncomeerror] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    console.log(transferFields)
    const options = [
      { value: 'Personal Income', label: 'Personal Income' },
      { value: 'Other Income', label: 'Other Income' }
    ]
    const placeholder =[
        "Source of Income"
    ]
    const styles = {
        underline: {
            '&::before': {
                borderBottom: 'none',
            },
            '&::after': {
                borderBottom: 'none',
            },
        },
    };
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
          zIndex: 2
        })
      };
    const handledescriptionchange = (event) => {debugger
        var newValue = event.target.value;
        setDescription(newValue);
        console.log(newValue)
        if (newValue.trim() === "") {
            setDescriptionError("Description cannot be empty");
            
        } else {
            setDescriptionError("");
          setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const handleincomechange = (event) => {debugger
        var newValue = event.value;
        setVal(newValue);
        console.log(newValue)
        if (newValue === "") {
            setIncomeerror("currency cannot be empty");
        } else {
            setIncomeerror("");
            setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const validateForm = () => {
        const errors = {};
        const description = document.getElementById("description").value;
        // const currency =val !== undefined && val !== null ? val : '';

        // Implement your validation logic here
        if (description=='') {
            errors.description = 'Bill Description is required.';
        }

        if (!val) {
            errors.income = 'Source of Income is required.';
        }

        // You can add more validation rules as needed

        return errors;
    };
  const handleNextClick = () => {debugger
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
        setCurrentState("review");
        handleNextToReview();
    } else {
        setValidationErrors(errors);
    }
};
    const handleNextToReview = () => {
        // Assuming you want to add more data to transferFields
        const updatedTransferFields = {
            
          ...transferFields, // Keep the existing data
          SourceofFunds:val !== undefined && val !== null ? val : '', // Add more fields here
          Description:document.getElementById('description').value,
          Createdby:sessionStorage.getItem("lastemail"),
          RecipientName:sessionStorage.getItem("contactName"),
          CompanyId:sessionStorage.getItem("internalBusinessId")

        };
        
    
        // Call the function from props to pass data to Review component
        getReviewFields(updatedTransferFields);
      };
    
    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-normal'>1. Bill</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-500'>2. Transfer</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>3. Review</p>
            </div>

            <div className='opacity-50 m-3' onClick={() => setCurrentState("bill")} role='button'>
                <img src='/arrows/arrowLeft.svg' width={10} />
                &nbsp; back
            </div>


            <div className='d-flex bg-light border p-3 rounded-3'>
                <div className='fw-normal'>
                    Payment Amount:
                </div>
                <div className='flex-fill text-center'>
                    {transferFields.TotalAmount}
                </div>
            </div>

            <div className='d-flex pt-4'>
                <div className='d-flex border-bottom mb-4 w-50 me-2'>
                    <div className='d-flex'>
                        <img src="/expense/budget.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        {/* <CustomSelect placeholder="Source Of Funds" options={options} setValue={setVal}/> */}
                        <Select styles={customStyles} options={options} placeholder={placeholder || "--SELECT--"}  onChange={handleincomechange} />
                        {incomeerror && <span className="text-danger">{incomeerror}</span>}
                        {validationErrors.income && <span className='text-danger'>{validationErrors.income}</span>}
                    </div>
                </div>

                <div className='d-flex border-bottom mb-4 w-50 ms-2'>
                    <div className='d-flex'>
                        <img src="/expense/reference.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        {/* <CustomTextField id='description' label="Description" className="w-100" /> */}
                        <TextField
                        id='description'
                        label="Description"
            
            InputProps={{
                classes: {
                    underline: styles.underline,
                },
                
            }}
            InputLabelProps={{
                classes: {
                    focused: styles.inputLabel,
                },
            }}
            defaultValue={description} 
            onChange={handledescriptionchange}
            className="w-100"
        />
        {descriptionError && <span className="text-danger">{descriptionError}</span>}
        {validationErrors.description && <span className='text-danger'>{validationErrors.description}</span>}
                    </div>
                </div>
            </div>


            <div className='d-flex align-items-center'>
                <input type="checkbox" class="form-check-input me-2 my-0" id="notify" name="notify" value="true" />
                <label class="form-check-label fw-normal my-0" for="notify">Notify (optional)</label>
            </div>


            <div className='d-flex justify-content-between mt-5'>
                <div>
                    <button className='btn fw-500 green100 border me-2 py-2 rounded-4'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2 py-2 rounded-4'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                </div>

                <div>
                    <button className='btn fw-500 bg-green100 text-white py-2 rounded-4' onClick={handleNextClick}>Next to Details &gt;</button>
                </div> 
            </div>
        </div>
    )
}

export default Transfer