import React from "react";
import Header from "./Header";
import Currencies from "./Currencies";
import RecentTransaction from "./RecentTransaction";
import Card from "./Card";
import CurrencyGraph from "./CurrencyGraph";
import UpdateToProCard from "./UpdateToProCard";
import AccountSecurityCard from "./AccountSecurityCard";
import RecentTransactions from "../structure/RecentTransactions/RecentTransactions";
import MostVisitedSection from "./MostVisitedSection";

function Dashboard({ isActivated }) {
  return (
    <div className="bg-light">
      {!isActivated && <Header />}

      <Currencies isActivated={isActivated} />

      <div className="cotainer-fluid row">
        <div className="col-12 col-md-7">
          {isActivated ? (
            <>
              <MostVisitedSection />
              <div className="m-3 bg-white border p-3">
                <RecentTransactions />
              </div>
            </>
          ) : (
            <RecentTransaction />
          )}
        </div>
        <div className="col-12 col-md-5">
          <Card isActivated={isActivated} />
          {isActivated && (
            <>
              <CurrencyGraph />
              <UpdateToProCard isActivated={isActivated} />
              <AccountSecurityCard isActivated={isActivated} />
            </>
          )}
        </div>
      </div>

      {!isActivated && (
        <div className="container-fluid row">
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <CurrencyGraph />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <UpdateToProCard isActivated={isActivated} />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <AccountSecurityCard isActivated={isActivated} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
