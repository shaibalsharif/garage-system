import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const login = (e) => {
        //console.log(inputUser);
        e.preventDefault()
        localStorage.setItem('login', JSON.stringify(user))
        const x = document.getElementById('error')
        if (user.pass == 'pass') {
            x.innerHTML = ""

            navigate('/dashboard')
        }
        else {

            x.innerHTML = "WRONG ID & PASS"
        }

    }
    //const navigate= useNavigate()

    const [user, setUser] = useState({ userName: "", pass: "" })
    // const [pass,setPass]=useState("")

    const handleChange = (e) => {
        setUser({
            ...(user),
            [e.target.name]: e.target.value
        })

    };

    return (
        <div className=' page-wrapper w-full h-full'>
            <div className="container " style={{ height: '100vh' }}>
                <div className='text-center'>
                    <p id="error"></p>
                </div>
                <div className="card  " style={{ marginTop: "15%", marginLeft: "auto", marginRight: 'auto', width: '320px' }}>
                    <div className="card-body" style={{}}>
                        <h4 className="card-heading text-center text-2xl font-semibold p-4 uppercase tracking-widest">Login Form</h4>
                        <form onSubmit={login} className='border-2 p-4 rounded-md space-y-4'>
                            <div className="form-group">
                                <label htmlFor="userName">User Name</label>
                                <input type="text" className="p-1 form-control" id="userName" name="userName" placeholder="Enter user name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass">Password</label>
                                <input type="password" className="p-1 form-control" name="pass" id="pass" placeholder="Password" onChange={handleChange} />
                            </div>
                            <button type="submit" className="bg-blue-300 px-4 py-2 rounded-md ml-auto btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
