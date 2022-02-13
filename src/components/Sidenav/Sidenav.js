import '../Sidenav/sidenav.css'
import { Link } from 'react-router-dom';
const Sidenav = () => {


    const handleMainUl = (e) => { /*
        console.log(e.target.nextSibling);
        e.target.nextSibling.nextElementSibling.style.display = 'block';
        */
        
    }
    const hideSidenav = (e) => {
          /*  let dom = document.getElementById('sidenav').getElementsByTagName("div");
        for (let i = 0; i < dom.length; i++) {
            dom[i].style.display = "none";
        }*/
    }
    

    return (
        <div>
            <div id="sidenav" className="sidenav bg-dark">
                <ul className="main-ul">
                    <li>
                      <Link to={'/'} style={{padding:0}}> <a onClick={handleMainUl} className='sidenav-menu'><i className="fa fa-dashboard"></i> Dashboard </a></Link>
                    </li>
                    <li>
                        <a onClick={handleMainUl} className="sidenav-menu"><i className="fa fa-group"></i> Customers
                            <span className="right-icon"><i className="fa fa-angle-down"></i></span>
                        </a>
                        <div id="sub-menu" >
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
                        <div id="sub-menu" >
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
                        <div id="sub-menu"  >
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

                        <div id="sub-menu" >
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
