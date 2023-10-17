import React from "react";
import EachCard from "../structure/EachCard";
import BreadCrumbs from "../structure/BreadCrumbs";
//import RecentTransactions from "../structure/RecentTransactions/RecentTransactions";

function Accounts() {
  const data = [
    {
      id: 1,
      color: "blue",
      title: "Beneficiaries",
      subtitle:
        "Move funds across your currency accounts to facilitate payments in your desired currency.",
      img: "/payments/beneficiaries.svg",
      url: "/payments/beneficiaries",
    },
    {
      id: 2,
      color: "green",
      title: "Receive Money",
      subtitle:
        "Move funds across your currency accounts to facilitate payments in your desired currency.",
      img: "/payments/receive-money.svg",
      url: "/payments/receive-money",
    },
    {
      id: 3,
      color: "yellow",
      title: "Send Money",
      subtitle:
        "Move funds across your currency accounts to facilitate payments in your desired currency.",
      img: "/payments/send-money.svg",
      url: "/payments/send-money",
    },
  ];
  return (
    <>
      <BreadCrumbs
        data={{ name: "Payments", img: "/accounts/accounts.svg", backurl: "/" }}
      />

      <div className="row">
        {data.map((eachData) => (
          <EachCard key={eachData.id} data={eachData} />
        ))}
      </div>
    </>
  );
}

export default Accounts;
