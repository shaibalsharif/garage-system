import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Overview from '../pages/Dashboard/Overview';
import Reports from '../pages/Dashboard/Reports';
import CustomerList from '../pages/Customer/CustomerList.js';
import AddCustomer from '../pages/Customer/AddCustomer';
import AddStock from '../pages/Stock/AddStock';
import CarList from '../pages/Car/CarList';
import AddCar from '../pages/Car/AddCar';
import { useAuth }from '../context/AuthContext.js'; // Auth context hook for checking authentication
import Login from '../pages/auth/Login.js';
import Register from '../pages/auth/Register.js';
import ForgotPassword from '../pages/auth/ForgotPassword.js';
import Dashboard from "../pages/Dashboard/DashBoard.js"
import Inventory from '../pages/Stock/Inventory.js';
import Checkout from '../pages/Checkout/Checkout.js';
import Profile from '../Layout/Profile.js';

const PrivateRoute = ({ children }) => {


  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<Layout />}>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />

            {/* <Route path="/dashboard/overview" element={<Overview />} /> */}
            {/* <Route path="/dashboard/reports" element={<Reports />} /> */}
            <Route path="customers" element={<CustomerList />} />
            <Route path="add-customer" element={<AddCustomer />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-stock" element={<AddStock />} />
            <Route path="cars" element={<CarList />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="checkout" element={ <Checkout/>} />
            <Route path="profile" element={ <Profile/>} />
           {/* <Route path="employee/employee-list" element={<EmployeeList />} />
            <Route path="employee/add-employee" element={<AddEmployee />} /> */}
            {/* Add other private routes if needed */}
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}
