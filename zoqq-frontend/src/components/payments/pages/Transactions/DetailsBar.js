import React, { useEffect, useState } from 'react'
import CustomTextField from '../../../structure/CustomText';
import { handleCopy } from '../../../structure/handleCopy';

function DetailsBar({ setShowDetails, handleShow, handleActive }) {

    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setShowDetails(false); // Call your function when "Esc" is pressed
            }
        }

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <nav className="d-flex bg-white flex-column justify-content-start flex-start p-4 flex-1 border border-top-0 position-relative" id='sidebar'>
            <div className='mt-3 position-relative'>
                <h6 className='text-nowrap me-5'>Transaction Details</h6>
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

            <div className='border p-3 my-3 rounded-2 d-flex align-items-center'>
                <div>
                    <img className='bg-yellow10 p-3 me-3 rounded-2' src='/minus_yellow.svg' />
                </div>

                <div>
                    <p className='text-nowrap m-0'>Payment to DBS Bank
                        <br />
                        <span className='grey1 fw-normal'>Completed</span>
                        <br /><span>-100.00 USD</span></p>
                </div>
            </div>

            <div className="accordion accordion-flush" id="receiveMoneyDetails">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button
                            className="accordion-button collapsed fw-500"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            SUMMARY
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse mt-2"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#receiveMoneyDetails"
                    >
                        <div className='d-flex justify-content-between fw-normal'>
                            <p className='grey1'>You Sent</p>
                            <p className=''>5,050.00 EUR</p>
                        </div>

                        <div className='d-flex justify-content-between fw-normal'>
                            <p className='grey1 fw-500'><u>Our Fee</u></p>
                            <p className=''>50.00 EUR</p>
                        </div>

                        <div className='d-flex justify-content-between fw-normal'>
                            <p className='grey1'>You Got</p>
                            <p className='fw-500'>5,000.00 EUR</p>
                        </div>
                    </div>
                </div>
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
                            INFO
                        </button>
                    </h2>
                    <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse mt-2"
                        aria-labelledby="flush-headingTwo"
                        data-bs-parent="#receiveMoneyDetails"
                    >
                        <div className='fw-normal'>
                            <p className='grey1 m-0'>Transaction Number</p>
                            <p className=''>#280538364</p>
                        </div>
                        <div className='fw-normal'>
                            <p className='grey1 m-0'>Sent to</p>
                            <p className=''>DBS Bank</p>
                        </div>
                        <div className='fw-normal'>
                            <p className='grey1 m-0'>Description</p>
                            <p className=''>Transfer to own account</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                        <button
                            className="accordion-button collapsed fw-500"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                        >
                            HISTORY
                        </button>
                    </h2>
                    <div
                        id="flush-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="flush-headingThree"
                        data-bs-parent="#receiveMoneyDetails"
                    >
                        <div className="my-3 ms-1">
                            <div className='row'>
                                <img src='/payments/check_double.svg' className='col-1' />
                                <div className='col-9 grey1 ms-2'>
                                    8 July
                                </div>
                            </div>
                            <div className='row'>
                                <img src='/payments/line.svg' className='col-1' />
                                <div className='col-9 ms-2 text-nowrap'>
                                    You sent a payment request
                                </div>
                            </div>

                            <div className='row mt-1'>
                                <img src='/payments/check_double_pending.svg' className='col-1' />
                                <div className='col-9 grey1 ms-2'>
                                    8 July
                                </div>
                            </div>
                            <div className='row mb-1'>
                                <img src='/payments/line_pending.svg' className='col-1' />
                                <div className='col-9 ms-2 text-nowrap'>
                                    Customer sent the payment
                                </div>
                            </div>

                            <div className='row'>
                                <img src='/payments/check_double_pending.svg' className='col-1' />
                                <div className='col-9 grey1 ms-2'>
                                    8 July
                                </div>
                            </div>
                            <div className='row'>
                                <img src='/payments/line_pending.svg' className='col-1' />
                                <div className='col-9 ms-2 text-nowrap'>
                                    Payment deposited
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <button className='btn blue100 border py-3 fw-500 rounded-3 my-3'>
                <img src='/draganddrop.svg' className='me-2' />
                Get a PDF receipt
            </button>



        </nav>
    )
}

export default DetailsBar