import { useState } from "react";
import StockFormTemplate from '../components/Stock/StockFormTemplate'
import { newCar, testCar, testCustomers } from "../assets/DataModel";
import uniqid from 'uniqid'
import { useNavigate } from 'react-router-dom'
import { apiURL } from "../assets/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { validateEmptyFIeld } from "../assets/utilities";
import Input from "../components/Inputs";


const AddCar = () => {
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState(newCar)
    const [options, setOptions] = useState([])
    const [nameList, setNameList] = useState([])


    const getFirebaseCustomer = async () => {

        apiURL.get('/customer.json').then((res) => {
            const customerNameList = []
            const option = []

            if (res.data) {
                Object.keys(res.data).map((key) => {
                    let newObj = res.data[key]
                    option.push(key)
                    customerNameList.push(newObj.name)
                })
                option.reverse()
                customerNameList.reverse()


                setOptions(option)

                setNameList(customerNameList)
            }
            else {
                setOptions([])
                setNameList([])
            }
        })
    }

    //getFirebaseCustomer()
    useEffect(() => {
        getFirebaseCustomer()
    }, [])

    const handleChange = (e) => {

        setCarDetails({
            ...(carDetails),
            [e.target.name]: e.target.value
        });
    };

    const submitCar = (e) => {
        e.preventDefault();


        const tempCar = { ...carDetails }
        console.log(tempCar);
        tempCar.custName = nameList[options.indexOf(tempCar.custRegNo)]
        if (tempCar.brand.trim() != "" &&
            tempCar.model.trim() != "" && tempCar.numPlate.trim() != "" &&
            tempCar.engine.trim() != "" && tempCar.emergency.trim() != "") {
            apiURL.post('/car.json', tempCar).then((response) => {

                toast.success("Added Car " + tempCar.brand, {
                    className: "SUCCESS_TOAST",
                    position: toast.POSITION.TOP_CENTER
                })
            })
            // #####  update customer entryCount
            apiURL.get(`/customer/${tempCar.custRegNo}.json`).then((res) => {
                res.data.entryCount = res.data.entryCount + 1
                apiURL.put(`/customer/${tempCar.custRegNo}.json`, res.data).then(() => {
                    e.target.reset()
                    navigate("/cars")
                })
            })


        } else {
            toast.error("Enter All Required Info ", {
                className: "ERROR_TOAST",
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    return <div className="container">
        <h2>Car Entry Form</h2>
        <div className="card">
            <div className="card-body px-2 md:px-[8%] lg:px-[15%]">
                <form onSubmit={submitCar} className="needs-validation" noValidate>

                    <div className="lg:flex gap-2 justify-between items-center">
                        <Input name={"custRegNo"} label={"Customers Reg. No."} type={"dropdown"}
                            options={options}
                             optionDisplayVal={options.map((item,ind)=>`${item} (${nameList[ind]})`)} onChange={handleChange} />
                        <Input name={"brand"} label={"Car Brand"} type={"text"} onChange={handleChange} />



                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">

                    <Input name={"model"} label={"Car Model"} type={"text"} onChange={handleChange} />
                    <Input name={"numPlate"} label={"Car No. Plate"} type={"text"} onChange={handleChange} />

                        


                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">
                    <Input name={"doentryDateb"} label={"Date of Entry"} type={"date"} onChange={handleChange} />
                    <Input name={"color"} label={"Car Color"} type={"text"} onChange={handleChange} />

                       

                    </div>
                    <div className="lg:flex gap-2 justify-between items-center">
                    <Input name={"engine"} label={"Engine No."} type={"text"} onChange={handleChange} />

                    <Input name={"emergency"} label={"Emergency Contact"} type={"text"} onChange={handleChange} />



                    </div>

                    <div className="form-group">
                        {/* <label htmlFor="problem">Initial Problem <small>(optional)</small></label> */}
                        <Input name={"problem"} label={"Initial Problem"} type={"textarea"} onChange={handleChange} />

                        <textarea type="text" className="form-control" id="problem" onChange={handleChange} name="problem" defaultValue={""} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
};

export default AddCar;
