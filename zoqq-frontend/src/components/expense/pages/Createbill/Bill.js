import React from 'react'
import CustomDate from '../../../structure/CustomDate'
import CustomTextField from '../../../structure/CustomText'
import CustomSelect from '../../../structure/CustomSelect'
import { useState,useRef,useEffect } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Select from 'react-select'



function Bill({ apiData,setCurrentState,selectedFileName,getUpdatedFields,selectedFileurl }) {
    const [val, setVal] = useState();
    const options = [
      { value: 'USD', label: 'USD' },
      { value: 'SGD', label: 'SGD' },
      { value: 'GBP', label: 'GBP' },
      { value: 'AUD', label: 'AUD' },
      { value: 'EURO', label: 'EURo' },
      { value: 'HKD', label: 'HKD' }
    ]
    const placeholder =[
        "--Select--"
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
    const [billDate, setBillDate] = useState(apiData.InvoiceDate); 
    const [billdueDate, setBilldueueDate] = useState(apiData.dueDate);
    const [billnumber, setBillnumber] = useState(apiData.InvoiceNumber);// Local state to track bill date
    const [billnumberError, setBillnumberError] = useState("");
    const [billdateerror, setBilldateerror] = useState("");
    const [currencyerror, setCurrencyerror] = useState("");
    const [amounterror, setAmounterror] = useState("");
    
    const handleBillDateChange = (defaultValue) => {
        setBillDate(defaultValue);
        console.log(defaultValue)
        //onDateChange(newDate);
      };
      const handleDueDateChange = (defaultValue) => {
        setBilldueueDate(defaultValue);
        console.log(defaultValue)
        //onDateChange(newDate);
      };
      const handlebillnumberchange = (event) => {debugger
        var newValue = event.target.value;
        setBillnumber(newValue);
        console.log(newValue)
        if (newValue.trim() === "") {
            setBillnumberError("Bill number cannot be empty");
            
        } else {
          setBillnumberError("");
          setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const handleamountchange = (event) => {debugger
        var newValue = event.target.value;
        setBillnumber(newValue);
        console.log(newValue)
        if (newValue.trim() === "") {
            setAmounterror("Amount cannot be empty");
            
        } else {
            setAmounterror("");
          setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const handlecurrencychange = (event) => {debugger
        var newValue = event.value;
        setVal(newValue);
        console.log(newValue)
        if (newValue === "") {
            setCurrencyerror("currency cannot be empty");
        } else {
            setCurrencyerror("");
            setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };

    const billDateRef = useRef(billDate);
  const dueDateRef = useRef(null);
  useEffect(() => {
    console.log('log1', billDateRef.current);
    setBillDate
  });
  const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {debugger
        const errors = {};
        const billnumber = document.getElementById("billnumber").value;
        const totalAmount = document.getElementById("totalAmount").value;
        const billdate = dayjs(billDate).format('YYYY-MMM-DD');
        const dueDate =  dayjs(billdueDate).format('YYYY-MMM-DD');
        const currency =val !== undefined && val !== null ? val : '';

        // Implement your validation logic here
        if (billnumber=='') {
            errors.billnumber = 'Bill number is required.';
        }

        if (!val) {
            errors.currency = 'Currency is required.';
        }
        if (totalAmount=='') {
            errors.amounterror = 'Amount is required.';
        }

         // Validate bill date
  if (!billdate || !dayjs(billDate).isValid()) {
    errors.billdate = "Invalid bill date.";
  }

  // Validate due date
  if (!dueDate || !dayjs(billdueDate).isValid()) {
    errors.dueDate = "Invalid due date.";
  }

        // You can add more validation rules as needed

        return errors;
    };
  const handleNextClick = () => {debugger
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
        const updatedFields = updateFieldValues();
        getUpdatedFields(updatedFields);
        setCurrentState("transfer");
    } else {
        setValidationErrors(errors);
    }
};
  
  
    const updateFieldValues = () => {debugger
        // const [fields, setFields] = useState('');
        const billnumber = document.getElementById("billnumber").value;
        const totalAmount = document.getElementById("totalAmount").value;
        const billdate = dayjs(billDate).format('YYYY-MMM-DD');
        const dueDate =  dayjs(billdueDate).format('YYYY-MMM-DD');
        const currency =val !== undefined && val !== null ? val : '';
        

        // const [state, setState] = useState({to: 'fghjk', from:"fghj"})

        // setState({...state, to:"dfghj"})
        const updatedFields = {
            Billnumber: billnumber,
            TotalAmount: totalAmount,
            Billdate: billdate,
            Duedate: dueDate,
            currency: currency,
            Imageurl: selectedFileurl,
          };
       
        // setFields(updatedFields)
    
        return updatedFields;
      };
    
    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-500'>1. Bill</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>2. Transfer</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>3. Review</p>
            </div>

            <div className='d-flex bg-light align-items-center border rounded-3 p-3 my-3'>
                <div>
                    <img src='/expense/pdf.svg' />
                </div>
                <div className='flex-fill mx-3'>
                    {selectedFileName}
                </div>
                {/* <div className='blue100 bg-white border btn fw-500 py-2 px-3 rounded-4'>
                    <img src='/expense/preview.svg' className='me-2' />
                    Preview
                </div> */}
            </div>

            <div className='d-flex'>
                <div className='d-flex border-bottom mb-4 w-50 me-2'>
                    <div className='d-flex'>
                        <img src="/payments/requestNumber.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        {/* <CustomTextField label="Bill Number" id='billnumber' value={apiData.InvoiceNumber} className="w-100" /> */}
                        <TextField
                        id='billnumber'
                        placeholder='Bill Number'
            
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
            defaultValue={billnumber} 
            onChange={handlebillnumberchange}
            className="w-100"
        />
        {billnumberError && <span className="text-danger">{billnumberError}</span>}
          {validationErrors.billnumber && <span className='error'>{validationErrors.billnumber}</span>}
                    </div>
                </div>

                <div className='d-flex border-bottom mb-4 w-50 ms-2'>
                    <div className='d-flex'>
                        <img src="/payments/money.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                    <div className="w-50 h-25">
                            {/* <CustomSelect placeholder="$" id='currency' options={options} setValue={setVal}/> */}
                            <Select styles={customStyles} defaultValue='SGD'  options={options} placeholder={placeholder || "--SELECT--"}  onChange={handlecurrencychange} />
                        </div>
                        {/* <CustomTextField id='totalAmount' value={apiData.TotalAmount} className="w-50" /> */}
                        <TextField
                        id='totalAmount'
                        placeholder='Bill Amount'
            
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
            defaultValue={apiData.TotalAmount} 
            onChange={handleamountchange}
            className="w-50"
        />
        {amounterror && <span className="text-danger">{amounterror}</span>}
        {validationErrors.amounterror && <span className='text-danger'>{validationErrors.amounterror}</span>}
                        {currencyerror && <span className="text-danger">{currencyerror}</span>}
                        {validationErrors.currency && <span className='text-danger'>{validationErrors.currency}</span>}
                    </div>
                </div>
            </div>

            <div className='d-flex'>
            
            <DatePicker defaultValue={dayjs(billDate)}  views={['year', 'month', 'day']} format="YYYY-MMM-DD" onChange={handleBillDateChange} /> 
            {validationErrors.billdate && <span className='text-danger'>{validationErrors.billdate}</span>}
            
                <DatePicker defaultValue={dayjs(billdueDate)}  views={['year', 'month', 'day']} format="YYYY-MMM-DD" onChange={handleDueDateChange} /> 
            {validationErrors.dueDate && <span className='text-danger'>{validationErrors.dueDate}</span>}
            </div>

            <div className='d-flex justify-content-between mt-5'>
                <div>
                    <button className='btn fw-500 green100 border me-2 rounded-4 py-2 h-100'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2 rounded-4 py-2 h-100'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                </div>

                <div>
                    <button className='btn fw-500 bg-green100 text-white py-2 rounded-4 h-100' onClick={handleNextClick}>Next to Transfers &gt;</button>
                </div>
            </div>
        </div>
    )
}

export default Bill