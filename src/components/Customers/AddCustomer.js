import CustomerFormTemplate from "./CustomerFormTemplate";
import { useState } from 'react'
import { newCustomer } from "../../assets/DataModel";
import { testCustomers } from "../../assets/DataModel";
import { useNavigate } from 'react-router-dom'
import { apiURL } from '../../assets/api'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const AddCustomer = () => {

    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState(newCustomer)




    const handleChange = (e) => {
        setCustomerDetails({
            ...(customerDetails),
            [e.target.name]: e.target.value

        });

    };

    const submitCustomer = (e) => {
        e.preventDefault();
        let tempCustomer = { ...customerDetails };
        if(tempCustomer.firstName.trim()!=""&&tempCustomer.lastName.trim()!=""&&tempCustomer.dob.trim()!=""&&
        tempCustomer.gender.trim()!=""&&tempCustomer.phone.trim()!=""&&tempCustomer.email.trim()!=""&&
        tempCustomer.address.trim()!="" ){
            tempCustomer.name = tempCustomer.firstName[0].toUpperCase() +
            tempCustomer.firstName.substring(1) + " " +
            tempCustomer.lastName[0].toUpperCase() +
            tempCustomer.lastName.substring(1)
        apiURL.post('/customer.json', tempCustomer).then((response) => {
            e.target.reset();
            navigate("/customers")
        })
        toast.success("Added Customer", {
            className: "SUCCESS_TOAST",
            position: toast.POSITION.TOP_CENTER
        })



        }
        else{
            toast.error("Enter All Required Info ", {
                className: "ERROR_TOAST",
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    return <div className="container">

        <h2>Add Customer</h2>
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitCustomer}>


                    <div className="row">
                        <CustomerFormTemplate htmlFor={"firstName"} title={"First Name"} type={"text"} id_name={"firstName"} onChange={handleChange} />
                        <CustomerFormTemplate htmlFor={"lastName"} title={"Last Name"} type={"text"} id_name={"lastName"} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <CustomerFormTemplate htmlFor={"dob"} title={"Date of Birth"} type={"date"} id_name={"dob"} onChange={handleChange} />
                        <CustomerFormTemplate isSelect={true} htmlFor={"gender"} title={"Gender"} id_name={"gender"} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <CustomerFormTemplate htmlFor={"email"} title={"Email"} type={"email"} id_name={"email"} onChange={handleChange} />
                        <CustomerFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} id_name={"phone"} onChange={handleChange}>
                        </CustomerFormTemplate>
                    </div>
                    <CustomerFormTemplate isAddress={true} htmlFor={'address'} title={"Address"} type={"text"} id_name={"address"} onChange={handleChange} />
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>


};

export default AddCustomer;
