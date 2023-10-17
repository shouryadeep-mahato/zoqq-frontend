import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createbill } from '../../js/bills-functions'
import { toast } from 'react-toastify'

function Review({apiData, setCurrentState,reviewFields }) {debugger
    console.log(reviewFields)
    const[isLoading,setIsLoading]=useState(false)
    const handleCreateBill = async () => {debugger
        setIsLoading(true);

createbill(reviewFields)
  .then((response) => {debugger
    // Success case - put your success logic here
    setIsLoading(false);
    console.log(response)
    setTimeout(() => {
      window.location.href = '/expense/bills'; // Replace with the actual page URL
    }, 5000);
  })
  .catch((error) => {debugger
    // Error case - handle the error, e.g., show an error message
    console.log("create bill error"+error)
    //toast.error(error)
    setIsLoading(false);
  });
    //     try {
    //       setIsLoading(true);
    //       await createbill(reviewFields);
    //     //   setTimeout(() => {
    //     //   window.location.href = '/expense/bills'; // Replace with the actual page URL
    // // }, 10000);
    //     } catch (error) {
    //       // Handle error, e.g., show an error message
    //     } finally {
    //       setIsLoading(false);
    //     }
      };
    
    return (
        <div>
            <div className='d-flex align-items-center my-4'>
                <p className='m-0 mx-3 blue100 fw-normal'>1. Bill</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-normal'>2. Transfer</p>
                <img src="/payments/lineH.svg" />
                <p className='m-0 mx-3 blue100 fw-500'>3. Review</p>
            </div>

            <div className='opacity-50 m-3' onClick={() => setCurrentState("transfer")} role='button'>
                <img src='/arrows/arrowLeft.svg' width={10} />
                &nbsp; back
            </div>

            <div className='border my-3 pt-3 pb-2 px-4'>
                <p>1 ITEM ADDED</p>
                <div className='d-flex justify-content-between'>
                    <p className='fw-normal'>Bill:</p>
                    <p>{reviewFields.Billnumber}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p className='fw-normal'>Due on:</p>
                    <p>{reviewFields.Duedate}</p>
                </div>

                <hr />

                <div className='d-flex justify-content-between fw-normal'>
                    <p>Source of fund:</p>
                    <p>{reviewFields.SourceofFunds}</p>
                </div>
                <div className='d-flex justify-content-between fw-normal'>
                    <p>Description:</p>
                    <p>{reviewFields.Description}</p>
                </div>
                <div className='d-flex justify-content-between fw-normal'>
                    <p>Notify:</p>
                    <p>No</p>
                </div>  

                <hr />

                <div className='d-flex justify-content-between fw-normal'>
                    <p>Total Tax:</p>
                    <p className='fw-500'>{reviewFields.TotalAmount}  {reviewFields.currency}</p>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-4'>
                <div>
                    <button className='btn fw-500 green100 border me-2 py-2 rounded-4'>Save as Draft
                        <img src='/payments/save.svg' className='ms-1' />
                    </button>
                    <button className='btn fw-500 yellow100 border me-2 py-2 rounded-4'>Delete
                        <img src='/payments/delete.svg' className='ms-1' />
                    </button>
                </div>



                <div>
                    <button
                        // to="/expense/bills"
                        type="button"
                        className='btn bg-green100 text-white border w-100 rounded-3 d-flex align-items-center justify-content-center py-2 fw-500 rounded-4'
                        onClick={handleCreateBill}
                        disabled={isLoading}
                    >
                         {isLoading ? <>
          <div >
                 Creating Bill
                </div>
        </> : 'Continue >'} &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Review