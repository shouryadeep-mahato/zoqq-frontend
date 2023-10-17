import React, { useState } from 'react'

function DetailsBar({ setShowDetails, handleShow, handleActive,selectedRowData }) {
    if (!selectedRowData) {
        return null; // If no row data is selected, don't display the DetailsBar
      }
    
      const { imgUrl,customerName,id,status,createdBy,dueDate,amount,currency,description,sourceOfFund,date} = selectedRowData; // Replace these with the actual properties in your row data
    
console.log(selectedRowData)
    return (
        <nav className="d-flex bg-white flex-column justify-content-start flex-start p-4 flex-1 border border-top-0 position-relative" id='sidebar'>
            <div className='mt-3 position-relative'>
                <h6 className='text-nowrap me-5'>Invoice Details</h6>
                <button
                    type="button"
                    className="btn-close btn-sm  position-absolute end-0 top-0 me-2"
                    onClick={() => {
                        handleShow(-1);
                        handleActive(-1);
                        setShowDetails(false);
                    }}
                />
            </div>

            <div className='border p-3 my-3 rounded-2 bg-green10'>
                <div className='d-flex align-items-center'>
                    <div className='green100 ms-1 me-4'>{id}</div>
                    <div className={`px-3 py-2 rounded-pill ${
    status === 'P' ? 'bg-yellow100' :
    status === 'A' ? 'bg-green100' :
    status === 'R' ? 'bg-red100' :
    'bg-blue100'
  } text-white ms-0 me-3`}>
    {status === 'P' ? 'Pending' :
    status === 'A' ? 'Approved' :
    status === 'R' ? 'Rejected' :
    status}
  </div>
                </div>
                <hr className='green100' />
                <div>
                    <div className='my-2 fw-normal'>{customerName}</div>
                    <div className='grey1 fw-normal'>{date}</div>
                </div>
                <hr className='green100' />
                <div className='text-end'>
                    {amount} {currency}
                </div>
            </div>

            <button className='btn border rounded-4 mb-3 fw-500 blue100'>
            <a href={imgUrl} download target="_blank" rel="noopener noreferrer"> 
        <img src="/draganddrop.svg" className='me-2' />
        Download
    </a>
            </button>

            <div className="accordion accordion-flush" id="receiveMoneyDetails">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                            className="accordion-button btn-accordion collapsed fw-500 text-decoration-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            GENERAL
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#receiveMoneyDetails"
                    >

                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/invoiceNum.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Invoice Number:</p>
                            <p className="m-0">{id}</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/invoiceDate.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Invoice Date:</p>
                            <p className="m-0">{date}</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/dueDate.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Due Date:</p>
                            <p className="m-0">{dueDate}</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/sentBy.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Sent By:</p>
                            <p className="m-0">{customerName}</p>
                        </div>

                        <hr />
                        <div className="d-flex my-3 align-items-center justify-content-between bg-blue10 py-2 border rounded-2">
                            <img src="/payments/attachment.svg" width={40} className='px-2' />
                            <p className='fw-500 m-0'>PDF</p>
                            <p className='fw-normal m-0'>Invoice {id}</p>
                            <a href={imgUrl} target="_blank" rel="noopener noreferrer">
                    <img src="/payments/share.svg" width={40} className='px-2' />
                </a>
                        </div>
                    </div>
                </div>

            </div>


        </nav>
        
    )
}

export default DetailsBar