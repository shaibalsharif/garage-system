import './App.css';



import Sidenav from '../src/components/Sidenav/Sidenav.js'
import Topnav from './components/Topnav/Topnav.js'
import Wrapper from './components/Wrapper/Wrapper.js'
import AddCustomer from './pages/AddCustomer';
import CarList from './pages/CarList';
import EmployeeList from './pages/EmployeeList';
import StockList from './pages/StockList';
import CustomerList from './pages/CustomerList';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCar from './pages/AddCar';
import AddStock from './pages/AddStock';
import AddEmployee from './pages/AddEmployee'
import Checkout from './pages/Checkout.js'

import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify'
import Login from './pages/Login.js';




const App = () => {

  const getLogin = () => { return JSON.parse(localStorage.getItem("login") || JSON.stringify({ userName: "", pass: "" })); }


  const [loginState, setLoginState] = useState(false)

  const setState = () => {
    const login = getLogin()

    if (login.userName == "user" && login.pass == 'pass') {
      setLoginState(true)
    }
  }

  useEffect(() => {

    setState()

  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

 

  const [currentTab, setCurrentTab] = useState("dashboard")
  return (
    <div className="App h-screen overflow-y-scroll w-full " id='app'>
      <> <ToastContainer autoClose="1500" /> </>
      <Router className="flex gap-2">
        <Topnav drawerState={{ isDrawerOpen, setIsDrawerOpen }} />
        <div className={`hidden lg:block w-full bg-black`}>
          <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} drawerState={{ isDrawerOpen, setIsDrawerOpen }} />
        </div>
        {isDrawerOpen ? (<div className={`block lg:hidden w-full bg-black overflow-hidden`}>
          <Sidenav currentTab={currentTab} setCurrentTab={setCurrentTab} drawerState={{ isDrawerOpen, setIsDrawerOpen }}/>
        </div>)
          : <></>}


        <div className=' my-4 ' id='page-wrapper'>

          <Routes>

            <Route exact path='/' element={loginState ? <Wrapper /> : <Login />} />{/* 

            <Route exact path='/' element={loginState ? <Wrapper /> : <Login />} /> */}
            <Route exact path='/dashboard' element={<Wrapper />} />
            <Route path='/add-customer' element={<AddCustomer />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path='/add-car' element={<AddCar />} />
            <Route path='/cars' element={<CarList />} />
            <Route path='/car-leave' element={<Checkout />} />
            <Route path='/add-stock' element={<AddStock />} />
            <Route path='/stocks' element={<StockList />} />
            <Route path='/add-employee' element={<AddEmployee />} />
            <Route path='/employees' element={<EmployeeList />} />

            )

          </Routes>
        </div>
      </Router>
    </div>


  );
}

export default App;
