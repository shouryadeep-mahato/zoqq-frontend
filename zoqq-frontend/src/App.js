import React, { Component } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SideBar from "./components/SideBar";
import Accounts from "./components/accounts/Accounts";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/dashboard/Index";
import AccountsHome from "./components/accounts/Index";
import ExpenseHome from "./components/expense/pages/Expense";
import SettingsHome from "./components/settings/Index";
import PaymentsHome from "./components/payments/Index";
import Cards from "./components/expense/pages/Cards";
import Bills from "./components/expense/pages/Bills";
import CreateRequest from "./components/expense/pages/CreateBill";
import Verification from "./components/expense/pages/Invoices";
import CreateRequestinvoice from "./components/expense/pages/Invoice/CreateInvoice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Sign-up
import SignIn from "./components/Signup/pages/SignIn";
import Signup from "./components/Signup/pages/Signup";
import SignUpVerification from "./components/Signup/pages/SignUpVerification";
import BusinessDetails from "./components/Signup/pages/BusinessDetails";
import AccountSetup from "./components/Signup/pages/AccountSetup";
import AccountSetup2 from "./components/Signup/pages/AccountSetup2";
import Subscription from "./components/Signup/pages/Subscription";

//Business details
import Onboarding from "./components/onboarding/Account";

import SubscriptionDetails from "./components/settings/tabs/Subscription";
import PaymentHistory from "./components/settings/tabs/Subscription/PaymentHistory";
import CompareAllPlans from "./components/settings/tabs/Subscription/CompareAllPlans";
import Layout from "./components/structure/Layout";

class App extends Component {
  render() {
    var environment = "vercel";
    if (environment === "development") {
      sessionStorage.setItem("baseUrl", "http://localhost:9000");
    } else if (environment === "vercel") {
      sessionStorage.setItem("baseUrl", "https://zoqq-backend.vercel.app");
    } else {
      sessionStorage.setItem("baseUrl", "https://demo-zoqq.stylopay.com:9000");
    }
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
             
              <Route path="/" element={<Layout children={<SignIn />} />} />
              <Route path="/sign-up" element={<Layout children={<Signup />} />} />
              <Route path="/verification" element={<Layout children={<SignUpVerification />} />} />
              <Route path="/business-details" element={<Layout children={<BusinessDetails />} />} />
              <Route path="/account-setup" element={<Layout children={<AccountSetup />} />} />
              <Route path="/account-setup-2" element={<Layout children={<AccountSetup2 />} />} />
              <Route path="/subscription" element={<Layout children={<Subscription />} />} />
              

              <Route path="/dashboard" element={<Layout children={<Home isActivated={false} />} />} />
              <Route path="/dashboard/active" element={<Layout children={<Home isActivated={true} />} />} />
              <Route path="/accounts" element={<Layout children={<AccountsHome />} />} />
              <Route path="/accounts/global-accounts" element={<Layout children={<AccountsHome />} />} />
              <Route path="/accounts/conversion" element={<Layout children={<AccountsHome />} />} />
              <Route path="/accounts/statements" element={<Layout children={<AccountsHome />} />} />
              <Route path="/payments" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/payments/beneficiaries" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/payments/receive-money" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/payments/send-money" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/payments/transactions" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/payments/receive-money/create-request" element={<Layout children={<PaymentsHome />} />} />
              <Route path="/expense" element={<Layout children={<ExpenseHome />} />} />
              <Route path="/expense/invoices" element={<Layout children={<Verification />} />} />
              <Route path="/expense/bills" element={<Layout children={<Bills />} />} />
              <Route path="/expense/bills/createbill" element={<Layout children={<CreateRequest />} />} />
              <Route path="/expense/invoices/create-invoice" element={<Layout children={<CreateRequestinvoice />} />} />
              <Route path="/settings/*" element={<Layout children={<SettingsHome />} />} />
              <Route path="/settings/subscription/payment-history" element={<Layout children={<PaymentHistory />} />} />
              <Route path="/compare-plans" element={<Layout children={<CompareAllPlans />} />} />
              {/*<Route path="/settings/2FAsetup" element={<Home />} />
            <Route path="/settings/branding" element={<Home />} />
            <Route path="/settings/password" element={<Home />} />
            <Route path="/settings/subscription" element={<SubscriptionDetails />} />*/}
              <Route path="/expense/cards" element={<Layout children={<Cards />} />} />
             
              <Route path="/onboarding/Home" element={<Layout children={<Onboarding />} />} />
              
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </>
    );
  }
}

export default App;