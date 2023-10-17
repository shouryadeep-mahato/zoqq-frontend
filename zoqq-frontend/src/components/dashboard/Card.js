import React from "react";
import { Link } from "react-router-dom";

function Card({ isActivated }) {
  return (
    <div className="bg-white m-3 pb-3 border">
      <div className="d-flex align-items-center justify-content-between bg-white p-4">
        <div className="d-flex">
          <img src="/card.svg" />
          <h4 className="m-0 ms-2">Cards</h4>
        </div>

        {isActivated && (
          <Link to="/expense/corporate-cards" className="text-decoration-none blue100 m-0">
            {/* View All */}
          </Link>
        )}
      </div>
      {!isActivated ? (
        <>
          <div className="d-flex justify-content-center">
            <div>
              <img src="/lock_3.svg" className=" border p-3 bg-grey" />
            </div>
          </div>

          <p className="text-center pb-5 mb-5 mt-2 p-3">
            <span className="fw-normal">
              You don't have any cards yet.
              <br />
              To create cards, you need to{" "}
            </span>
            <Link to="/onboarding" className="blue100">
              Activate Your Account
            </Link>
            <span className="fw-normal"> first.</span>
          </p>
        </>
      ) : (
        // <div className="d-flex">
        //   <p className="text-center pb-5 mb-5 mt-2 p-3">
        //     <span className="fw-normal">
        //       You don't have any cards yet.
        //       <br />
        //       To create cards, you need to
        //     </span>
        //     <Link to="/onboarding" className="blue100">
        //       Activate Your Account
        //     </Link>
        //     <span className="fw-normal"> first.</span>
        //   </p>
        //   {/* <img className="mx-auto mb-3" src="card_image.svg" /> */}
        // </div>

        <>
          <div className="d-flex justify-content-center">
            <div>
              <img src="/lock_3.svg" className=" border p-3 bg-grey" />
            </div>
          </div>

          <p className="text-center pb-5 mb-5 mt-2 p-3">
            <span className="fw-normal">
              You don't have any cards yet.
              <br />
              To add cards,{" "}
            </span>
            <Link to="/expense/cards" className="blue100">
              Click Here
            </Link>
            <span className="fw-normal"> .</span>
          </p>
        </>
      )}
    </div>
  );
}

export default Card;
