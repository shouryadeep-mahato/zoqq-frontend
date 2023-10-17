import React, { useState, useEffect } from 'react';
import BreadCrumbs from '../../structure/BreadCrumbs';
import Bill from './Createbill/Bill';
import Transfer from './Createbill/Transfer';
import Review from './Createbill/Review';
import SideBar from '../../SideBar';
import { docanalysis} from '../js/bills-functions.js';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ContentLoader from 'react-content-loader';

function CreateRequest() {
    const [currentState, setCurrentState] = useState("bill");
    const [apiData, setApiData] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedFileName = searchParams.get("filename");
    const selectedFileurl = searchParams.get("url");
    const [transferFields, setTransferFields] = useState(null);
    

  const handleGetUpdatedFields = (fields) => {
    setTransferFields(fields);
    setCurrentState("transfer"); // Move to the "transfer" state
  };
  const [reviewFields, setReviewFields] = useState(null);

  const handleGetReviewFields = (fields) => {
    setReviewFields(fields);
    setCurrentState("review"); // Move to the "review" state
  };
    

    useEffect(() => {debugger
        
        docanalysis(selectedFileName)
        .then((fetchedData) => {
          setApiData(fetchedData);
          console.log('API Data:', fetchedData); // Log the fetched data
        })
         .catch((error) => {
         //toast.error("something went wrong")
          console.error('Error fetching API data:', error);
          setApiData({"query_results": {"InvoiceNumber": "# FAH4KH2300119141", "TotalAmount": "1", "OrderNumber": "OD126075829427635000", "address": "Instakart Services Private Limited, Plot No A1,, Haringhata Industrial Park, District Nadia, West Bengal Pin- 741249, Nadia, WEST BENGAL, India 741249, IN-WB", "duedate": "24-09-2022", "invoicedate": "24-09-2022", "tax": NaN}});
        });
        
    }, [selectedFileName]);
    return (
      <div className="d-flex">
          <SideBar />

          <div className="container-fluid px-0 bg-light clear-left overflow-auto" style={{ height: "100vh" }}>
              <BreadCrumbs data={{ backurl: "/expense/bills", name: "Create New Bill", info: true, img: "/arrows/arrowLeft.svg" }} />

              <div className='d-flex row'>
                  <div className='col-7 bg-white m-3 p-5 border rounded-3 mx-auto'>
                      <h6>Bill Details</h6>

                      {apiData ? (
                          currentState === "bill" ? <Bill apiData={apiData} setCurrentState={setCurrentState} selectedFileName={selectedFileName} getUpdatedFields={handleGetUpdatedFields} selectedFileurl={selectedFileurl} /> : currentState === "transfer" ? <Transfer apiData={apiData} setCurrentState={setCurrentState} transferFields={transferFields} getReviewFields={handleGetReviewFields} /> : currentState === "review" ? <Review apiData={apiData} setCurrentState={setCurrentState} reviewFields={reviewFields} /> : ""
                      ) : (
                        <>
                        <ContentLoader
                          speed={1}
                          width={800}
                          height={200}
                          viewBox="-20 0 400 160"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        ></ContentLoader>
              
                        <ContentLoader
                          speed={1}
                          width={800}
                          height={200}
                          viewBox="-20 0 400 160"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        ></ContentLoader>
              
                        <ContentLoader
                          speed={1}
                          width={800}
                          height={200}
                          viewBox="-20 0 400 160"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        ></ContentLoader>
                      </>
                      )}
                  </div>
                  <div className='col-4 bg-white m-3 p-4 border rounded-3 mx-auto'>
                      <iframe
                          src={selectedFileurl}
                          className='w-100 h-100'
                      />
                  </div>
              </div>
          </div>
      </div>
  );
}
export default CreateRequest;
