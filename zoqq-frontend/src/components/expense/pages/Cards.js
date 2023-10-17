import React, { useState } from 'react'
import BreadCrumbs from '../../structure/BreadCrumbs';
import CardList from './Cards/CardList';
import DetailsBar from './Cards/DetailsBar';
import CreateNewCard from './Cards/CreateNewCard';
import SideBar from '../../SideBar';

function Cards() {
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
    <div className="d-flex">
          <SideBar />
          <div
            className="container-fluid px-0 bg-light clear-left overflow-auto"
            style={{ height: "100vh" }}
          >
            
      <BreadCrumbs data={{ name: "Corporate Cards", img: "/arrows/arrowLeft.svg", backurl: "/expense", info: true }} />

      <div className='d-flex'>
        <div className='row m-3 bg-white border p-4 d-flex rounded-3 flex-fill'>
          <div className='p-3 d-flex justify-content-between align-items-baseline'>
            <div>
              <img src="/expense/cards.svg" className={'bg-yellow10 p-3 rounded-4 border d-block'} />
              <h5 className='text-nowrap m-0 mt-3 d-inline-block'>Cards</h5>
            </div>

            <div className='text-white d-flex align-items-center'>
              <CreateNewCard />
            </div>
          </div>

          <CardList setShowDetails={setShowDetails}/>

        </div>

        {
          showDetails && <DetailsBar setShowDetails={setShowDetails} handleShow={handleShow} handleActive={handleActive} />
        }
      </div>

</div>
</div>

    </>

  )
}

export default Cards