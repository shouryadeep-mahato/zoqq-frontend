import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomTextField from '../../../structure/CustomText';
import CustomSelect from '../../../structure/CustomSelect';
// import CustomSelect from './CustomSelect'
import DetailsBar from '../DetailsBar';
import { Createcustomerapi } from '../../js/invoices-function';
import Addinvoicemodal from "../Invoice/Addinvoicemodal.js";




function Createcustomer({setShowNewCustomerModal}) {debugger
    const[isLoading,setIsLoading]=useState(false)
    const closemodal = () => {
        setShowNewCustomerModal(!setShowNewCustomerModal);
      };
    const handleCreateCustomer = ()=>{debugger
        const customername = document.getElementById("customerName").value;
        const customeremail = document.getElementById("customerEmail").value;
        const address1 = document.getElementById("address1").value;
        const address2 = document.getElementById("address2").value;
        const address3 = document.getElementById("address3").value;
        const address4 = document.getElementById("address4").value;
        

        
        const updatedFields = {
            Customername: customername,
            Customeremail: customeremail,
            Companyid:sessionStorage.getItem("internalBusinessId"),
            Address1: address1,
            Address2: address2,
            Address3: address3,
            Address4: address4,
          };
       
        // setFields(updatedFields)
        console.log('updated createcustomer fields',{updatedFields})
    
        setIsLoading(true);
        Createcustomerapi(updatedFields).then((fetchedData) => {
            console.log(fetchedData)
            setIsLoading(false);
            setShowNewCustomerModal(false);
            window.location.href='invoices'
            
            
          });

        
    }  
    
   
   
    return (
        <>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content p-5">
      <div className="d-flex justify-content-between my-2">
        <h5 className="text-dark">Create New Customer</h5>
        <button
          type="button"
          className="btn-close"
          onClick={closemodal}
        />
      </div>

      <div>
        <div className="mb-6">
          <label htmlFor="firstName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            placeholder="Enter Customer Name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="form-label">
            Customer Email
          </label>
          <input
            type="text"
            className="form-control"
            id="customerEmail"
            placeholder="Enter Customer Email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="form-label">
            Address 1
          </label>
          <input
            type="email"
            className="form-control"
            id="address1"
            placeholder="Enter address line 1"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="form-label">
            Address 2
          </label>
          <input
            type="tel"
            className="form-control"
            id="address2"
            placeholder="Enter address line 2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="form-label">
            Address 3
          </label>
          <input
            type="tel"
            className="form-control"
            id="address3"
            placeholder="Enter address line 3"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="form-label">
            Address 4
          </label>
          <input
            type="tel"
            className="form-control"
            id="address4"
            placeholder="Enter Address line 4"
          />
        </div>
        <div className="d-flex justify-content-between my-2"></div>
        
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreateCustomer}
            disabled={isLoading}
            >
                 {isLoading ? 'Loading...' : 'Create Customer '} &gt;
                 </button>
        </div>
      </div>

      <hr className="text-dark mt-0" />
    </div>
  </div>
</>

        // <>
          
        //   <div className="modal-dialog modal-dialog-centered">
        //   <div className="modal-content p-5">
        //     <div className="d-flex justify-content-between my-2">
        //       <h5 className="text-dark">Create New Customer</h5>
        //       <button
        //         type="button"
        //         className="btn-close"
        //         data-bs-dismiss="modal"
        //         aria-label="Close"
        //       />
        //     </div>

           
            

        //     <div className="d-flex align-items-center">
              
        //     </div>

        //     <hr className="text-dark mt-0" />

           
        //   </div>
        // </div>

        // </>

    )
}

export default Createcustomer;