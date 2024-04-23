import '../Sidenav/sidenav.css'
import { Link } from 'react-router-dom';
import { useState } from 'react'
const Sidenav = ({ drawerState }) => {

    const [displayVal, setDisplayVal] = useState("")
    const handleMainUl = (e) => {
        let dom = document.getElementById('sidenav').getElementsByTagName("div");
        for (let i = 0; i < dom.length; i++) {
            if (dom[i].style.display == 'block') {
                dom[i].style.display = "none";
            }
        }

        if (displayVal != "") {
            if (displayVal == e.target.nextElementSibling.id) {
                e.target.nextElementSibling.style.display = 'none';
                setDisplayVal("")
            } else {
                setDisplayVal(e.target.nextElementSibling.id)
            }
        }
        else {
            e.target.nextElementSibling.style.display = 'block';
            setDisplayVal(e.target.nextElementSibling.id)
        }




        /* let x=e.target.nextElementSibling
        displayState=='none'? setDisplayState('block'):setDisplayState('none') */

    }
    const hideSidenav = (e) => {
        
        // handleclose(false)
        /*  let dom = document.getElementById('sidenav').getElementsByTagName("div");
      for (let i = 0; i < dom.length; i++) {
          dom[i].style.display = "none";
      }*/
    }


    return (
        <div className='sidenav h-[82vh] !w-full  bg-opacity-0'>
            <div id="sidenav" className="h-full w-[40%] lg:w-[25%] relative  pt-20 bg-black">


                   {/*  <svg
                    onClick={(e) => { console.log("hi");drawerState.setIsDrawerOpen(false) }}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth={1.5} stroke="white"
                        className="lg:hidden w-10 h-10 absolute top-12 right-2 rotate-90 cursor-pointer hover:scale-105 active:scale-95">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                    </svg>
               */}

                <ul className="main-ul">
                    <li>
                        <Link to={'/'} style={{ padding: 0 }}> <a className='sidenav-menu'><i className="fa fa-dashboard"></i> Dashboard </a></Link>
                    </li>
                    <li>
                        <a onClick={handleMainUl} className="sidenav-menu"><i className="fa fa-group"></i> Customers
                            <span className="right-icon"><i className="fa fa-angle-down"></i></span>
                        </a>
                        <div id="sub-menu-customer" className='sub-menu'  >
                            <ul>
                                <li>
                                    <Link to={'/add-customer'} ><a onClick={hideSidenav}>Add Customer</a></Link>
                                </li>
                                <li>
                                    <Link to={'/customers'}><a onClick={hideSidenav}>Customer List</a></Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                    <li>
                        <a onClick={handleMainUl} className="sidenav-menu"><i className="fa fa-gears"></i> Stocks
                            <span className="right-icon"><i className="fa fa-angle-down"></i></span>
                        </a>
                        <div id="sub-menu-stock" className='sub-menu'  >
                            <ul>
                                <li>
                                    <Link to={'/add-stock'} ><a onClick={hideSidenav}> Add Stock</a></Link>
                                </li>
                                <li>
                                    <Link to={'/stocks'} ><a onClick={hideSidenav}> Stock List  </a></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a onClick={handleMainUl} className="sidenav-menu"><i className="fa fa-automobile"></i> Cars
                            <span className="right-icon">  <i className="fa fa-angle-down"></i></span>
                        </a>
                        <div id="sub-menu-car" className='sub-menu'  >
                            <ul>
                                <li>
                                    <Link to={'/cars'} >   <a onClick={hideSidenav}>Car List  </a></Link>
                                </li>
                                <li>
                                    <Link to={'/add-car'} ><a onClick={hideSidenav}> Entrance Form</a></Link>
                                </li>
                                <li>
                                    <Link to={'/car-leave'} > <a onClick={hideSidenav}> Leave Form</a></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>

                        <a onClick={handleMainUl} className="sidenav-menu"><i className="fa fa-briefcase"></i> Employee
                            <span className="right-icon">  <i className="fa fa-angle-down"></i></span>
                        </a>

                        <div id="sub-menu-emp" className='sub-menu' >
                            <ul>
                                <li>
                                    <Link to={'/add-employee'} ><a onClick={hideSidenav}> Add Employee</a></Link>
                                </li>
                                <li>
                                    <Link to={'/employees'} ><a onClick={hideSidenav}>  Employee List  </a></Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidenav
