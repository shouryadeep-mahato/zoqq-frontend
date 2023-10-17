import React from 'react'
import BreadCrumbs from '../../structure/BreadCrumbs'
import CurrencyGraph from './CurrencyConversion/CurrencyGraphConversion'
import RecentConversion from './CurrencyConversion/RecentConversion'
import Form from './CurrencyConversion/Form'

function CurrencyConversion() {
  return (
    <>
      <BreadCrumbs data={{ name: "Currency Conversion", img: "/arrows/arrowLeft.svg", backurl: "/accounts" }} />

      <div className='row'>
        <div className='col-12 col-lg-7 p-3'>
          <div className='m-3  bg-white p-5 border rounded-3'>
            <img src="/accounts/currencyConversion.svg" className={'bg-green10 p-3 rounded-4 border d-block'} />
            <h5 className='m-0 mt-3 d-inline-block'>What amount do you want to convert?</h5>
            <Form />
          </div>
        </div>

        <div className='col-12 col-lg-5 p-3 mt-3'>
            <CurrencyGraph/>
          <div className='m-3  bg-white p-5 border rounded-3'>
            <RecentConversion />
          </div>  
        </div>


      </div>
    </>

  )
}

export default CurrencyConversion