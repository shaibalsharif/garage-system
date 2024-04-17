import { useState } from "react";
import StockFormTemplate from '../components/Stock/StockFormTemplate'
import { newCar, testCar, testCustomers } from "../assets/DataModel";
import uniqid from 'uniqid'
import { useNavigate } from 'react-router-dom'
import { apiURL } from "../assets/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { validateEmptyFIeld } from "../assets/utilities";


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
        if (  tempCar.brand.trim() != "" &&
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
            <div className="card-body">
                <form onSubmit={submitCar} className="needs-validation" noValidate>

                    <div className="row">

                        <StockFormTemplate isSelect={true} isCar={true} htmlFor={"custRegNo"} title={"Customers Reg. No."} id_name={'custRegNo'}
                            nameList={nameList} options={options} placeholderOption="Choose Customer Reg." onChange={handleChange}
                        />
                        <StockFormTemplate htmlFor={"brand"} title={"Car Brand"} id_name={'brand'}
                            onChange={handleChange}
                        />


                    </div>
                    <div className="row">

                        <StockFormTemplate htmlFor={"model"} title={"Car Model"} id_name={'model'}
                            onChange={handleChange}
                        />
                        <StockFormTemplate htmlFor={"numPlate"} title={"Car No. Plate"} id_name={'numPlate'}
                            onChange={handleChange}
                        />


                    </div>
                    <div className="row">


                        <StockFormTemplate htmlFor={"entryDate"} title={"Entry Date"} id_name={'entryDate'} type={'date'}
                            onChange={handleChange}
                        />
                        <StockFormTemplate htmlFor={"color"} title={"Car Color"} id_name={'color'}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="row">

                        < StockFormTemplate htmlFor={"engine"} title={"Engine No."} id_name={'engine'}
                            onChange={handleChange}
                        />
                        <StockFormTemplate htmlFor={"emergency"} title={"Emergency Contact"} id_name={'emergency'}
                            onChange={handleChange}
                        />


                    </div>

                    <div className="form-group">
                        <label htmlFor="problem">Initial Problem <small>(optional)</small></label>
                        <textarea type="text" className="form-control" id="problem" onChange={handleChange} name="problem" defaultValue={""} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
};

export default AddCar;
