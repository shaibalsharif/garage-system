import { useState } from 'react'
import { newCustomer } from "../assets/DataModel";
import { useNavigate } from 'react-router-dom'
// import "react-toastify/dist/ReactToastify.css"
import Input from "../components/Inputs";
import axios from "axios";
import { showToast } from "../components/toast";
import Loading from "../components/Loader/Loading";

const AddCustomer = () => {
console.log("hhel");

    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState(newCustomer)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [error_message, set_error_message] = useState("")
    const base_url = process.env.REACT_APP_BACKEND_API
    const resetForm = () => {
        setCustomerDetails(newCustomer)
    }

    const handleChange = (e) => {
        setCustomerDetails({
            ...(customerDetails),
            [e.target.name]: e.target.value

        });

    };

    const submitCustomer = (e) => {
        e.preventDefault();
        setIsLoading(true)
        /* RESET & SET ERROR */
        set_error_message("")
        setError(null)
        const errors = Object.entries(customerDetails).filter(customer_prop => {
            if (!customer_prop[1] || customer_prop[1] == "") {
                return customer_prop[0]
            }
        })

        if (errors.length) {

            setError(errors[0][0])
            setIsLoading(false)
            return
        }
        /* RESET & SET ERROR */



        axios.post(`${base_url}/api/customers/add`, customerDetails)
            .then(res => {
                showToast({ message: "Cusomer Added successfully" })
                // showToast() 
                resetForm()
                setIsLoading(false)

            })

            .catch(e => {
                showToast({ message: e.request.response, type: 'error' })
                set_error_message(e.request.response);
                setIsLoading(false)
            })
    }

    return <div className="container">

        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Register Customer</h2>
        {isLoading ? <Loading /> :
            (<div className="card">

                <div className="card-body px-4 md:px-[16%] lg:px-[30%] font-mono">
                    <form className="" onSubmit={submitCustomer} noValidate>


                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input name={"first_name"} label={"First Name"} type={"text"} value={customerDetails['first_name']} onChange={handleChange} error={error} />
                            <Input name={"last_name"} label={"Last Name"} type={"text"} value={customerDetails['first_name']} onChange={handleChange} error={error} />

                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input name={"dob"} label={"Date of Birth"} type={"date"} value={customerDetails['dob']} onChange={handleChange} error={error} />
                            <Input name={"sex"} label={"Sex"} type={"dropdown"} options={['male', 'female']} value={customerDetails['sex']} onChange={handleChange} error={error} />


                            {/* <CustomerFormTemplate isSelect={true} htmlFor={"gender"} title={"Gender"} id_name={"gender"}  value={customerDetails['first_name']} onChange={handleChange} error={error} /> */} </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"email"} label={"Email"} type={"email"} value={customerDetails['email']} onChange={handleChange} error={error} />
                            <Input name={"phone"} label={"Phone No."} type={"text"} value={customerDetails['phone']} onChange={handleChange} error={error} />
                            {/* 
                        <CustomerFormTemplate htmlFor={"email"} title={"Email"} type={"email"} id_name={"email"}  value={customerDetails['first_name']} onChange={handleChange} error={error} />
                        <CustomerFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} id_name={"phone"}  value={customerDetails['first_name']} onChange={handleChange} error={error}>
                        </CustomerFormTemplate> */}
                        </div>
                        {/*    <Input name={"address"} label={"Address"} type={"textarea"}  value={customerDetails['first_name']} onChange={handleChange} error={error} /> */}

                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"address_name"} label={"Address Name"} type="text" value={customerDetails['address_name']} onChange={handleChange} error={error} />
                            <Input name={"address_type"} label={"Address Type"} type="dropdown" options={['Primary', 'Secondary']}
                                value={customerDetails['address_type']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"house_no"} label={"House"} type="text" value={customerDetails['house_no']} onChange={handleChange} error={error} />

                            <Input name={"road_no"} label={"Road"} type="text" value={customerDetails['road_no']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"city"} label={"City"} type="text" value={customerDetails['city']} onChange={handleChange} error={error} />
                            <Input name={"country"} label={"Country"} type="text" value={customerDetails['country']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"postal_code"} label={"Postal Code"} type="number" value={customerDetails['postal_code']} onChange={handleChange} error={error} />
                            <Input name={"emergency"} label={"Emergency Contact"} type="number" value={customerDetails['emergency']} onChange={handleChange} error={error} />

                        </div>
                        {error_message ? <p className="text-red-500 px-4 text-center h-2">{error_message}</p> : <p className="text-red-500 px-4 text-center h-2">{error_message}</p>}
                        {/* <CustomerFormTemplate isAddress={true} htmlFor={'address'} title={"Address"} type={"text"} id_name={"address"}  value={customerDetails['first_name']} onChange={handleChange} error={error} /> */}
                        <button disabled={isLoading} type="submit" className="disabled:cursor-not-allowed btn btn-primary mt-2 bg-slate-400 p-2 px-3 tracking-wider font-semibold text-lg active:scale-90
                     hover:shadow-xl text-white  hover:text-black mb-4 rounded-lg hover:border-[1px] border-black">Register Customer</button>
                    </form>
                </div>

            </div>)}
    </div>


};

export default AddCustomer;
