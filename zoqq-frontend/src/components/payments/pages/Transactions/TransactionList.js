import React, { useEffect, useState } from 'react'
import CustomSelect from '../../../structure/CustomSelect'
import CustomDateRange from '../../../structure/CustomDateRangePicker'
import RecentTransactions from './RecentTransactions/RecentTransactions'
import { transactionDetailsPayments, transactionDetailsPaymentsByDate } from "../../../../data/accounts/globalAccounts"


function TransactionList({ setShowDetails }) {
  const [isMore, setIsmore] = useState(false);
  const [txnType, setTransactionType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactionData() {
      try {
        const data = await transactionDetailsPayments();
        if (data.length == 0) {
          setTransactions("**No transactions found**");
          setIsLoading(false);
        }
        else {
          setTransactions(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching recent conversion data:", error);
      }
    }

    fetchTransactionData();
  }, [])

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

  async function fetchTransactionData() {
    const from_D = new Date(fromDate.toString());
    const from_year = from_D.getFullYear();
    const from_month = String(from_D.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with '0' if needed.
    const from_day = String(from_D.getDate()).padStart(2, '0');
    let from_Date = `${from_year}-${from_month}-${from_day}`;

    const to_D = new Date(toDate.toString());
    const to_year = to_D.getFullYear();
    const to_month = String(to_D.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1 and pad with '0' if needed.
    const to_day = String(to_D.getDate()).padStart(2, '0');
    let to_Date = `${to_year}-${to_month}-${to_day}`;

    const formData = { txnType, fromDate: from_Date, toDate: to_Date };

    try {
      const data = await transactionDetailsPayments(formData);
      if (data.length == 0) {
        setTransactions("**No transactions found**");
        setIsLoading(false);
      }
      else {
        setTransactions(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recent conversion data:", error);
    }
  }

  async function fetchTransactionData2() {
   
    const formData = { txnType };

    try {
      const data = await transactionDetailsPayments(formData);
      if (data.length == 0) {
        setTransactions("**No transactions found**");
        setIsLoading(false);
      }
      else {
        setTransactions(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recent conversion data:", error);
    }
  }

  useEffect(() => {
    if (fromDate && toDate)
      fetchTransactionData();
    else if (txnType)
      fetchTransactionData2();
  }, [toDate, fromDate, txnType])

  // useEffect(() => {
  //   const formData = { txnType, fromDate, toDate };
  //   console.log(formData);

  //   async function fetchTransactionData() {
  //     try {
  //       const data = await transactionDetailsPaymentsByDate(formData);
  //       if (data.length == 0) {
  //         setTransactions("**No transactions found**");
  //         setIsLoading(false);
  //       }
  //       else {
  //         setTransactions(data);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recent conversion data:", error);
  //     }
  //   }
  //   if (txnType)
  //     fetchTransactionData();
  // }, [txnType])





  return (
    <div>

      {/* {isMore && <div className='d-flex'>
        <div className='border w-25 rounded-3 mx-2'><CustomSelect placeholder={"USD-Balance"}/></div>
        <div className='border w-25 rounded-3 mx-2'><CustomSelect placeholder={"Account replenishment"}/></div>
        <div className='border w-25 rounded-3 mx-2'><CustomSelect placeholder={"Incoming payments"}/></div>
        <div className='border w-25 rounded-3 mx-2'><CustomSelect placeholder={"Investments"}/></div>
      </div>} */}

      <div className='my-3 d-flex flex-row align-items-center'>
        <div className="">
          <label className='mb-3' style={{ marginLeft: "5px" }}>Date Range</label>
          <div className="">
            <div className='rounded-3 mx-md-1 border'>
              <CustomDateRange className="w-100" from={fromDate} to={toDate} setFromDate={setFromDate} setToDate={setToDate} />
            </div>
          </div>
        </div>

        <div className="flex-fill" style={{ maxWidth: '450px' }}>
          <label className='mb-3' style={{ marginLeft: "15px" }}>Transaction Type</label>
          <div className='d-flex ms-md-3 me-md-1 border rounded-3 flex-fill py-2'>
            <div className="input-group containertext w-100 h-100">
              <CustomSelect options={options} setValue={setTransactionType} />
            </div>

            {/* <button className="btn" type="submit" >
              <img src='/search.svg' />
            </button>
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            /> */}
          </div>
        </div>
        <div className='d-flex align-items-stretch h-100 ms-2'>
          <button className='btn bg-yellow100 text-white h-100 mx-1 p-3 fw-500 text-nowrap' style={{ marginTop: "35px" }}>
            PDF
            <img src='/draganddrop_w.svg' />
          </button>
          <button className='btn bg-yellow100 text-white h-100 mx-1 p-3 fw-500 text-nowrap' style={{ marginTop: "35px" }}>
            CSV
            <img src='/draganddrop_w.svg' />
          </button>
          {/* <button className='btn bg-yellow100 text-white h-100 mx-1 p-3 fw-500 align-self-stretch'>
            <img src='/print.svg' />
          </button> */}
        </div>


      </div>

      {/* <div className='col-12 blue100 text-center mb-4' onClick={()=>setIsmore(!isMore)} role='button'>
        {isMore?<>Less Filters &#8963;</>:<>More Filters &#8964;</>} 
      </div> */}

      <div className='mx-3'>
        <RecentTransactions setShowDetails={setShowDetails} transactions={transactions} isLoading={isLoading} />

      </div>


    </div>
  )
}

export default TransactionList