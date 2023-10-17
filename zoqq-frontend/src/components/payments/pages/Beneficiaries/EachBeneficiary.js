import React from "react";

function EachBeneficiary({ setShowDetails, data, color }) {
  debugger;
  function createShortForm(fullName) {
    const words = fullName.split(" ");
    let shortForm = words[0].charAt(0).toUpperCase();
    for (let i = 1; i < words.length; i++) {
      shortForm += words[i].charAt(0).toUpperCase();
    }
    return shortForm;
  }
  return (
    <div
      className="d-flex justify-content-between align-items-center hover p-3"
      role="button"
      onClick={() => setShowDetails({ show: true, data, color })}
    >
      <div className="d-flex align-items-center">
        <div
          className={"p-3 rounded-circle me-2 text-white" + color}
          style={{ width: 55, height: 55 }}
        >
          <div className="text-center">
            {createShortForm(data.beneficiaryName)}
          </div>
        </div>
        <div>
          <div>{data.beneficiaryName}</div>
          <div className="grey1">{data.beneficiaryEmail}</div>
        </div>
      </div>
      {/* <div>
                <a
                    className='nav-link border rounded-3 p-2'
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <img src="/threeDotsV.svg" />
                </a>
                <ul className="dropdown-menu py-4 px-2  " aria-labelledby="navbarDropdown">
                    <li>
                        <a className="dropdown-item fw-500" href="#" onClick={() => { setShowDetails({show: true, data, color}) }}>
                            Details
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item fw-500" href="#" onClick={(e)=>e.stopPropagation()}>
                            Send Money
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item fw-500" href="#" onClick={(e)=>e.stopPropagation()}>
                            Receive Money
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item fw-500" href="#" onClick={(e)=>e.stopPropagation()}>
                            <img src='/sidebar/profile/profile.svg' className='me-2' />
                            Edit
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item fw-500" href="#" onClick={(e)=>e.stopPropagation()}>
                            <img src='/sidebar/profile/profile.svg' className='me-2' />
                            Delete
                        </a>
                    </li>
                </ul>
            </div> */}
    </div>
  );
}

export default EachBeneficiary;
