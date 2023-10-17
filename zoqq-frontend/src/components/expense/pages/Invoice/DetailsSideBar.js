import React, { useEffect } from 'react'
import { useState } from 'react';
import { Createinvoicedoc } from '../../js/invoices-function';

function DetailsSideBar({detailsfields, url}) {debugger
    const [showPreview, setShowPreview] = useState(false);
    const itemsArrayLength = detailsfields;
    const reallength =itemsArrayLength.length;
    
    const togglePreview = () => {debugger
        Createinvoicedoc(itemsArrayLength)
        
    };
    const calculatepayable = () =>{
        var total = itemsArrayLength.Subtotal;
        var discount= itemsArrayLength.Discount;
        var tax= itemsArrayLength.Tax;
        var payable =total-discount-tax;
        return payable;
    }
    
    return (
        <div>
            <h5>{reallength} ITEM ADDED</h5>

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div className='me-5'>Subtotal:</div>
                <div className='ms-5'>{itemsArrayLength.Subtotal} SGD</div>
            </div>

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Discount:</div>
                <div>- {itemsArrayLength.Discount} SGD</div>
            </div>
            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Tax:</div>
                <div>- {itemsArrayLength.Tax} SGD</div>
            </div>

            <hr />

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Total Amount:</div>
                <div className='fw-500'>{calculatepayable()} SGD</div>
            </div>

            {/* <button className='btn fw-500 blue100 border me-2 py-2 rounded-4' onClick={togglePreview}>
                    Preview
                    <img src='/expense/preview.svg' className='me-2' />
                </button> */}
                <div>
                
                <iframe src={url} width="100%" height="400" className='border' title="Preview"></iframe>
           
            </div>
        </div>
        
    )
}

export default DetailsSideBar