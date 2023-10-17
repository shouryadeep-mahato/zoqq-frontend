import React, { useState } from 'react'
import BreadCrumbs from '../../structure/BreadCrumbs';
import DetailsBar from './Transactions/DetailsBar';
import CreateNewRequest from './ReceiveMoney/CreateNewRequest';
import TransactionList from './Transactions/TransactionList';

function Transactions() {
  const [showDetails, setShowDetails] = useState(false);
  const currencies = [true, true, true, true, false, false]
  const [showArray, setShowArray] = useState(new Array(currencies.length).fill(false));
  const [activeArray, setActiveArray] = useState(new Array(currencies.length).fill(false));

  const handleShow = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setShowArray(array);
  }

  const handleActive = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setActiveArray(array);
  }

  return (
    <>
      <BreadCrumbs data={{ name: "Transactions", img: "/arrows/arrowLeft.svg", backurl: "/payments", info: true }} />

      <div className='d-flex'>
        <div className='row m-3 bg-white border p-4 d-flex rounded-3 flex-fill'>
          <div className='p-3 d-flex flex-column align-items-baseline'>
              <img src="/refresh_gray.svg" className={'bg-grey p-3 rounded-4 border d-block'} />
              <h5 className='text-nowrap m-0 mt-3 d-inline-block'>All Transactions</h5>
          </div>

          <TransactionList setShowDetails={setShowDetails}/>

        </div>

        {
          showDetails && <DetailsBar setShowDetails={setShowDetails} handleShow={handleShow} handleActive={handleActive} />
        }
      </div>



    </>

  )
}

export default Transactions