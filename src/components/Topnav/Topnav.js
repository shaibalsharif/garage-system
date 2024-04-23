import './topnav.css'
// import logo from ''
import { useNavigate } from 'react-router-dom'
const Topnav = ({drawerState}) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem('login', JSON.stringify({ userName: "", pass: "" }))
        navigate('/')
    }
    return (

        <div className="sticky top-0  h-20 bg-black text-white px-4 grid grid-cols-12 overflow-hidden"
            style={{ zIndex: '2', borderBottom: "1px solid" }}>

            <button onClick={(e)=>{drawerState.setIsDrawerOpen(!drawerState.isDrawerOpen )}}
             className={` col-start-1 navbar-toggler lg:hidden`}>
                <i className="fa fa-bars fa-fw fa-lg scale-125" style={{ color: "#fff" }}></i>
            </button>
            <img className='h-[80px]' src='images/favicon.ico' />





            <ul className="col-start-9 flex px-2 col-span-4 flex-row items-end justify-center" >
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
                        <span id="user" className="dropdown-toggle" style={{ cursor: "pointer" }} data-bs-toggle="dropdown">
                            <i className="fa fa-user fa-fw"></i>
                        </span>
                        <div className='dropdown-menu' id="ngbDropdownMenu" aria-labelledby='user' style={{ left: "-93px" }}>
                            <button className="dropdown-item text-center" href="#" onClick={logout}  >Logout</button>
                        </div>
                    </div>
                </li>
            </ul>

        </div>

    )
}

export default Topnav
