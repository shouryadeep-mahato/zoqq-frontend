import React, { useState } from 'react'
import SideBar from "../../SideBar.js";
import BreadCrumbs from '../../structure/BreadCrumbs.js'
import { Link } from 'react-router-dom'

function SubscriptionDetails() {


  return (
    <> 
       
    <div className='bg-white h-100'>
      <BreadCrumbs data={{ name: "Subscription", img: "/arrows/arrowLeft.svg", backurl: "/settings", info: true }} />

      <div className='row m-4'>
        <div className='col-9 mx-auto'>
          <div className='p-3 d-flex flex-column align-items-baseline'>
            <img src="/settings/subscription.svg" className={'bg-yellow10 p-3 rounded-4 border d-block'} />

            <div className='d-flex mt-3 justify-content-between w-100'>
              <h5 className='text-nowrap m-0'>Subscription Setup</h5>
              <Link className='m-0 blue100 text-decoration-none' to="/settings/subscription/payment-history">Payment history</Link>
            </div>

            <div className='mt-4 mb-3 fs-5'>
              Your plan
            </div>

            <div className='w-100 border p-3 rounded-top d-flex align-items-center'>
              <img src="/settings/subscription/mini.svg" className={'bg-green10 p-3 rounded-4 d-block'} />

              <div className='flex-fill ms-3'>
                <p className='fw-normal m-0 green100'>Business: Mini</p>
                <p className='m-0'>$9,99 / month</p>
              </div>

              <div className='d-flex flex-column'>
                <p className='m-0 ms-auto green100 bg-green10 py-1 px-3 rounded-pill d-inline'>Active</p>
                <p className='m-0'><span className='fw-normal'>Paid by: </span>18 August, 2023</p>
              </div>
            </div>
            <div className='w-100 border-none border-start border-end border-bottom bg-light p-3 rounded-bottom d-flex align-items-center'>
              <div className='bg-green100 text-white ps-5 pe-2 pt-4 rounded-4 pb-2'>
                *265
              </div>

              <div className='flex-fill ms-3'>
                <p className='m-0'>Card 2947 **** **** 2655</p>
                <p className='m-0 yellow100'>Change Card</p>
              </div>

              <div className='d-flex flex-column'>
                <p className='m-0'><span className='fw-normal'>Next payment: </span>18 September, 2023</p>
                <p className='m-0 ms-auto text-danger d-inline'>Stop Subscription</p>
              </div>
            </div>


            <div className='mt-4 mb-3 fs-5'>
              Other plans
            </div>

            <div className='w-100 border p-3 rounded-3 d-flex align-items-center my-3'>
              <img src="/settings/subscription/pro.svg" className={'bg-blue10 p-3 rounded-4 d-block'} />

              <div className='flex-fill ms-3'>
                <p className='fw-normal m-0 blue100'>Business: Pro</p>
                <p className='m-0'>$9,99 / month</p>
              </div>

              <div className='d-flex flex-column blue100 border rounded-3 p-2 px-3'>
                Details
              </div>
            </div>

            <div className='w-100 border p-3 rounded-3 d-flex align-items-center my-3'>
              <img src="/settings/subscription/lite.svg" className={'bg-yellow10 p-3 rounded-4 d-block'} />

              <div className='flex-fill ms-3'>
                <p className='fw-normal m-0 yellow100'>Business: Lite</p>
                <p className='m-0'>$9,99 / month</p>
              </div>

              <div className='d-flex flex-column yellow100 border rounded-3 p-2 px-3'>
                Details
              </div>
            </div>

            <Link to="/compare-plans" className='btn text-decoration-none mx-auto fw-500 my-3 btn border px-3 py-2'>
              Compare all Plans
            </Link>



          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default SubscriptionDetails