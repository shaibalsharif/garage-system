import { useState } from "react";
import { newCar, } from "../assets/DataModel";
import { useNavigate } from 'react-router-dom'
import { apiURL } from "../assets/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Input from "../components/Inputs";
import { carColors, carsInBangladesh } from "../utils/data";
import axios from "axios";
import { showToast } from "../components/toast";
import Loading from "../components/Loader/Loading";


const AddCar = () => {
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState(newCar)
    const [options, setOptions] = useState([])
    const [nameList, setNameList] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [error_message, set_Error_message] = useState(null)


    const [customerOptionList, setCustomerOptionList] = useState([])
    const base_url = process.env.REACT_APP_BACKEND_API
    const [imageFile, setImageFile] = useState(null);

    const getCustomerNameList = () => {
        axios.get(`${base_url}/api/customers`)
            .then(res => {
                setCustomerOptionList(res.data.map(customer => {
                    return { id: customer.id, name: `${customer.first_name} ${customer.last_name}` }
                }));
            })
            .catch(e => {
                console.log(e);
            })
    }







    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    useEffect(() => {
        getCustomerNameList()

    }, [])

    const handleChange = (e) => {

        setCarDetails({
            ...(carDetails),
            [e.target.name]: e.target.value
        });
    };


    const handleStatusCheckbox = (e, setter, data) => {
        if (data && setter) {
            setter({
                ...data,
                ['status']: e.target.checked ? 'in-garage' : 'N/A'
            })
            return
        }
        setCarDetails({
            ...carDetails,
            ['status']: e.target.checked ? 'in-garage' : 'N/A'
        })

    }


    const resetForm = () => {
        setCarDetails(newCar);
        setImageFile(null);
    };
    const submitCar = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        /* RESET & SET ERROR */
        set_Error_message("")
        setError(null)

        const errors = Object.entries(carDetails).filter(car_prop => {
            if (!car_prop[1] || car_prop[1] == "") {
                return car_prop[0]
            }
        })

        if (errors.length) {
            setError(errors[0][0])
            setIsLoading(false)
            return
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('carDetails', JSON.stringify(carDetails));

        try {
            const response = await axios.post(`${base_url}/api/cars/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showToast({ message: "Car Added successfully" });
            resetForm();
        } catch (error) {
            showToast({ message: error.response.data, type: 'error' });
            set_Error_message(error.response.data);
        } finally {
            setIsLoading(false);
        }

    }
    useEffect(() => {

        setCarDetails({ ...carDetails, model: "" })
    }, [carDetails.brand])


    return <div className="container">
        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Car Entry Form</h2>
        {isLoading ? <Loading /> :
            (<div className="card">
                <div className="card-body px-4 md:px-[16%] lg:px-[30%] font-mono">
                    <form onSubmit={submitCar}
                        className="needs-validation" noValidate>


                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input value={carDetails["customer_id"]} error={error} name={"customer_id"} label={"Customer"} type={"dropdown"}
                                options={customerOptionList.map(el => el.id)}
                                optionDisplayValue={customerOptionList.map(el => `${el.id}- ${el.name}`)}
                                onChange={handleChange} />
                            <Input value={carDetails["brand"]} error={error} name={"brand"} label={"Car Brand"} type={"dropdown"}
                                options={carsInBangladesh.map(car => { return car?.brand }
                                )}
                                onChange={handleChange} />
                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">

                            <Input value={carDetails["model"]} error={error} name={"model"} label={"Car Model"} type={"dropdown"}
                                options={carDetails?.brand ?
                                    carsInBangladesh.find(car => car?.brand == carDetails?.brand)?.models : []}
                                onChange={handleChange} />
                            <Input value={carDetails["plate"]} error={error} name={"plate"} label={"Car No. Plate"} type={"text"} onChange={handleChange} />




                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input value={carDetails["entry_date"]} error={error} name={"entry_date"} label={"Date of Entry"} type={"date"} onChange={handleChange} />
                            <div>
                                <Input value={carDetails["color"]} error={error} name={"color"} label={"Color"} type={"dropdown"}
                                    options={carColors?.map(color => color.code)}
                                    optionDisplayValue={carColors?.map(color => color.name)}
                                    onChange={handleChange} />
                                <div style={{
                                    backgroundColor: carDetails?.color
                                }}
                                    className={` h-4 w-[96%] mx-auto border-[1px] `}></div>
                            </div>



                        </div>
                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input value={carDetails["engine"]} error={error} name={"engine"} label={"Engine No."} type={"text"} onChange={handleChange} />

                            <Input value={carDetails["emergency"]} error={error} name={"emergency"} label={"Emergency Contact"} type={"text"} onChange={handleChange} />



                        </div>

                        <Input value={carDetails["initial_problem"]} error={error} fullwidth name={"initial_problem"} label={"Initial Problem"} type={"textarea"} onChange={handleChange} />
                        <Input defaultValue value={carDetails["status"]} error={error} name={"status"} label={"Accept in Garage"} type={"checkbox"} onChange={handleStatusCheckbox} />

                        <div className="lg:flex gap-2 justify-between items-center">
                            <Input value={carDetails["image"]} name={"image"} label={"Car Image"} type={"file"} onChange={handleImageChange} />
                        </div>

                        {error_message ? <p className="text-red-500 px-4 text-center h-2">{error_message}</p> : <p className="text-red-500 px-4 text-center h-2">{error_message}</p>}


                        <button disabled={isLoading} type="submit" className="disabled:cursor-not-allowed btn btn-primary mt-2 bg-slate-400 p-2 px-3 tracking-wider font-semibold text-lg active:scale-90
                     hover:shadow-xl text-white  hover:text-black mb-4 rounded-lg hover:border-[1px] border-black">Register Car</button>
                    </form>
                </div>
            </div>)}
    </div>
};

export default AddCar;

