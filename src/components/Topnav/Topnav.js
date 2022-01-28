import './topnav.css'
const Topnav = () => {
    return (
        <div className="navbar fixed-top navbar-expand-lg nav-dark bg-dark"
            style={{ zIndex: '2', borderBottom: "1px solid" }}>

            <img src='images/icon.png' alt="Garage" width="80" />
            <button className="navbar-toggler">
            <i className="fa fa-bars fa-fw" style={{color:"#fff"}}></i>
        </button>

        <div className="navbar-collapse" >
            <ul className="navbar-nav mr-auto">
            </ul>
            <ul className="navbar-nav" >
                <li className="nav-item">
                    <div className="nav-link">
                        <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link">
                        <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </div>
                </li>
                <li className="nav-item">
                    <div id="ngbDropdown" className="nav-link dropdown" placement="bottom-right">
                        <span id="user" className="dropdown-toggle" style={{cursor:"pointer"}} data-bs-toggle="dropdown">
                            <i className="fa fa-user fa-fw"></i>
                        </span>
                        <div  className='dropdown-menu' id= "ngbDropdownMenu" aria-labelledby='user' >
                            <button className="dropdown-item" href="#" >Logout</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        </div>

    )
}

export default Topnav
