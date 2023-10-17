import React from 'react'
import BreadCrumbs from '../../structure/BreadCrumbs'
import Form from './AccountStatement/Form'
import RecentTransactions from '../../structure/RecentTransactions/RecentTransactions'

function AccountStatement() {
  return (
    <>
      <BreadCrumbs data={{ name: "Account Statement", img: "/arrows/arrowLeft.svg", backurl: "/accounts" }} />

      <div className='row'>
        <div className='col-12 col-lg-7 p-3'>
          <div className='m-3  bg-white p-5 border rounded-3'>
            <img src="/accounts/accountStatement.svg" className={'bg-yellow10 p-3 rounded-4 border d-block'} />
            <h5 className='m-0 mt-3 d-inline-block'>What period do you want to receive the statement?</h5>
            <Form />
          </div>
        </div>

        <div className='col-12 col-lg-5 p-3'>
          <div className='m-3  bg-white p-5 border rounded-3'>
            <RecentTransactions/>
          </div>
        </div>


      </div>

    </>

  )
}

export default AccountStatement