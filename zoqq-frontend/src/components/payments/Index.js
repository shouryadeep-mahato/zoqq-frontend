import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Payments from "./Payments";
import Beneficiaries from "./pages/Beneficiaries";
import { useLocation } from "react-router-dom";
import ReceiveMoney from "./pages/ReceiveMoney";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import CreateRequest from "./pages/ReceiveMoney/CreateRequest/CreateRequest";

function PaymentsHome() {
  const location = useLocation();
  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="d-flex">
        <SideBar />
        <div
          className="container-fluid px-0 bg-light clear-left overflow-auto"
          style={{ height: "100vh" }}
        >
          {url === "/payments" ? (
            <Payments />
          ) : url === "/payments/beneficiaries" ? (
            <Beneficiaries />
          ) : url === "/payments/receive-money" ? (
            <ReceiveMoney />
          ) : url === "/payments/send-money" ? (
            <SendMoney />
          ) : url === "/payments/transactions" ? (
            <Transactions />
          ) : url === "/payments/receive-money/create-request" ? (
            <CreateRequest />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentsHome;
