import './App.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidenav from '../src/components/Sidenav/Sidenav.js'
import Topnav from './components/Topnav/Topnav.js'
import Wrapper from './components/Wrapper/Wrapper.js'
import AddCustomer from './components/Customers/AddCustomer';
import ShowCars from './components/Cars/ShowCars';
import ShowEmployees from './components/Employee/ShowEmployees';
import ShowStocks from './components/Stock/ShowStocks';
import ShowCustomers from './components/Customers/ShowCustomers';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCar from './components/Cars/AddCar';
import AddStock from './components/Stock/AddStock';
import AddEmployee from './components/Employee/AddEmployee'
import Checkout from './components/Cars/Checkout'
import Test from './components/Test';
import  Login from './components/login/Login'
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css"
import { toast, ToastContainer } from 'react-toastify'


function App() {
    const  getLogin=()=>{ return JSON.parse(localStorage.getItem("login")|| JSON.stringify({userName:"",pass:""}));}
    
    const [login , setlogin]= useState(getLogin())
   let loginState=(login.userName=="user" && login.pass=='pass')? true: false
   
  return !loginState ? <Login></Login> : (
    <div className="App" id='app'>
       <>
         <ToastContainer autoClose="1500" />
         </>
      <Router>
        <Topnav></Topnav>
        <Sidenav></Sidenav>

        <div id='page-wrapper'>
        
          <Routes>
            
            <Route exact path='/' element={<Wrapper />} />
            <Route path='/add-customer' element={<AddCustomer />} />
            <Route path="/customers" element={<ShowCustomers />} />
            <Route path='/add-car' element={<AddCar />} />
            <Route path='/cars' element={<ShowCars />} />
            <Route path='/car-leave' element={<Checkout />} />
            <Route path='/add-stock' element={<AddStock />} />
            <Route path='/stocks' element={<ShowStocks />} />
            <Route path='/add-employee' element={<AddEmployee />} />
            <Route path='/employees' element={<ShowEmployees />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </Router>
    </div>


  );
}

export default App;
