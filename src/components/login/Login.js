import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const login=(e)=>{
        console.log(inputUser);
        e.preventDefault()
      
    }
    //const navigate= useNavigate()
    let inputUser={userName:"", pass:""}
    const handleChange = (e) => {
            inputUser[e.target.name] = e.target.value
            localStorage.setItem('login', JSON.stringify(inputUser))
                //navigate('/')
    };

    return (
     <div className=' page-wrapper'>
        <div className="container "style={{height:'100vh'}}>
            <div className="card  " style={{ marginTop:"15%" ,marginLeft:"auto",marginRight:'auto', width: '320px' }}>
                <div className="card-body"style={{}}>
                    <h4 className="card-heading">Login Form</h4>
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input type="text" className="form-control" id="userName" name="userName" placeholder="Enter user name" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Password</label>
                            <input type="password" className="form-control" name="pass" id="pass" placeholder="Password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login