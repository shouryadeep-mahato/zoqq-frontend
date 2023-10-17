import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as functions from "../js/subscription.js";


function CompareAllPlans() {

    const [features, setFeatures] = useState([])

    useEffect(() => {
      async function fetchData() {
        const response = await functions.getSubscriptionPlanDetails();
        if (response) {
         // setSubscriptionData(response); 
          setFeatures(response);
        }     
      }
      fetchData();
    }, []);
  

    const [select, setSelect] = useState("");
    const [litePrice, setLitePrice] = useState(0);
    const [proPrice, setProPrice] = useState(0);
  
    const [subscriptionData, setSubscriptionData] = useState([]);

    useEffect(()=> {
      if(features.length>0) {
        features.forEach((item) =>  {
          if(item.plan_id==1) {
            setLitePrice(item.plan_price);
          } else {
            setProPrice(item.plan_price);
          }
        })
      }
    }, [features])
  
    const Features = ({ title }) => {

        return (
          <div className='my-4 fw-normal d-flex align-items-center'>
            <img src="/auth/exclamation.svg" className='me-2 my-1' /> {title}
          </div>
        )
      }
      
      const Lite = ({ lite, selected }) => {
      
        return (
          <div className='my-4 fw-normal d-flex justify-content-center '>
            <img className='my-1' src={lite ? "/auth/yellowTick.svg" : selected ? "/auth/red-cross-circle.svg" : "/auth/cross-circle.svg"} />
          </div>
        )
      }
      
      const Pro = ({ pro }) => {
      
        return (
          <div className='my-4 fw-normal d-flex justify-content-center'>
            <img className='my-1' src={pro ? "/auth/blueTick.svg" : "/auth/cross-circle.svg"} />
          </div>
        )
      }      

  return (
    <div className='w-100 d-flex align-items-center my-5'>
    <div className='bg-white border p-5 mx-auto w-75'>
      {/* <Link to="/signup/account-setup" className='text-decoration-none d-flex mb-3'><img src="/auth/arrowrightshort.svg" /><p className='text-dark m-0 ms-1 fw-normal'>Back</p></Link> */}

      <div className='d-flex'>
        <div className='w-100 px-3'>
          <h5 className='fw-600 pt-3'>EXPLORE ZOQQ</h5>
          <p className='fw-normal'>Explore our system and its features</p>
          <hr style={{ opacity: "10%" }} />

          {features?.map((feature, key) => (
            <Features key={key} title={feature.features_name} />
          ))}

        </div>

        <div className={'w-50 p-3' + (select === "lite" ? " border rounded-4" : "")} onClick={() => setSelect("lite")} role='button'>
          <div className='d-flex align-items-center'>
            <div>
              <img src="/auth/lite.svg" className='bg-yellow10 p-2 mb-2 me-3 rounded-4' />

            </div>
            <div>
              <p className='m-0 yellow100 fw-normal'>Business</p>
              <h5 className='m-0'>Lite</h5>
            </div>
          </div>
          <hr style={{ opacity: "10%" }} />

          {features?.map((feature, key) => (
            <Lite key={key} lite={feature.plan_id==1} selected={select === "lite"} />
          ))}

          <Link to="/dashboard" className='btn bg-yellow100 text-white fw-500 w-100 py-3 rounded-4'>START FOR ${litePrice}</Link>

        </div>

        <div className={'w-50 p-3' + (select === "pro" ? " border rounded-4" : "")} onClick={() => setSelect("pro")} role='button'>
          <div className='d-flex align-items-center'>
            <div>
              <img src="/auth/pro.svg" className='bg-blue10 p-2 mb-2 me-3 rounded-4' />

            </div>
            <div>
              <p className='m-0 blue100 fw-normal'>Business</p>
              <h5 className='m-0'>Pro</h5>
            </div>
          </div>
          <hr style={{ opacity: "10%" }} />

          {features?.map((feature, key) => (
            <Pro key={key} pro={feature.plan_id==1 || feature.plan_id==2} />
          ))}
          <Link to="/dashboard" className='btn bg-blue100 text-white fw-500 w-100 py-3 rounded-4'>START FOR ${proPrice}</Link>
        </div>
      </div>
    </div>
  </div>

  )
}

export default CompareAllPlans