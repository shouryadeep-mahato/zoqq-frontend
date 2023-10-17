import React from 'react'
import CustomDate from '../../../structure/CustomDate'
import CustomTextField from '../../../structure/CustomText'
import CustomSelect from '../../../structure/CustomSelect'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import { getTodayDate } from '@mui/x-date-pickers/internals'
import { Createinvoice } from '../../js/invoices-function'
import { Createinvoicedoc } from '../../js/invoices-function';
import { toast } from 'react-toastify'


function Details({ setCurrentState,detailsfields,getsendfields,updateddetailsFields,geturl,url,setUrl,parsedCustomerdata }) {debugger
    console.log(detailsfields)
    const [val, setVal] = useState();
    const [invoicenumber,setInvoicenumber]=useState();
    const [invoicenumbererror,setInvoicenumbererror]=useState();
    const [validationErrors, setValidationErrors] = useState({});
    const [description,setDescription]=useState();
    const [descriptionerror,setDescriptionerror]=useState();
    const [invoicedate,setInvoicedate]=useState(dayjs());
    const [duedate,setDuedate]=useState(dayjs());
    const [previewclicked,setPreviewclicked]=useState(false);
    const [loading, setLoading] = useState(false);
    // const [url,setUrl]=useState();
    const options = [
      { value: '$', label: '$' },
      { value: '$', label: '$' }
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
      const handleinvoicenumberchange = (event) => {debugger
        var newValue = event.target.value;
        setInvoicenumber(newValue);
        console.log(newValue)
        if (newValue.trim() === "") {
            setInvoicenumbererror("Invoice number cannot be empty");
            
        } else {
            setInvoicenumbererror("");
            setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const handledescriptionchange = (event) => {debugger
        var newValue = event.target.value;
        setDescription(newValue);
        console.log(newValue)
        if (newValue.trim() === "") {
            setDescriptionerror("Invoice Description cannot be empty");
            
        } else {
            setDescriptionerror("");
            setValidationErrors(""); // Clear the error message
        }
        //onDateChange(newDate);
      };
      const handleinvoicechange = (defaultValue) => {
        setInvoicedate(defaultValue);
        console.log(defaultValue)
        //onDateChange(newDate);
      };
      const handleduedatechange = (defaultValue) => {
        setDuedate(defaultValue);
        console.log(defaultValue)
        //onDateChange(newDate);
      };
      const validateForm = () => {debugger
        const errors = {};
        const invoivenumber = document.getElementById("invoicenumber").value;
        const description = document.getElementById("description").value;
        const Invoicedate = dayjs(invoicedate).format('YYYY-MMM-DD');
        const dueDate =  dayjs(duedate).format('YYYY-MMM-DD');
        // const currency =val !== undefined && val !== null ? val : '';

        // Implement your validation logic here
        if (invoivenumber=='') {
            errors.invoivenumber = 'Invoice number is required.';
        }
        if (description=='') {
            errors.description = 'Invoice description is required.';
        }
  if (!Invoicedate || !dayjs(Invoicedate).isValid()) {
    errors.Invoicedate = "Invalid invoice date.";
  }

  // Validate due date
  if (!dueDate || !dayjs(duedate).isValid()) {
    errors.dueDate = "Invalid due date.";
  }

        // You can add more validation rules as needed

        return errors;
    };
    const handleNextTosend = () => {debugger
        var company =sessionStorage.getItem("internalBusinessId")
        
        if(previewclicked){
        const updateddetailsFields = {
            
          ...detailsfields, // Keep the existing data
          Invoicenumber:document.getElementById('invoicenumber').value, 
          Description:document.getElementById('description').value,
          Createdby:'Pabitra',
          RecipientName:parsedCustomerdata.customerName,
          CompanyId: company,
          filename:document.getElementById('invoicenumber').value+".pdf",
          header:'Invoice',
          template:'Invoice',
          returntype:'url',
          address1:parsedCustomerdata.address1,
          address2:parsedCustomerdata.address2,
          invoiceDate:dayjs(invoicedate).format('YYYY-MMM-DD'),
          dueDate: dayjs(duedate).format('YYYY-MMM-DD'),
          Imageurl:url

        };
        Createinvoice(updateddetailsFields,setCurrentState,parsedCustomerdata)
    
        // Call the function from props to pass data to Review component
        getsendfields(updateddetailsFields);
    }
    else{
        toast.error("Please check preview first")
    }
      };

      const previewclick = () =>{
        const errors = validateForm();
    
        var company =sessionStorage.getItem("internalBusinessId")
        if (Object.keys(errors).length === 0) {
            setLoading(true); 
            // setCurrentState("send");
            setPreviewclicked(!previewclicked)
        const updateddetailsFields = {
            
            ...detailsfields, // Keep the existing data
            Invoicenumber:document.getElementById('invoicenumber').value, 
            Description:document.getElementById('description').value,
            Createdby:'Pabitra',
            RecipientName:parsedCustomerdata.customerName,
            CompanyId:company,
            filename:document.getElementById('invoicenumber').value+'.pdf',
            header:'Invoice',
            template:'Invoice',
            returntype:'url',
            address1:parsedCustomerdata.address1,
            address2:parsedCustomerdata.address2,
            invoiceDate:dayjs(invoicedate).format('YYYY-MMM-DD'),
            dueDate: dayjs(duedate).format('YYYY-MMM-DD'),
            customeremail: parsedCustomerdata.customerEmail
  
          };

          const wrapper = async () => {
            const response = await Createinvoicedoc(updateddetailsFields);
            setUrl(response);
            setLoading(false); 
          }

          wrapper();
        } else {
            setValidationErrors(errors);
        }
       
          
        //   .then((fetchedData) => {
        //     if(fetchedData)
        //         setUrl(fetchedData)
            
        //   });
        

      }
      const handleNextClick = () => {debugger
        const errors = validateForm();
    
        if (Object.keys(errors).length === 0) {
            // setCurrentState("send");
            handleNextTosend();
        } else {
            setValidationErrors(errors);
        }
    };
    
    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-normal'>1. Items</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-500'>2. Details</p>
                <img src="/payments/lineH_pending.svg" />
                <p className='m-0 mx-3 grey1 fw-normal'>3. Send</p>
            </div>

            <div className='opacity-50 m-3' onClick={() => setCurrentState("items")} role='button'>
                <img src='/arrows/arrowLeft.svg' width={10} />
                &nbsp; back
            </div>

            <div className='d-flex'>
                <div className='d-flex border-bottom mb-4 w-50 me-2'>
                    <div className='d-flex'>
                        <img src="/payments/requestNumber.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        {/* <CustomTextField label="Invoice Number" className="w-100" /> */}
                        <TextField
                        id='invoicenumber'
                        label="Invoice Number"
            
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
            defaultValue=''
            onChange={handleinvoicenumberchange}
            className="w-100"
        />
        {invoicenumbererror && <span className="text-danger">{invoicenumbererror}</span>}
        {validationErrors.invoivenumber && <span className='text-danger'>{validationErrors.invoivenumber}</span>}
                    </div>
                </div>

                <div className='d-flex border-bottom mb-4 w-50 ms-2'>
                    <div className='d-flex'>
                        <img src="/payments/money.svg" width={40} className='border-end my-auto px-2' />
                    </div>
                    <div className="input-group containertext w-100 h-100">
                        {/* <CustomTextField label="Description" /> */}
                        <TextField
                        id='description'
                        label="Invoice Description"
            
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
            defaultValue=''
            onChange={handledescriptionchange}
            className="w-100"
        />
        {descriptionerror && <span className="text-danger">{descriptionerror}</span>}
        {validationErrors.description && <span className='text-danger'>{validationErrors.description}</span>}
 
                    </div>
                </div>
            </div>

            <div className='d-flex'>
                {/* <CustomDate className="border-bottom w-50 me-2" label="Invoice Date" /> */}
                <DatePicker label="Invoice Date"  defaultValue={dayjs(invoicedate)}  views={['year', 'month', 'day']} format="YYYY-MMM-DD" onChange={handleinvoicechange} />
                <DatePicker label="Due Date" defaultValue={dayjs(duedate)}  views={['year', 'month', 'day']} format="YYYY-MMM-DD" onChange={handleduedatechange} />
            </div>

            <div className='d-flex justify-content-between mt-5'>
                <div>
                    <button className='btn fw-500 green100 border me-2 py-2 rounded-4'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2 py-2 rounded-4'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 blue100 border me-2 py-2 rounded-4' onClick={previewclick} disabled={loading}>
 
    {loading ? (
      <>Loading...</>
    ) : (
      <>
        Preview
        <img src='/expense/preview.svg' className='me-2' />
      </>
    )}
  
</button>
                </div>

                <div>
                    <button className='btn fw-500 bg-green100 text-white py-2 rounded-4' onClick={handleNextClick}>Create Invoice &gt;</button>
                </div>
            </div>
            {/* {url && (
                <iframe src={url}width="100%" height="400" title="Preview"></iframe>
            )} */}
        </div>
    )
}

export default Details