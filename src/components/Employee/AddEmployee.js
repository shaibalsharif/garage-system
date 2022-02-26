import StockFormTemplate from '../Stock/StockFormTemplate'
import { useState } from 'react';
import { newEmp, testEmps } from '../../assets/DataModel';
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'
import { apiURL } from '../../assets/api';
import { toast } from 'react-toastify';
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
            <div className="card-body">
                <form onSubmit={submitEmp}>
                    <div className="row">

                        <StockFormTemplate
                            htmlFor={'firstName'} title={'First Name'} id_name={'firstName'} onChange={handleChange}
                        />
                        <StockFormTemplate
                            htmlFor={'lastName'} title={'Last Name'} id_name={'lastName'} onChange={handleChange}
                        />
                    </div>
                    <div className="row">
                        <StockFormTemplate htmlFor={"dob"} title={"Date of Birth"} type={"date"} id_name={"dob"} onChange={handleChange} />
                        <StockFormTemplate isSelect={true} htmlFor={'gender'} title={"Gender"} id_name={"gender"}
                            options={["Male", "Female"]} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <StockFormTemplate htmlFor={"email"} title={"Email"} type={"text"} id_name={"email"} onChange={handleChange} />
                        <StockFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} id_name={"phone"} onChange={handleChange} />

                    </div>
                    <div className="row">
                        <StockFormTemplate htmlFor={'joinDate'} title={"Joining Date"} id_name={"joinDate"}
                            type={'date'} onChange={handleChange} />
                        <StockFormTemplate htmlFor={"emergency"}
                            title={"Emergency Contact"} id_name={"emergency"} onChange={handleChange} />

                    </div>

                    <div className="form-group">
                        <label htmlFor={'address'}>{'Address'}</label>
                        <textarea className={"form-control"} id={'address'} name={"address"} onChange={handleChange} />
                    </div>



                    <button type="submit" className="btn btn-primary mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>
};

export default AddEmployee;
