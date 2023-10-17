import React from 'react'
import Expense from './ExpenseDashboard'
import { Link } from 'react-router-dom';


function EachCard({data}) {
    return (
        <div className='col-12 col-md-6 col-lg-4 p-4'>
            <div className='border p-5 rounded-4 position-relative bg-white'>
                <img src={data.img} className={'bg-'+data.color+'10 p-3 rounded-4 border'} />
                <h5 className='my-3'>{data.title}</h5>
                <p className='grey1'>{data.subtitle}</p>
                <Link to ={data.url}>
                <button className={'w-100 fw-500 btn border py-3 '+data.color+'100'}>Open</button>
                </Link>
                <div className='border border-4 rounded-bottom-4 position-absolute w-100 bottom-0 start-0'>
                </div>
            </div>
        </div>
    )
}

export default EachCard