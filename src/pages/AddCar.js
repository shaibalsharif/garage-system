import { useState } from "react";
import { newCar, } from "../assets/DataModel";
import { useNavigate } from 'react-router-dom'
import { apiURL } from "../assets/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Input from "../components/Inputs";
import { carColors, carsInBangladesh } from "../utils/data";


const AddCar = () => {
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState(newCar)
    const [options, setOptions] = useState([])
    const [nameList, setNameList] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [error_message, set_Error_message] = useState(null)
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
    useEffect(() => {

        setCarDetails({ ...carDetails, model: "" })
    }, [carDetails.brand])


    return <div className="container">
        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Car Entry Form</h2>
        {isLoading ? <isLoading /> :
            (<div className="card">
                <div className="card-body px-4 md:px-[16%] lg:px-[30%] font-mono">
                    <form onSubmit={submitCar}
                        className="needs-validation" noValidate>
                        {/* <Input name={"dob"} label={"Date of Birth"} type={"date"} value={carDetails['dob']} onChange={handleChange} error={error} />
                        <Input name={"sex"} label={"Sex"} type={"dropdown"} options={['male', 'female']} value={carDetails['sex']} onChange={handleChange} error={error} /> */}


                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input name={"customer"} label={"Customer"} type={"dropdown"}
                                options={options}
                                optionDisplayVal={options.map((item, ind) => `${item} (${nameList[ind]})`)}
                                onChange={handleChange} />
                            <Input name={"brand"} label={"Car Brand"} type={"dropdown"}
                                options={carsInBangladesh.map(car => { return car?.brand }
                                )}
                                onChange={handleChange} />
                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">

                            <Input name={"model"} label={"Car Model"} type={"dropdown"}
                                value={carDetails.model}
                                options={carDetails?.brand ?
                                    carsInBangladesh.find(car => car?.brand == carDetails?.brand)?.models : []}
                                onChange={handleChange} />
                            <Input name={"numPlate"} label={"Car No. Plate"} type={"text"} onChange={handleChange} />




                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input name={"doentryDateb"} label={"Date of Entry"} type={"date"} onChange={handleChange} />
                            <div>
                                <Input name={"color"} label={"Color"} type={"dropdown"}
                                    options={carColors?.map(color => color.name)}

                                    onChange={handleChange} />
                                <div style={{
                                    backgroundColor: carDetails?.color ?
                                        carColors.find(color => color.name == carDetails?.color)
                                            ?.code : '#000'
                                }}
                                    className={` h-4 w-[96%] mx-auto border-[1px] `}></div>
                            </div>



                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input name={"engine"} label={"Engine No."} type={"text"} onChange={handleChange} />

                            <Input name={"emergency"} label={"Emergency Contact"} type={"text"} onChange={handleChange} />



                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"address_name"} label={"Address Name"} type="text" value={carDetails['address_name']} onChange={handleChange} error={error} />
                            <Input name={"address_type"} label={"Address Type"} type="dropdown" options={['Primary', 'Secondary']}
                                value={carDetails['address_type']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"house_no"} label={"House"} type="text" value={carDetails['house_no']} onChange={handleChange} error={error} />

                            <Input name={"road_no"} label={"Road"} type="text" value={carDetails['road_no']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"city"} label={"City"} type="text" value={carDetails['city']} onChange={handleChange} error={error} />
                            <Input name={"country"} label={"Country"} type="text" value={carDetails['country']} onChange={handleChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input name={"postal_code"} label={"Postal Code"} type="number" value={carDetails['postal_code']} onChange={handleChange} error={error} />
                            <Input name={"problem"} label={"Initial Problem"} type={"textarea"} onChange={handleChange} />
                        </div>

                        {error_message ? <p className="text-red-500 px-4 text-center h-2">{error_message}</p> : <p className="text-red-500 px-4 text-center h-2">{error_message}</p>}
                        <div className="form-group">
                            {/* <label htmlFor="problem">Initial Problem <small>(optional)</small></label> */}


                            <textarea type="text" className="form-control" id="problem" onChange={handleChange} name="problem" defaultValue={""} />
                        </div>

                        <button disabled={isLoading} type="submit" className="disabled:cursor-not-allowed btn btn-primary mt-2 bg-slate-400 p-2 px-3 tracking-wider font-semibold text-lg active:scale-90
                     hover:shadow-xl text-white  hover:text-black mb-4 rounded-lg hover:border-[1px] border-black">Register Car</button>
                    </form>
                </div>
            </div>)}
    </div>
};

export default AddCar;
