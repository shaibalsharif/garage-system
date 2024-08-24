import "../Sidenav/sidenav.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Tabs = ["dashboard", "customer", "stock", "car", "employee"];

const Sidenav = ({ drawerState, currentTab, setCurrentTab }) => {
  const location = useLocation()?.pathname;
  const role = Cookies.get("userRole");

  const hideSidenav = (e) => {
    // Function to handle side nav visibility
  };
  const handleMainUl = (e, type) => {
    setCurrentTab(type);
  };

  return (
    <div className="sidenav lg:h-[82vh] w-[25hw] bg-opacity-0 !overflow-hidden">
      <div id="sidenav" className="h-full w-full relative pt-20 bg-black">
        <ul className="main-ul">
          <li>
            <Link to={"/dashboard"} style={{ padding: 0 }}>
              <a
                onClick={(e) => handleMainUl(e, "dashboard")}
                className="sidenav-menu"
              >
                <i className="fa fa-dashboard"></i> Dashboard
              </a>
            </Link>
          </li>

          {role === "admin" || role === "sales" || role === "mechanic" ? (
            <li>
              <a
                onClick={(e) => handleMainUl(e, "customer")}
                className="sidenav-menu"
              >
                <i className="fa fa-group"></i> Customers
                <span className="right-icon">
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <div
                id="sub-menu-customer"
                className={`sub-menu ${
                  currentTab === "customer" ? "block" : "!hidden"
                }`}
              >
                <ul>
                  {(role === "admin" || role === "sales") && (
                    <li>
                      <Link to={"/add-customer"}>
                        <a onClick={hideSidenav}>Add Customer</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={"/customers"}>
                      <a onClick={hideSidenav}>Customer List</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ) : null}

          {role === "admin" || role === "sales" ? (
            <li>
              <a
                onClick={(e) => handleMainUl(e, "stock")}
                className="sidenav-menu"
              >
                <i className="fa fa-gears"></i> Stocks
                <span className="right-icon">
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <div
                id="sub-menu-stock"
                className={`sub-menu ${
                  currentTab === "stock" ? "block" : "!hidden"
                }`}
              >
                <ul>
                  <li>
                    <Link to={"/add-stock"}>
                      <a onClick={hideSidenav}>Add Stock</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/stocks"}>
                      <a onClick={hideSidenav}>Stock List</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ) : null}

          {role === "admin" || role === "mechanic" ? (
            <li>
              <a
                onClick={(e) => handleMainUl(e, "car")}
                className="sidenav-menu"
              >
                <i className="fa fa-automobile"></i> Cars
                <span className="right-icon">
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <div
                id="sub-menu-car"
                className={`sub-menu ${
                  currentTab === "car" ? "block" : "!hidden"
                }`}
              >
                <ul>
                  <li>
                    <Link to={"/cars"}>
                      <a onClick={hideSidenav}>Car List</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/add-car"}>
                      <a onClick={hideSidenav}>Add Car</a>
                    </Link>
                  </li>
                  {(role === "admin" || role === "sales") && (
                    <li>
                      <Link to={"/car-leave"}>
                        <a onClick={hideSidenav}>Car Leave Form</a>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ) : null}

          {role === "admin" ? (
            <li>
              <a
                onClick={(e) => handleMainUl(e, "employee")}
                className="sidenav-menu"
              >
                <i className="fa fa-briefcase"></i> Employees
                <span className="right-icon">
                  <i className="fa fa-angle-down"></i>
                </span>
              </a>
              <div
                id="sub-menu-employee"
                className={`sub-menu ${
                  currentTab === "employee" ? "block" : "!hidden"
                }`}
              >
                <ul>
                  <li>
                    <Link to={"/add-employee"}>
                      <a onClick={hideSidenav}>Add Employee</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/employees"}>
                      <a onClick={hideSidenav}>Employee List</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
