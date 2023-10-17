import React, { useEffect, useState } from "react";
import * as functions from "../js/expense.js";
import SideBar from "../../SideBar.js";
import { listinvoices, listcustomers } from "../js/invoices-function.js";
import BreadCrumbs from "../../structure/BreadCrumbs";

import AddNewAccountModal from "./Addbillsmodal.js";
import Tablelist from "./Tablelist.js";
import DetailsBar from "./Invoice/Detailsbarinvoice.js";
import Addinvoicemodal from "./Invoice/Addinvoicemodal.js";
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";

// Create a function to import all files from a directory dynamically
async function importAll(r) {
  const files = {};
  for (const key of r.keys()) {
    const fileName = key.replace("./", "");
    files[fileName] = await r(key);
  }
  return files;
}

export default function Verification() {
  debugger;
  const [pagename, setPagename] = useState("Invoices");
  const [assets, setAssets] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [customerdata, setCustomerdata] = useState([]);
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
  const [openmodal, setOpenmodal] = useState(false);
  const [notactivated, setNotactivated] = useState(false);
  const [invoice, setInvoice] = useState(true);

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
  const headers = [
    "RecipientName",
    "Status",
    "Description",
    "Request Date",
    "Due Date",
    "Email",
    "Created BY",
    "CompanyID",
  ];

  // Slice the tableData array based on the current page
  const currentPageData = tableData.slice(startIndex, endIndex);
  const options = [
    { value: "Date", label: "Date" },
    { value: "PaymentStatus", label: "Payment Status" },
    { value: "Billnumber", label: "Billnumber" },
  ];

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
    importNewCss();
    var internalbusinessid = sessionStorage.getItem("internalBusinessId");
    if (internalbusinessid) {
      listinvoices().then((fetchedData) => {
        // Assuming the listbills function returns an array of data
        setTableData(fetchedData);
        setNotactivated(true);
        console.log(fetchedData);
        if (fetchedData.length == 0) {
          sessionStorage.setItem("invoicefound", "N");
          setInvoice(false);
        }
      });
      listcustomers().then((fetchedData) => {
        setCustomerdata(fetchedData);
        console.log(fetchedData);
        if (fetchedData.length == 0) {
          // toast.error("No customer found")
        }
      });
    } else {
      setNotactivated(false);
    }

    sessionStorage.setItem("Page", "Invoices");
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
      <div>
        <div className="d-flex">
          <SideBar />
          <div
            className="container-fluid px-0 bg-light clear-left overflow-auto"
            style={{ height: "100vh" }}
          >
            <BreadCrumbs
              data={{
                name: "Invoices",
                img: "/arrows/arrowLeft.svg",
                backurl: "/expense",
                info: true,
              }}
            />
            {invoice ? (
              <div className="d-flex">
                <div className="row m-3 bg-white border p-4 d-flex rounded-3 flex-fill overflow-auto">
                  <div className="p-3 d-flex justify-content-between align-items-baseline">
                    <div>
                      <img
                        src="/Invoices.svg"
                        className={"bg-blue10 p-3 rounded-4 border d-block"}
                      />
                      <h5 className="text-nowrap m-0 mt-3 d-inline-block">
                        Invoices
                      </h5>
                    </div>
                    {notactivated ? (
                      <div className="text-white d-flex align-items-center">
                        <Addinvoicemodal customerdata={customerdata} />
                      </div>
                    ) : null}
                  </div>
                  {notactivated ? (
                    tableData.length === 0 ? (
                      // <div>Loading Invoices...</div>
                      <>
                        <ContentLoader
                          width={2500}
                          height={550}
                          viewBox="0 0 1000 550"
                          backgroundColor="#eaeced"
                          foregroundColor="#ffffff"
                          // {...props}
                        >
                          <rect
                            x="51"
                            y="45"
                            rx="3"
                            ry="3"
                            width="906"
                            height="17"
                          />
                          <circle cx="879" cy="123" r="11" />
                          <circle cx="914" cy="123" r="11" />
                          <rect
                            x="104"
                            y="115"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="305"
                            y="114"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="661"
                            y="114"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="55"
                            y="155"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <circle cx="880" cy="184" r="11" />
                          <circle cx="915" cy="184" r="11" />
                          <rect
                            x="105"
                            y="176"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="306"
                            y="175"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="662"
                            y="175"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="56"
                            y="216"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <circle cx="881" cy="242" r="11" />
                          <circle cx="916" cy="242" r="11" />
                          <rect
                            x="106"
                            y="234"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="307"
                            y="233"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="663"
                            y="233"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="57"
                            y="274"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <circle cx="882" cy="303" r="11" />
                          <circle cx="917" cy="303" r="11" />
                          <rect
                            x="107"
                            y="295"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="308"
                            y="294"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="664"
                            y="294"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="58"
                            y="335"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <circle cx="881" cy="363" r="11" />
                          <circle cx="916" cy="363" r="11" />
                          <rect
                            x="106"
                            y="355"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="307"
                            y="354"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="663"
                            y="354"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="57"
                            y="395"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <circle cx="882" cy="424" r="11" />
                          <circle cx="917" cy="424" r="11" />
                          <rect
                            x="107"
                            y="416"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="308"
                            y="415"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="664"
                            y="415"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="55"
                            y="453"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <rect
                            x="51"
                            y="49"
                            rx="3"
                            ry="3"
                            width="2"
                            height="465"
                          />
                          <rect
                            x="955"
                            y="49"
                            rx="3"
                            ry="3"
                            width="2"
                            height="465"
                          />
                          <circle cx="882" cy="484" r="11" />
                          <circle cx="917" cy="484" r="11" />
                          <rect
                            x="107"
                            y="476"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="308"
                            y="475"
                            rx="3"
                            ry="3"
                            width="299"
                            height="15"
                          />
                          <rect
                            x="664"
                            y="475"
                            rx="3"
                            ry="3"
                            width="141"
                            height="15"
                          />
                          <rect
                            x="55"
                            y="513"
                            rx="3"
                            ry="3"
                            width="897"
                            height="2"
                          />
                          <rect
                            x="52"
                            y="80"
                            rx="3"
                            ry="3"
                            width="906"
                            height="17"
                          />
                          <rect
                            x="53"
                            y="57"
                            rx="3"
                            ry="3"
                            width="68"
                            height="33"
                          />
                          <rect
                            x="222"
                            y="54"
                            rx="3"
                            ry="3"
                            width="149"
                            height="33"
                          />
                          <rect
                            x="544"
                            y="55"
                            rx="3"
                            ry="3"
                            width="137"
                            height="33"
                          />
                          <rect
                            x="782"
                            y="56"
                            rx="3"
                            ry="3"
                            width="72"
                            height="33"
                          />
                          <rect
                            x="933"
                            y="54"
                            rx="3"
                            ry="3"
                            width="24"
                            height="33"
                          />
                        </ContentLoader>
                      </>
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
                          <h3 className="m-0 ms-2">Invoices</h3>
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
                                You have not activated your accountyet.
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
                    </div> // Display a message if showTable is false
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
              </div>
            ) : (
              <div className="d-flex ">
                <div className="m-3 w-100">
                  <div className="row bg-white border p-4 d-flex rounded-3 w-100">
                    <h3 className="m-0 ms-2">Invoices</h3>
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
                            src="/invoiceup2lo.jpg"
                           // className=" border p-3 bg-grey"
                            style={{ maxWidth: "400px", maxHeight: "850px" }}
                          />
                        </div>
                      </div>

                      <p className="text-center pb-5 mb-5 mt-2 p-3">
                        <span className="fw-normal">
                          You have not added any Invoice yet.
                          <br />
                          <p className="text-center pb-3 mb-3 mt-2 p-3"></p>
                        </span>
                       
                        <span className="fw-normal"></span>
                        <div className="text-white d-flex justify-content-center align-items-center">
                          <Addinvoicemodal customerdata={customerdata} />
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
      </div>
    </>
  );
}
