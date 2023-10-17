import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import { DatePicker } from '@mui/x-date-pickers';
import CustomDate from '../../../structure/CustomDate';
import {getTransactionHistory} from '../../../../data/accounts/accountStatementDownloads';
import "../../../accounts/css/accounts.css"
import { BiLock } from 'react-icons/bi';

function Form() {

    // const [exportType, setExportType] = useState({0: true, 1: false, 2: false, 3: false, 4: false,5: false})
    const [exportType, setExportType] = useState([true, false, false, false, false, false])
    const [fileType, setFileType] = useState([true, false, false]);
    const [txnType, setTransactionType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fileFormat,setFileFormat] = useState('');
    const [exportFormat,setExportFormat] = useState('');

    const selectBox = (idx) => {
        const newTypes = exportType.map((value, key) => key===idx );
        setExportType(newTypes);
        const FILE = ["Default", "Xero", "QuickBooks", "Osome", "NetSuite", "BusinessOne"]
        setExportFormat(FILE[idx]);
    }


    const selectFileType = (idx) => {
        const newTypes = fileType.map((value, key) => key===idx );
        setFileType(newTypes);
        const FILE = ["CSV", "PDF", "XLSX"]
        setFileFormat(FILE[idx]);
    }

    const options = [
        { value: 'Remittance_Debit', label: 'Remittance Debit' },
        { value: 'Remittance_Debit_External', label: 'Remittance Debit External' },
        { value: 'Remittance_Reversal', label: 'Remittance Reversal' },
        { value: 'Wallet_Credit_Mode_Card', label: 'Wallet Credit Mode Card' },
        { value: 'Wallet_Credit_Mode_Prefund', label: 'Wallet Credit Mode Prefund' },
        { value: 'Wallet_Credit_Mode_Prefund_Cross_Currency', label: 'Wallet Credit Mode Prefund Cross Currency' },
        { value: 'Wallet_Credit_Mode_Offline', label: 'Wallet Credit Mode Offline' },
        { value: 'Wallet_Credit_Mode_Offline_Cross_Currency', label: 'Wallet Credit Mode Offline Cross Currency' },
        { value: 'Wallet_Credit_Mode_Offline_ThirdParty', label: 'Wallet Credit Mode Offline ThirdParty' },
        { value: 'Wallet_Fund_Transfer', label: 'Wallet Fund Transfer' },
        { value: 'Customer_Wallet_Credit_Fund_Transfer', label: 'Customer Wallet Credit Fund Transfer' },
        { value: 'Customer_Wallet_Debit_Fund_Transfer', label: 'Customer Wallet Debit Fund Transfer' },
        { value: 'Customer_Wallet_Debit_Intra_Region', label: 'Customer Wallet Debit Intra Region' },
        { value: 'Customer_Wallet_Credit_Intra_Region', label: 'Customer Wallet Credit Intra Region' },
        { value: 'Customer_Wallet_Debit_Cross_Region', label: 'Customer Wallet Debit Cross Region' },
        { value: 'Customer_Wallet_Credit_Cross_Region', label: 'Customer Wallet Credit Cross Region' },
        { value: 'Client_Prefund', label: 'Client Prefund' },
        { value: 'Client_Refund', label: 'Client Refund' },
        { value: 'Fee_Debit', label: 'Fee Debit' },
        { value: 'Fee_Reversal', label: 'Fee Reversal' },
        { value: 'Fee_Waiver', label: 'Fee Waiver' },
        { value: 'Transfer_Local', label: 'Transfer Local' },
        { value: 'Transfer_Local_Reversal', label: 'Transfer Local Reversal' },
        { value: 'Regulator_Auto_Sweep', label: 'Regulator Auto Sweep' },
        { value: 'Regulatory_Block', label: 'Regulatory Block' },
        { value: 'Regulatory_Debit', label: 'Regulatory Debit' },
        { value: 'Regulatory_Debit_Reversal', label: 'Regulatory Debit Reversal' }
    ]

    const [val, setVal] = useState();

    
    const onSubmit = (e) => {debugger
        e.preventDefault();
        const formData = {txnType, startDate, endDate, fileFormat, exportFormat};
        console.log(formData);
        getTransactionHistory(formData);
    }

    return (
        <form className='row mt-4' onSubmit={onSubmit}>
            <label className='mb-3'>Transaction Type</label>
            <div className='col-12 d-flex border-bottom mb-4'>
                <div className='d-flex'>
                    {/* <img src="/accounts/currency.svg" width={40} className='border-end my-auto px-2' /> */}
                </div>
                <div className="input-group containertext w-100 h-100">
                    <CustomSelect options={options} setValue={setTransactionType} />
                </div>
            </div>

            <label className='mb-3'>Date Range</label>
            <div className='col-6 d-flex  mb-4 pe-2'>
                <div className='d-flex border-bottom'>
                    <p className='grey1 my-auto text-nowrap'>From |</p>
                </div>
                <div className="border-bottom input-group containertext w-100 h-100">
                    <CustomDate onChange={setStartDate}/>
                </div>
            </div>
            <div className='col-6 d-flex mb-4 ps-2'>
                <div className='d-flex border-bottom'>
                    <p className='grey1 my-auto text-nowrap'>To |</p>
                </div>
                <div className="input-group border-bottom containertext w-100 h-100">
                    <CustomDate onChange={setEndDate}/>
                </div>
            </div>

            <label className='my-3'>Select export format</label>
            <div className='d-flex justify-content-between flex-wrap'>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover' + (exportType[0]?" border-activeBlue bg-blue10":"")} onClick={()=>selectBox(0)} role='button'><img src="/fileFormat/default.jpg" className='mb-2' width={50}/>Default</div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover position-relative' + (exportType[1] ? " border-activeBlue bg-blue10" : "")}  role='button'><img src="/fileFormat/xero.webp" className='mb-2' width={50} />
                    Xero
                <div className='position-absolute bg-dark w-100 h-100 text-center opacity-75 rounded-4'></div>
                <div className='position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4'><BiLock size={30}/>Coming Soon</div>
                </div>                
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover position-relative' + (exportType[2]?" border-activeBlue bg-blue10":"")}  role='button'><img src="/fileFormat/quickbooks.png" className='mb-2' width={50}/>
                QuickBooks
                <div className='position-absolute bg-dark w-100 h-100 text-center opacity-75 rounded-4'></div>
                <div className='position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4'><BiLock size={30}/>Coming Soon</div>
                </div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover position-relative' + (exportType[3]?" border-activeBlue bg-blue10":"")}  role='button'><img src="/fileFormat/osome.png" className='mb-2' width={50}/>
                Osome
                <div className='position-absolute bg-dark w-100 h-100 text-center opacity-75 rounded-4'></div>
                <div className='position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4'><BiLock size={30}/>Coming Soon</div>
                </div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover position-relative' + (exportType[4]?" border-activeBlue bg-blue10":"")}  role='button'><img src="/fileFormat/netsuite.jpg" className='mb-2' width={50}/>
                NetSuite
                <div className='position-absolute bg-dark w-100 h-100 text-center opacity-75 rounded-4'></div>
                <div className='position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4'><BiLock size={30}/>Coming Soon</div>
                </div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-4 blueHover position-relative' + (exportType[5]?" border-activeBlue bg-blue10":"")}  role='button'><img src="/fileFormat/sapbusone.jpeg" className='mb-2' width={50}/>
                BusinessOne
                <div className='position-absolute bg-dark w-100 h-100 text-center opacity-75 rounded-4'></div>
                <div className='position-absolute w-100 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4'><BiLock size={30}/>Coming Soon</div>
                </div>
            </div>

            <label className='my-3'>File format</label>
            <div className='d-flex justify-content-between flex-wrap'>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-pill blueHover' + (fileType[0]?" border-activeBlue bg-blue10":"")} onClick={()=>selectFileType(0)}  role='button'>.CSV</div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-pill blueHover' + (fileType[1]?" border-activeBlue bg-blue10":"")} onClick={()=>selectFileType(1)}  role='button'>.PDF</div>
                <div className={'border d-flex flex-column w-25 m-2 p-2 justify-content-center align-items-center rounded-pill blueHover' + (fileType[2]?" border-activeBlue bg-blue10":"")} onClick={()=>selectFileType(2)}  role='button'>.XLSX</div>
            </div>

         {/* setValue={setCSV} setValue={setPdf} setValue={setXlsx} */}



            {/* <div className='col-12 d-flex border-bottom mb-4'>
                <div className='d-flex'>
                    <img src="/accounts/fileFormat.svg" width={40} className='border-end my-auto px-2' />
                </div>
                <div className="input-group containertext w-100 h-100">
                    <CustomSelect options={options} setValue={setVal} />
                </div>
            </div> */}

            {/* <label className='mb-3'>Statement Language</label>
            <div className='col-12 d-flex border-bottom mb-4'>
                <div className='d-flex'>
                    <img src="/accounts/statementLanguage.svg" width={40} className='border-end my-auto px-2' />
                </div>
                <div className="input-group containertext w-100 h-100">
                    <CustomSelect options={options} setValue={setVal} />
                </div>
            </div> */}

            <button className='w-100 btn bg-yellow100 py-3 text-white fw-500 my-3' type="submit">
            <div id="button-text">
               <div className="addAccountButtonText" style={{fontWeight:500, fontSize:"18px" , marginLeft: "10%"}}>DOWNLOAD</div>
               </div>
                <div id="button-loader">
                  <img className="addAccountButtonLoader" style={{width: "45px",height:"40px"}}alt="" src="\accounts\Double Ring-1.5s-200px.gif"/>
                </div>
                </button>
        </form>
    )
}

export default Form