import React, { useEffect, useState } from "react";
import * as functions from "../js/expense.js";
import SideBar from "../../SideBar.js";
import { listbills } from "../js/bills-functions.js";
import BreadCrumbs from "../../structure/BreadCrumbs";

import AddNewAccountModal from "./Addbillsmodal.js";
import Tablelist from "./Tablelist.js";
import DetailsBar from "./DetailsBar.js";
import ContentLoader from "react-content-loader";

// Create a function to import all files from a directory dynamically
async function importAll(r) {
  const files = {};
  for (const key of r.keys()) {
    const fileName = key.replace("./", "");
    files[fileName] = await r(key);
  }
  return files;
}

export default function Bills() {
  debugger;
  const [pagename, setPagename] = useState("Bills");
  const [assets, setAssets] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [val, setVal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const [showDetails, setShowDetails] = useState(false);
  const currencies = [true, true, true, true, false, false];
  const [showArray, setShowArray] = useState(
    new Array(currencies.length).fill(false)
  );
  const [activeArray, setActiveArray] = useState(
    new Array(currencies.length).fill(false)
  );
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [bill, setBill] = useState(true);

  const handleShow = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setShowArray(array);
  };

  const handleActive = (idx) => {
    const array = new Array(currencies.length).fill(false);
    array[idx] = true;
    setActiveArray(array);
  };

  // Calculate the start and end indices of rows to display
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = tableData.slice(startIndex, endIndex);
  const headers = [
    "Bill No",
    "Status",
    "Recipient Name",
    "Source Of Fund",
    "Due Date",
    "Amount",
  ];

  // Slice the tableData array based on the current page

  const [showtable, setShowtable] = useState(false);
  useEffect(() => {
    // Use require.context to get all files from the directory
    const requireContext = require.context(
      "../assets/Home/public",
      false,
      /\.(svg|png|jpg|jpeg|gif|png)$/
    );

    // Call the function and get all files in the directory
    importAll(requireContext).then((fetchedAssets) => {
      setAssets(fetchedAssets);
    });
    // clearPreviousStyleTags();
    var internalbusinessid = sessionStorage.getItem("internalBusinessId");

    
    importNewCss();
    if (internalbusinessid) {
      listbills().then((fetchedData) => {
        // Assuming the listbills function returns an array of data
        setTableData(fetchedData);
        setShowtable(true);
        if(fetchedData.length==0){
          sessionStorage.setItem("Billfound","N")
        }
        else{
          sessionStorage.setItem("Billfound","Y")
        }
        var billfound =sessionStorage.getItem("Billfound");
    console.log(billfound)
    if(billfound==="N"){debugger
      setBill(false)
    }
    // else{
    //   setBill(!bill)
    // }
      });
    } else {
      setShowtable(false);
    }

    const options = [
      { value: "Date", label: "Date" },
      { value: "PaymentStatus", label: "Payment Status" },
      { value: "Billnumber", label: "Billnumber" },
    ];
  }, [pagename]);

  // Function to dynamically import the new CSS file
  const importNewCss = async () => {
    try {
      const css = await import("../css/global.css");
      const css1 = await import("../css/index.css");
      const css2 = await import("../css/index-copy.css");
      const css3 = await import("../css/global-copy.css");
      const css4 = await import("../css/bills.css");
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  if (!assets) {
    return <div>Loading...</div>;
  }
  if (!tableData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex">
        <SideBar />
        <div
          className="container-fluid px-0 bg-light clear-left overflow-auto"
          style={{ height: "100vh" }}
        >
          <BreadCrumbs
            data={{
              name: "Bills",
              img: "/arrows/arrowLeft.svg",
              backurl: "/expense",
              info: true,
            }}
          />
          {bill?(<div className="d-flex">
            <div className="row m-3 bg-white border p-4 d-flex rounded-3 flex-fill overflow-auto">
              <div className="p-3 d-flex justify-content-between align-items-baseline">
                <div>
                  <img
                    src="/payments/receive-money.svg"
                    className={"bg-green10 p-3 rounded-4 border d-block"}
                  />
                  <h5 className="text-nowrap m-0 mt-3 d-inline-block">Bills</h5>
                </div>
                {showtable ? (
                  <div className="text-white d-flex align-items-center">
                    <buttton
                      type="button"
                      className="button-main"
                      data-bs-toggle="modal"
                      data-bs-target="#AddNewAccountModal"
                    >
                      <img
                        className="info-circle-icon"
                        alt=""
                        src="/sidebar/expense/plus.svg"
                      />

                      <div className="label">New Bill</div>
                    </buttton>
                  </div>
                ) : null}
              </div>
              {showtable ? ( // Render the table if showTable is true
                tableData.length === 0 ? (
                  <ContentLoader
                    width={2500}
                    height={550}
                    viewBox="0 0 1000 550"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                  >
                    {/* ContentLoader content */}
                  </ContentLoader>
                ) : (
                  <div className="overflow-auto">
                    <Tablelist
                      data={currentPageData}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                      headers={headers}
                      setShowDetails={setShowDetails}
                      setSelectedRowData={setSelectedRowData}
                      pagename={pagename}
                    />
                  </div>
                )
              ) : (
                <div className="d-flex ">
                  <div className="m-3 w-100">
                    <div className="row bg-white border p-4 d-flex rounded-3 w-100">
                      <h3 className="m-0 ms-2">Bills</h3>
                      <div className="p-3">
                        <div className="bg-blue10 p-3 rounded-4 border d-inline-block">
                          {/* <AiFillBank className='blue100' size={50} /> */}
                        </div>
                        <br />
                        <div className="d-flex justify-content-center">
                          <div>
                            <img
                              src="/lock_3.svg"
                              className=" border p-3 bg-grey"
                            />
                          </div>
                        </div>

                        <p className="text-center pb-5 mb-5 mt-2 p-3">
                          <span className="fw-normal">
                            You have not activated your account yet.
                            <br />
                          </span>
                          <a href="/onboarding/Home" className="blue100">
                            Activate Your Account
                          </a>
                          <span className="fw-normal"> first.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                // Display a message if showTable is false
              )}
            </div>

            {showDetails && (
              <DetailsBar
                setShowDetails={setShowDetails}
                handleShow={handleShow}
                handleActive={handleActive}
                selectedRowData={selectedRowData}
              />
            )}
          </div>):(
            
            <div className="d-flex ">
            <div className="m-3 w-100">
              <div className="row bg-white border p-4 d-flex rounded-3 w-100">
                <h3 className="m-0 ms-2">Bills</h3>
                <div className="p-3">
                  <div className="bg-blue10 p-3 rounded-4 border d-inline-block">
                  <img
                    src="/payments/receive-money.svg"
                    className={"bg-green10 p-3 rounded-4 border d-block"}
                  />
                    {/* <AiFillBank className='blue100' size={50} /> */}
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src="/BILL2.jpg"
                        //className=" border p-3 bg-grey"
                        style={{ maxWidth: '300px', maxHeight: '750px' }}
                      />
                    </div>
                  </div>

                  <p className="text-center pb-5 mb-5 mt-2 p-3">
                    <span className="fw-normal">
                      You have not added any Bill yet.
                      <br />
                      <p className="text-center pb-3 mb-3 mt-2 p-3"></p>
                    </span>
                    <div className="text-white d-flex justify-content-center align-items-center">
                    <buttton
                      type="button"
                      className="button-main"
                      data-bs-toggle="modal"
                      data-bs-target="#AddNewAccountModal"
                    >
                      <img
                        className="info-circle-icon"
                        alt=""
                        src="/sidebar/expense/plus.svg"
                      />

                      <div className="label">Add Your First Bill</div>
                    </buttton>
                  </div>
                    {/* <span className="fw-normal"> first.</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
          
        </div>
      </div>

      <div>
        <AddNewAccountModal />
      </div>
    </>
  );
}
