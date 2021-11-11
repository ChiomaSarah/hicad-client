import React from "react";
import { Link } from "react-router-dom";
import useToken from "../useToken";

function Navbar() {
  const { token } = useToken();

  let buttons;

  if (token) {
    buttons = (
      <>
        <li className="nav-item">
          <Link to="/candidates" className="nav-link text-light">
            Candidates
          </Link>
        </li>
      </>
    );
  } else {
    buttons = (
      <>
        <li className="nav-item">
          <Link to="/admin/login" className="nav-link text-light">
            Admin
          </Link>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link to="/">
        <h4 className="text-light navbar-brand">Hicad</h4>
      </Link>

      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/job/application" className="nav-link text-light">
              Apply Here
            </Link>
          </li>
          {buttons}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
