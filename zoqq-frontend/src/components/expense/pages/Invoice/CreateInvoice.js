import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../../structure/BreadCrumbs'
import Details from './Details';
import Documents from './Items';
import Review from './Send';
import DetailsSideBar from './DetailsSideBar';
import SendSidebar from './SendSidebar';
import SideBar from '../../../SideBar'
import { useLocation } from 'react-router-dom';
import { Createinvoice } from '../../js/invoices-function';

function CreateRequestinvoice() {
    const [currentState, setCurrentState] = useState("items");
    const [customerdata, setCustomerdata] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const customerdataparam = searchParams.get("customerdata");
    const parsedCustomerdata = JSON.parse(customerdataparam);
   
    const customername =parsedCustomerdata.customerName;
    const customeremail = parsedCustomerdata.customerEmail;
    const [detailsfields, setDetailsfields] = useState(null);
    const [url, setUrl] = useState("");

    // useEffect(()=>{
    //     if(url) {
    //         alert(url+111)
    //     }
    // }, [url])
    
    
    
  const handleitems = (fields) => {
    setDetailsfields(fields);
    setCurrentState("details"); // Move to the "details" state
  };
  const [sendfields,Setsendfields]= useState();
  const handleGetSendFields = (fields) => {
    Setsendfields(fields);
    setCurrentState("send"); // Move to the "send" state
  };
 
    return (
        <div className="d-flex">
            <SideBar />

            <div className="container-fluid px-0 bg-light clear-left overflow-auto" style={{ height: "100vh" }}>
            <BreadCrumbs data={{ backurl: "/expense/invoices", name: "Create New Invoice", info: true, img: "/arrows/arrowLeft.svg" }} />

            <div className='d-flex'>
                <div className='bg-white m-3 p-4 border rounded-3 flex-fill'>
                    <h6>Create New Invoice for &nbsp;
                        <span className='m-0 bg-light d-inline-block mx-auto border p-2 rounded'>{customername}</span></h6>


                    {
                        currentState === "items" ? <Documents setUrl={setUrl} setCurrentState={setCurrentState} customername={customername} getitems={handleitems} parsedCustomerdata={parsedCustomerdata}/> : currentState === "details" ? <Details setCurrentState={setCurrentState} detailsfields={detailsfields} getsendfields={handleGetSendFields} setUrl={setUrl} parsedCustomerdata={parsedCustomerdata} url={url} /> : currentState === "send" ? <Review setCurrentState={setCurrentState} sendfields={sendfields} parsedCustomerdata={parsedCustomerdata} /> : ""
                    }
                    


                </div>

                {currentState !== "items" && <div className='bg-white m-3 p-4 border rounded-3'>
                    {
                        currentState === "details" ? <DetailsSideBar detailsfields={detailsfields} url={url} /> : currentState === "send" ? <SendSidebar sendfields={sendfields}/> : ""
                    }
                </div>}
            </div>

        </div>
        </div>
        
    )
}

export default CreateRequestinvoice