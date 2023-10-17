import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../structure/BreadCrumbs";
import TransactionList from "./ReceiveMoney/TransactionList";
import DetailsBar from "./ReceiveMoney/DetailsBar";
import CreateNewRequest from "./ReceiveMoney/CreateNewRequest";
import Recipient from "./SendMoney/Recipient";
import Amount from "./SendMoney/Amount";
import OverView from "./SendMoney/OverView";
import Response from "./SendMoney/Response";
import { listbeneficiaries } from "../js/ListBeneficiaries";
import { fetchCurrency } from "../js/ListBeneficiaries";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SendMoney() {
  debugger;
  const customerHashId = sessionStorage.getItem("customerHashId");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const beneficiaryName = queryParams.get("beneficiaryName");
  const beneficiaryHashId = queryParams.get("beneficiaryHashId");
  const beneficiaryAccountNumber = queryParams.get("beneficiaryAccountNumber");
  const [currentState, setCurrentState] = useState("recipient");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [currency, setcurrency] = useState([]);
  const [paymentbody, setpaymentbody] = useState({
    beneficiaryAccountNumber: "",
    benificiaryname: "",
    beneficiaryid: "",
    customerComments: "",
    source_currency: "",
    source_amount: "",
    purposeCode: "",
    sourceOfFunds: "",
    exemptionCode: "",
  });

  useEffect(() => {
    if (beneficiaryName === null && beneficiaryHashId === null) {
      if (customerHashId === null || customerHashId === undefined) {
        toast.error("No beneficiaries found, please activiate account first !");
        setBeneficiaries([]);
      } else {
        // Only execute listbeneficiaries when both beneficiaryName and beneficiaryHashId are null
        listbeneficiaries(customerHashId).then((response) => {
          console.log(response);
          setBeneficiaries(response);
        });
      }
    }
    if (customerHashId === null || customerHashId === undefined) {
      setcurrency([]);
    } else {
      fetchCurrency(customerHashId).then((response) => {
        console.log(response);
        setcurrency(response);
      });
    }
  }, []);
  return (
    <>
      <BreadCrumbs
        data={{
          name: "Send Money",
          img: "/arrows/arrowLeft.svg",
          backurl: "/payments",
          info: true,
        }}
      />

      {currentState === "recipient" ? (
        <Recipient
          beneficiaries={beneficiaries}
          setCurrentState={setCurrentState}
          beneficiaryName={beneficiaryName}
          beneficiaryHashId={beneficiaryHashId}
          paymentbody={paymentbody}
          setpaymentbody={setpaymentbody}
        />
      ) : currentState === "overview" ? (
        <OverView
          setCurrentState={setCurrentState}
          paymentbody={paymentbody}
          customerHashId={customerHashId}
          beneficiaryName={beneficiaryName}
          beneficiaryAccountNumber={beneficiaryAccountNumber}
        />
      ) : currentState === "response" ? (
        <Response
          setCurrentState={setCurrentState}
          // setpaymentbody={setpaymentbody}
          paymentbody={paymentbody}
        />
      ) : currentState === "amount" ? (
        <Amount
          currency={currency}
          setCurrentState={setCurrentState}
          paymentbody={paymentbody}
          setpaymentbody={setpaymentbody}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default SendMoney;
