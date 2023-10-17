import React, { useEffect, useState } from 'react'
import EachInfoData from './EachInfoData'
import { handleCopy } from '../../../structure/handleCopy';
import { flag } from '../../../../data/accounts/globalAccounts';

function DetailsBar({ setShowDetails, handleShow, handleActive, data }) {

    useEffect(() => {
        console.log(data)
    }, [data])

    const labels = ["Name of the Account Holder", "Account Number", "Bank", "Bank Name", "Bank Address", "SWIFT/BIC", "Branch Code"];
    const title = ["accountName", "uniquePaymentId", "bankName", "fullBankName", "bankAddress", "routingCodeType1", "routingCodeType2"];

    const [jsonData, setJSONData] = useState("")

    useEffect(() => {
        if (labels) {
            const copyData = labels.map((label, i) => (
                { label, text: data[title[i]] }
            ))

            const filterData = copyData.filter((item)=>Boolean(item?.text))
            setJSONData(JSON.stringify(filterData).split("\"},{\"").join("\n").split("\"").join("").split("label:").join("").split(",text:").join(" : ").slice(2, -2));
        }
    }, [labels])


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
                <h6 className='text-nowrap me-5'>Bank Account Details</h6>
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

            <div className='d-flex border p-3 justify-content-center align-items-center my-3 rounded-2'>
                <img src={flag[data?.currencyCode]} width={50} />
                <p className='my-auto ms-2 me-5'>
                    <span className='grey1 text-nowrap' title={data.fullBankName}>
                        {data?.fullBankName.slice(0, 10)}{data?.fullBankName.length > 10 ? "..." : ""}
                    </span>
                    <br />
                    <span className='text-nowrap'>
                        {data?.currencyCode}
                    </span>
                </p>
            </div>

            {
                labels.map((label, i) => (
                    data[title[i]] &&
                    <EachInfoData key={i} data={{ label, text: data[title[i]] }} />
                ))
            }

            <button className='btn border rounded-3 my-4 py-3' onClick={(event) => {
                handleCopy(event, jsonData);

            }}>
                <img src="/copy_blue.svg" className='me-2' />
                Copy
            </button>


        </nav>
    )
}

export default DetailsBar