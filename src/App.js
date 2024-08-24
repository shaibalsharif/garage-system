import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidenav from "./components/Sidenav/Sidenav.js";
import Topnav from "./components/Topnav/Topnav.js";
import Wrapper from "./components/Wrapper/Wrapper.js";
import AddCustomer from "./pages/AddCustomer";
import CarList from "./pages/CarList";
import EmployeeList from "./pages/EmployeeList";
import StockList from "./pages/StockList";
import CustomerList from "./pages/CustomerList";
import AddCar from "./pages/AddCar";
import AddStock from "./pages/AddStock";
import AddEmployee from "./pages/AddEmployee";
import Checkout from "./pages/Checkout.js";
import Login from "./pages/Login.js";
import Cookies from "js-cookie";
import Register from "./pages/Register.js";
import Dashboard from "./pages/DashBoard.js";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const fallback = <Login />;

  const ProtectedRoute = ({ element, allowedRoles }) => {
    
    const role = Cookies.get("userRole");

    // const token = Cookies.get("accessToken");
    if (!role) return fallback;
    if (!allowedRoles) return element;
    return allowedRoles && allowedRoles.includes(role) ? (
      element
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <div className="App h-screen overflow-y-scroll w-full" id="app">
      <Router className="flex gap-2">
        <Topnav drawerState={{ isDrawerOpen, setIsDrawerOpen }} />
        <div className={`hidden lg:block w-full bg-black`}>
          <Sidenav
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            drawerState={{ isDrawerOpen, setIsDrawerOpen }}
          />
        </div>
        {isDrawerOpen ? (
          <div className={`block lg:hidden w-full bg-black overflow-hidden`}>
            <Sidenav
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              drawerState={{ isDrawerOpen, setIsDrawerOpen }}
            />
          </div>
        ) : null}

        <div className="my-4" id="page-wrapper">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute element={<Wrapper />} fallback={<Login />} />
              }
            />
            <Route path="/register" element={<Register />} />
            {/*  <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Wrapper />} />}
            /> */}
            <Route
              path="/add-customer"
              element={
                <ProtectedRoute
                  element={<AddCustomer />}
                  allowedRoles={["admin", "sales"]}
                />
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute
                  element={<CustomerList />}
                  allowedRoles={["admin", "sales", "mechanic"]}
                />
              }
            />
            <Route
              path="/add-car"
              element={
                <ProtectedRoute
                  element={<AddCar />}
                  allowedRoles={["admin", "mechanic"]}
                />
              }
            />
            <Route
              path="/cars"
              element={
                <ProtectedRoute
                  element={<CarList />}
                  allowedRoles={["admin", "mechanic"]}
                />
              }
            />
            <Route
              path="/car-leave"
              element={
                <ProtectedRoute
                  element={<Checkout />}
                  allowedRoles={["admin", "sales"]}
                />
              }
            />
            <Route
              path="/add-stock"
              element={
                <ProtectedRoute
                  element={<AddStock />}
                  allowedRoles={["admin", "sales"]}
                />
              }
            />
            <Route
              path="/stocks"
              element={
                <ProtectedRoute
                  element={<StockList />}
                  allowedRoles={["admin", "sales", "mechanic"]}
                />
              }
            />
            <Route
              path="/add-employee"
              element={
                <ProtectedRoute
                  element={<AddEmployee />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute
                  element={<EmployeeList />}
                  allowedRoles={["admin"]}
                />
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div className="w-full text-center text-3xl font-semibold">PAGE NOT FOUND</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
