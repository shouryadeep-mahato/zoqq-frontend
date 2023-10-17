import React from 'react'
import "../../../../data/accounts/globalAccounts"


function EachConversion({data}) {

    if(data == "**No recent conversions in the last 7 days**"){
        return (
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <div className='d-flex align-items-center'>
                    <img src='/accounts/currencyConversionBlue.svg' className='bg-blue10 p-2 rounded-3' />
                    <p className='m-0 ms-3 text-break me-4'>{data}</p>
                </div>
                </div>
        )
    }
    else{
        const transctionType = data && data.transactionType;
        const txnType = transctionType ? transctionType.replace(/_/g, ' ') : '';
    return (
        <div className='d-flex align-items-center justify-content-between mb-3'>
            <div className='d-flex align-items-center'>
                <img src='/accounts/currencyConversionBlue.svg' className='bg-blue10 p-2 rounded-3' />
                <p className='m-0 ms-3 text-break me-4'>{txnType}</p>
            </div>
            <div className='blue100 text-nowrap'>
                {data?.cardTransactionAmount} {data?.transactionCurrencyCode}
            </div>
        </div>
    )
    }
}

export default EachConversion