import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ isActivated }) {
  const [username, setUsername] = useState("User");
  useEffect(() => {
    var contactName = sessionStorage.getItem("contactName");
    if (contactName) {
      setUsername(contactName.split(" ")[0]);
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand text-dark" to="/activate">
                    Hello, {username}!
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <form className="d-flex col-lg-6 bg-light border rounded-3 mx-2 my-2 my-lg-0 mx-auto">
                        <button className="btn" type="submit">
                            <img src='/search.svg' />
                        </button>
                        <input
                            className="form-control border-0 bg-light"
                            type="search"
                            placeholder="What do you want to find?"
                            aria-label="Search"
                        />
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {/* <li className="nav-item mx-2 my-2 my-lg-0">
                            <a className="nav-link border d-flex justify-content-center align-items-center" href="#">
                                <img src="/chat.svg" />
                                <p className='m-0 ms-2 d-lg-none'>Chat</p>
                            </a>
                        </li> */}
                        <li className="nav-item mx-2 my-2 my-lg-0">
                            <Link to="/notification" className="nav-link border d-flex justify-content-center align-items-center" href="#">
                                <img src="/notification.svg" />
                                <p className='m-0 ms-2 d-lg-none'>Notifications</p>
                            </Link>
                        </li>


                    </ul>

                </div>
            </div>
        </nav>
  );
}

export default Navbar;
