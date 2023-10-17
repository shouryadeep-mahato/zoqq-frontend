import React from 'react'
import { useState } from 'react';

function SendSidebar(sendfields) {
    var sendfieldsoriginal=sendfields.sendfields
    console.log(sendfieldsoriginal)
    const [showPreview, setShowPreview] = useState(false);
    const togglePreview = () => {
        setShowPreview(!showPreview);
    };
    const calculatepayable = () =>{
        var total = sendfieldsoriginal.Subtotal;
        var discount = sendfieldsoriginal.Discount;
        var tax = sendfieldsoriginal.Tax;
        var payable = total - discount-tax;
        return payable;
    }
    return (
        <div>
            <h5>{sendfieldsoriginal.length} ITEM ADDED</h5>

            <div className='d-flex justify-content-between my-3'>
                <div className='me-5 fw-normal'>Invoice:</div>
                <div className='ms-5'>{sendfieldsoriginal.Invoicenumber}</div>
            </div>

            <div className='d-flex justify-content-between my-3'>
                <div className='fw-normal'>Due on:</div>
                <div>{sendfieldsoriginal.dueDate}</div>
            </div>

            <hr />

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div className='me-5'>Subtotal:</div>
                <div className='ms-5'>{sendfieldsoriginal.Subtotal} SGD</div>
            </div>

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Discount:</div>
                <div>- {sendfieldsoriginal.Discount} SGD</div>
            </div>
            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Tax:</div>
                <div>- {sendfieldsoriginal.Tax} SGD</div>
            </div>

            <hr />

            <div className='d-flex justify-content-between my-3 fw-normal'>
                <div>Total Amount:</div>
                <div className='fw-500'>{calculatepayable()}</div>
            </div>

            <button className='btn fw-500 blue100 border me-2 py-2 rounded-4' onClick={togglePreview}>
                    Preview
                    <img src='/expense/preview.svg' className='me-2' />
                </button>
                <div>
                {showPreview && (
                <iframe src="https://stylopay-sandbox-ohio-dev-dump-public.s3.amazonaws.com/stylopayinvoice.pdf" width="100%" height="400" title="Preview"></iframe>
            )}
            </div>
        </div>
    )
}

export default SendSidebar