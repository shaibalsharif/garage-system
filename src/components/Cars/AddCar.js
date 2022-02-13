import { useState } from "react";
import  StockFormTemplate  from '../Stock/StockFormTemplate'
import { newCar, testCar, testCustomers } from "../../assets/DataModel";
import uniqid from 'uniqid'
import { useNavigate } from 'react-router-dom'

const AddCar = () => {
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState(newCar)
    const initCar = () => {
        return JSON.parse(localStorage.getItem('cars') || JSON.stringify(testCar))
    }
    let options=[]
    const getRegNo=()=>{
        const customers= JSON.parse(localStorage.getItem('customers') || JSON.stringify(testCustomers));
        customers.map((customer)=>{
            options.push(customer.regNo)
            
        })
            return options
    }
    const handleChange = (e) => {
        setCarDetails({
            ...(carDetails),
            [e.target.name]: e.target.value
        });
    };

    const submitCar = (e) => {
        let cars = initCar()
        console.log(cars);
        let tempCar = { ...carDetails }
        tempCar.carRegNo= uniqid();
        cars.push(tempCar)
        //Code to handle Customer form submit
        e.preventDefault();
        { /*setCustomerDetails({
           ...(customerDetails), regNo:uniqid()
       })*/}
        localStorage.setItem('cars', JSON.stringify(cars))

        e.target.reset();
       navigate("/cars")
    }

    return <div class="container">
        <h2>Car Entry Form</h2>
        <div class="card">
            <div class="card-body">
                <form onSubmit={submitCar}>

                    <div className="row">
                        <StockFormTemplate isSelect={true} htmlFor={"custRegNo"} title={"Customers Reg. No."} id_name={'custRegNo'}
                           options={getRegNo()} placeholderOption="Choose Customer Reg." onChange={handleChange}
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


                        <StockFormTemplate htmlFor={"entrytime"} title={"Entry Time"} id_name={'entrytime'} type={'time'}
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
                        <textarea type="text" className="form-control" id="problem" name="problem" defaultValue={""} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
};

export default AddCar;
