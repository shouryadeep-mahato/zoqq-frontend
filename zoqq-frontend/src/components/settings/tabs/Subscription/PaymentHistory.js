import React from 'react'
import SideBar from '../../../SideBar';
import BreadCrumbs from '../../../structure/BreadCrumbs';

const PaymentHistoryList = ({ data }) => {

    return (
        <>

            <tr className='border my-3'>
                <td className={'py-2 px-3 m-0 rounded-pill d-inline-block m-3 align-items-center' + (data?.type === "Error" ? " yellow100 bg-yellow10" : " green100 bg-green10")}>{data?.type}
                </td>
                <td>
                    {data?.date}<br />{data?.time}
                </td>
                <td className='m-0 opacity-75'>{data?.cardNo}<br/><span className='fw-500 text-danger'>{data?.status}</span></td>
                <td>
                    {data?.description}<br />
                    <u className='fw-500'>{data?.businessType}</u>
                </td>
                <td className='fw-500'>
                    {data?.price}
                </td>
            </tr>
            <tr className='my-3'>
                <td className='py-3'></td>
                <td className='py-3'></td>
                <td className='py-3'></td>
                <td className='py-3'></td>
                <td className='py-3'></td>
            </tr>
        </>
    )
}


const PaymentHistory = () => {

    const histories = [{
        type: "Paid",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        description: "Monthly payment by subscription  ",
        businessType: '"Business: Mini"',
        price: "$9,99"
    }, {
        type: "Error",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        status: "Insufficient funds",
        description: "Monthly payment by subscription ghjk jkl",
        businessType: '"Business: Mini"',
        price: "$9,99",
    }, {
        type: "Paid",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        description: "Monthly payment by subscription",
        businessType: '"Business: Mini"',
        price: "$9,99"
    }, {
        type: "Paid",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        description: "Monthly payment by subscription",
        businessType: '"Business: Mini"',
        price: "$9,99"
    }, {
        type: "Error",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        status: "Insufficient funds",
        description: "Monthly payment by subscription ghjk jkl",
        businessType: '"Business: Mini"',
        price: "$9,99",
    }, {
        type: "Paid",
        date: "18 August,2023",
        time: "0 11:00",
        cardNo: "2745*** *** 2730",
        description: "Monthly payment by subscription",
        businessType: '"Business: Mini"',
        price: "$9,99"
    }];

    return (
        <div className='d-flex'>
            <SideBar />
            <div className="container-fluid px-0 bg-light clear-left overflow-auto" style={{ height: "100vh" }}>
                <BreadCrumbs data={{ name: "Payment history", img: "/arrows/arrowLeft.svg", backurl: "/settings/subscription" }} />
                <div className='bg-white w-75 mx-auto m-3 p-3'>
                    <div className='p-3'>
                        <img className=' d-flex  justify-content-end bg-yellow10 p-3 rounded-3 d-block ' src="/settings/subscription/payment-history/m-payment.svg" alt="" />
                        <h5 className='mt-3'>Payment history</h5>
                        <h5 className='my-4'>Your Plan</h5>

                        <table className='w-100 '>
                            <tbody className='p-3'>
                                {histories.map((item, key) => (
                                    <PaymentHistoryList data={item} key={key} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PaymentHistory
