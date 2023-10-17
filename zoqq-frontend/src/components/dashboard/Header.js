import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-yellow10 p-3 m-3 rounded-3 d-flex align-items-center">
      <img src="/lock_1.svg" />
      <h6 className="me-auto my-0 ms-2">
        Add business details to Activate Your Account and unlock all the
        features
      </h6>
      <Link to="/onboarding/Home">
        <button
          className="btn bg-white yellow100 ms-3 fw-500"
          style={{ letterSpacing: "0.5px" }}
        >
          ACTIVATE ACCOUNT
        </button>
      </Link>
    </div>
  );
}

export default Header;
