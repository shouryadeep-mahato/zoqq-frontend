import React, { useState } from 'react'

function DetailsBar({ setShowDetails, handleShow, handleActive,selectedRowData }) {
    if (!selectedRowData) {
        return null; // If no row data is selected, don't display the DetailsBar
      }
    
      const { imgUrl,recipientName,id,status,createdBy,dueDate,amount,currency,description,sourceOfFund,date} = selectedRowData; // Replace these with the actual properties in your row data
    
      const redirectToAnotherPage = () => {
        // Replace '/your-target-url' with the URL you want to redirect to
        window.location.href = '/payments/beneficiaries';
    };
    return (
        <nav className="d-flex bg-white flex-column justify-content-start flex-start p-4 flex-1 border border-top-0 position-relative" id='sidebar'>
            <div className='mt-3 position-relative'>
                <h6 className='text-nowrap me-5'>{id}</h6>
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

            <div className='border p-3 my-3 rounded-2 bg-yellow10'>
                <div className='d-flex align-items-center'>
                    <div className='yellow100 ms-1 me-4'>{recipientName}</div>
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
                <hr className='blue100' />
                <div>
                    <div className='fw-normal me-5 text-nowrap'>{recipientName}</div>
                    <div className='grey1 fw-normal mt-2'>Creadted BY: {createdBy}</div>
                    <div className='grey1 fw-normal mt-2'>Due Date: {dueDate}</div>
                    <div className='grey1 fw-normal mt-2'>Desctiption: {description}</div>
                    <div className='grey1 fw-normal mt-2'>Sourceof Fund: {sourceOfFund}</div>
                </div>
                <hr className='blue100' />
                <div className='text-end'>
                  {amount} {currency}
                </div>
            </div>

            
                    <button className='blue100 btn border fw-500 py-2'onClick={() => redirectToAnotherPage()}>
                <img src="/expense/edit.svg" />
                &nbsp; Pay
            </button>
            <div className="accordion accordion-flush mt-4" id="receiveMoneyDetails">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button
                            className="accordion-button collapsed fw-500 ps-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            GENERAL
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#receiveMoneyDetails"
                    >
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/invoiceNum.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Bill Number:</p>
                            <p className="m-0">{id}</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/invoiceDate.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Bill Date:</p>
                            <p className="m-0">{date}</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/dueDate.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Due Date:</p>
                            <p className="m-0">{dueDate}</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                            className="accordion-button btn-accordion collapsed fw-500 text-decoration-none ps-0"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                        >
                            CONTROLS
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#receiveMoneyDetails"
                    >
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/reference.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Reference:</p>
                            <p className="m-0">None</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/budget.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Budget:</p>
                            <p className="m-0">None</p>
                        </div>
                        <div className='d-flex my-3 align-items-center justify-content-between fw-normal'>
                            <img src="/expense/notify.svg" />
                            <p className="m-0 grey1 flex-fill ms-2">Notify:</p>
                            <p className="m-0">No</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}

export default DetailsBar