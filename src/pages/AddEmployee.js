import StockFormTemplate from '../components/Stock/StockFormTemplate'
import { useState } from 'react';
import { newEmp, testEmps } from '../assets/DataModel';
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'
import { apiURL } from '../assets/api';
import { toast } from 'react-toastify';
import Input from '../components/Inputs';


export const initEmployee = () => {
    return JSON.parse(localStorage.getItem('employees') || JSON.stringify(testEmps))
}
const AddEmployee = () => {
    const navigate = useNavigate();
    const [empDetails, setEmpDetails] = useState(newEmp)


    const handleChange = (e) => {
        setEmpDetails({
            ...(empDetails),
            [e.target.name]: e.target.value
        });
    };

    const submitEmp = (e) => {
        e.preventDefault();
        let tempEmp = { ...empDetails }
        tempEmp.name = tempEmp.firstName[0].toUpperCase() +
            tempEmp.firstName.substring(1) + " " +
            tempEmp.lastName[0].toUpperCase() +
            tempEmp.lastName.substring(1)

        apiURL.post('/employee.json', tempEmp).then((response) => {
            e.target.reset();
            navigate("/employees")
        })
        toast.success("Added Employee: " + tempEmp.name, {
            className: "SUCCESS_TOAST",
            position: toast.POSITION.TOP_CENTER
        })



    }
    return <div className="container">
        <h2>Employee Form</h2>
        <div className="card">
            <div className="card-body px-2 md:px-[8%] lg:px-[15%]">
                <form onSubmit={submitEmp}>
                    <div className="lg:flex gap-2 justify-between items-center">

                        <Input name={"firstName"} label={"First Name"} type={"text"} onChange={handleChange} />
                        <Input name={"lastName"} label={"Last Name"} type={"text"} onChange={handleChange} />


                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">
                        <Input name={"dob"} label={"Date of Birth"} type={"date"} onChange={handleChange} />
                        <Input name={"gender"} label={"Gender"} type={"dropdown"} options={['male', 'female']} onChange={handleChange} />

                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">

                        <Input name={"email"} label={"Email"} type={"email"} onChange={handleChange} />
                        <Input name={"phone"} label={"Phone No."} type={"text"} onChange={handleChange} />

                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">

                    <Input name={"joinDate"} label={"Joining Date"} type={"date"} onChange={handleChange} />
                    <Input name={"emergency"} label={"Emergency Contact"} type={"text"} onChange={handleChange} />

                  
                    </div>

                    <div className="form-group">
                        <label htmlFor={'address'}>{'Address'}</label>
                        <Input name={"address"} label={"Address"} type={"textarea"} onChange={handleChange} />
                    </div>



                    <button type="submit" className="btn btn-primary mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>
};

export default AddEmployee;
