import '../Sidenav/sidenav.css'
import { Link } from 'react-router-dom';
const hideSidenav = () => {
   
}
const Sidenav = () => {
    return (
        <div>
            <div id="sidenav" className="sidenav bg-dark">
                <ul className="main-ul">
                    <li>
                        <Link to={'/'} > <a onClick={hideSidenav()}><i className="fa fa-dashboard"></i> Dashboard </a></Link>
                    </li>
                    <li>
                        <a className="sidenav-menu"><i className="fa fa-group"></i> Customers
                            <span className="right-icon"><i className="fa fa-angle-down"></i></span>
                        </a>
                        <div id="sub-menu">
                            <ul>
                                <li>
                                    <Link to={'/add-customer'} ><a onClick={hideSidenav()}> Add Customer</a></Link>
                                </li>
                                <li>
                                    <Link to={'/customers'}><a onClick={hideSidenav()}>  Customer List</a></Link>
                                </li>
                            </ul>
                        </div>

                    </li>
                    <li>
                        <a className="sidenav-menu"><i className="fa fa-gears"></i> Stocks
                            <span className="right-icon"><i className="fa fa-angle-down"></i></span>
                        </a>
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={'/add-stock'} ><a onClick={hideSidenav()}> Add Stock</a></Link>
                                </li>
                                <li>
                                    <Link to={'/stocks'} ><a onClick={hideSidenav()}> Stock List  </a></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a className="sidenav-menu"><i className="fa fa-automobile"></i> Cars
                            <span className="right-icon">  <i className="fa fa-angle-down"></i></span>
                        </a>
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={'/cars'} >   <a onClick={hideSidenav()}>Car List  </a></Link>
                                </li>
                                <li>
                                    <Link to={'/add-car'} ><a onClick={hideSidenav()}> Entrance Form</a></Link>
                                </li>
                                <li>
                                    <Link to={'/car-leave'} > <a onClick={hideSidenav()}> Leave Form</a></Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link  to={'/add-employee'} ><a onClick={hideSidenav()}><i className="fa fa-briefcase"></i>  Employee</a></Link>
                        <Link to={'/employees'} ><a onClick={hideSidenav()}><i className="fa fa-briefcase"></i>  Employee</a>  </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidenav
