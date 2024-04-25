import CustomerFormTemplate from "../components/Customers/CustomerFormTemplate";
import { useState } from 'react'
import { newCustomer } from "../assets/DataModel";
import { testCustomers } from "../assets/DataModel";
import { useNavigate } from 'react-router-dom'
import { apiURL } from '../assets/api'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Input from "../components/Inputs";
import axios from "axios";

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

       
        axios.post(`http://localhost:3000/api/customers/add`,customerDetails)
        .then(res=>{
            console.log(res);
        })
        .catch(e=>{
            console.log(e);
        })
        // let tempCustomer = { ...customerDetails };
        // if (tempCustomer.firstName.trim() != "" && tempCustomer.lastName.trim() != "" && tempCustomer.dob.trim() != "" &&
        //     tempCustomer.gender.trim() != "" && tempCustomer.phone.trim() != "" && tempCustomer.email.trim() != "" &&
        //     tempCustomer.address.trim() != "") {
        //     tempCustomer.name = tempCustomer.firstName[0].toUpperCase() +
        //         tempCustomer.firstName.substring(1) + " " +
        //         tempCustomer.lastName[0].toUpperCase() +
        //         tempCustomer.lastName.substring(1)
        //     apiURL.post('/customer.json', tempCustomer).then((response) => {
        //         e.target.reset();
        //         navigate("/customers")
        //     })
        //     toast.success("Added Customer", {
        //         className: "SUCCESS_TOAST",
        //         position: toast.POSITION.TOP_CENTER
        //     })



        // }
        // else {
        //     toast.error("Enter All Required Info ", {
        //         className: "ERROR_TOAST",
        //         position: toast.POSITION.TOP_CENTER
        //     })
        // }
    }

    return <div className="container">

        <h2>Add Customer</h2>
        <div className="card">
            <div className="card-body px-2 md:px-[8%] lg:px-[15%]">
                <form onSubmit={submitCustomer}>


                    <div className="lg:flex gap-2 justify-between items-center">
                        <Input name={"first_name"} label={"First Name"} type={"text"} onChange={handleChange} />
                        <Input name={"last_name"} label={"Last Name"} type={"text"} onChange={handleChange} />

                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">
                        <Input name={"dob"} label={"Date of Birth"} type={"date"} onChange={handleChange} />
                        <Input name={"sex"} label={"Sex"} type={"dropdown"} options={['male', 'female']} onChange={handleChange} />


                        {/* <CustomerFormTemplate isSelect={true} htmlFor={"gender"} title={"Gender"} id_name={"gender"} onChange={handleChange} /> */} </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"email"} label={"Email"} type={"email"} onChange={handleChange} />
                        <Input name={"phone"} label={"Phone No."} type={"text"} onChange={handleChange} />
                        {/* 
                        <CustomerFormTemplate htmlFor={"email"} title={"Email"} type={"email"} id_name={"email"} onChange={handleChange} />
                        <CustomerFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} id_name={"phone"} onChange={handleChange}>
                        </CustomerFormTemplate> */}
                    </div>
                 {/*    <Input name={"address"} label={"Address"} type={"textarea"} onChange={handleChange} /> */}

                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"address_name"} label={"Address Name"} type="text" onChange={handleChange} />
                        <Input name={"address_type"} label={"Address Type"} type="dropdown" options={['Primary', 'Secondary']} onChange={handleChange} />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"house_no"} label={"House"} type="text" onChange={handleChange} />

                        <Input name={"road_no"} label={"Road"} type="text" onChange={handleChange} />
                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"city"} label={"City"} type="text" onChange={handleChange} />
                        <Input name={"country"} label={"Country"} type="text" onChange={handleChange} />
                    </div>
                    <Input name={"postal_code"} label={"Postal Code"} type="number" onChange={handleChange} />

                    {/* <CustomerFormTemplate isAddress={true} htmlFor={'address'} title={"Address"} type={"text"} id_name={"address"} onChange={handleChange} /> */}
                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>


};

export default AddCustomer;
