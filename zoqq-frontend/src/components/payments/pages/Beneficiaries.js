import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../structure/BreadCrumbs";
import BeneficiariesList from "./Beneficiaries/BeneficiariesList";
import DetailsBar from "./Beneficiaries/DetailsBar";
import CreateNewBeneficiary from "./Beneficiaries/CreateNewBeneficiary";
import { listbeneficiaries } from "../js/ListBeneficiaries";
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";

function Beneficiaries() {
  debugger;
  const [showDetails, setShowDetails] = useState(false);
  const currencies = [true, true, true, true, false, false];
  const [beneficiaries, setBeneficiaries] = useState([]);
  const customerHashId = sessionStorage.getItem("customerHashId");

  useEffect(() => {
    debugger;
    if (customerHashId === null || customerHashId === undefined) {
      toast.error("No beneficiaries found, please activiate account first !");
      setBeneficiaries([]);
    } else {
      listbeneficiaries(customerHashId).then((response) => {
        console.log(response);
        setBeneficiaries(response) ;
      });
    }
  }, []);

  // useEffect(() => {
  //   listcountry().then((response) => {
  //     console.log(response);
  //     setcountryList(response);
  //   });
  // }, []);

  const [showArray, setShowArray] = useState(
    new Array(currencies.length).fill(false)
  );
  const [activeArray, setActiveArray] = useState(
    new Array(currencies.length).fill(false)
  );

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

  return (
    <>
      <BreadCrumbs
        data={{
          name: "Beneficiaries",
          img: "/arrows/arrowLeft.svg",
          backurl: "/payments",
          info: true,
        }}
      />

      <div className="d-flex">
        <div className="row m-3 bg-white border p-4 d-flex rounded-3 flex-fill">
          <div className="p-3 d-flex justify-content-between align-items-baseline">
            <div>
              <img
                src="/payments/beneficiaries.svg"
                className={"bg-blue10 p-3 rounded-4 border d-block"}
              />
              <h5 className="text-nowrap m-0 mt-3 d-inline-block">
                Beneficiaries
              </h5>
            </div>

            <div className="text-white d-flex align-items-center">
              <CreateNewBeneficiary customerHashId={customerHashId} />
            </div>
          </div>

          {Array.isArray(beneficiaries) && beneficiaries.length === 0 ? (
            // <div>Loading Beneficiaries...</div>
            <>
              {/* <ContentLoader
                height={1200}
                width={1060}
                primaryColor="#d9d9d9"
                secondaryColor="#ecebeb"
                //{...props}
              >
                <circle cx="44" cy="42" r="25" />
                <circle cx="44" cy="147" r="25" />
                <circle cx="44" cy="251" r="25" />
                <rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
                <rect x="102" y="152" rx="3" ry="3" width="171" height="6" />

                <rect x="105" y="117" rx="3" ry="3" width="123" height="7" />
                <rect x="104" y="222" rx="3" ry="3" width="123" height="7" />
                <rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
                <rect x="104" y="257" rx="3" ry="3" width="171" height="6" />
              </ContentLoader> */}
            </>
          ) : (
            <BeneficiariesList
              beneficiaries={beneficiaries}
              setShowDetails={setShowDetails}
            />
          )}
        </div>

        {showDetails?.show && (
          <DetailsBar
            setShowDetails={setShowDetails}
            data={showDetails?.data}
            handleShow={handleShow}
            handleActive={handleActive}
            color={showDetails?.color}
          />
        )}
      </div>
    </>
  );
}

export default Beneficiaries;
