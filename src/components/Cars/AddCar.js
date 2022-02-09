import { useState } from "react";
import  StockFormTemplate  from '../Stock/StockFormTemplate'
import { newCar, testCar, testCustomers } from "../../assets/DataModel";

const AddCar = () => {

    const [carDetails, setCarDetails] = useState(newCar)
    const initEmployee = () => {
        return JSON.parse(localStorage.getItem('cars') || JSON.stringify(testCar))
    }
    let options=['']
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

    const submitCar = () => {

    }

    return <div class="container">
        <h2>Car Entry Form</h2>
        <div class="card">
            <div class="card-body">
                <form onSubmit="submitCar()">

                    <div className="row">
                        <StockFormTemplate isSelect={true} htmlFor={"custRegNo"} title={"Customers Reg. No."} id_name={'custRegNo'}
                           options={getRegNo()}  onChange={'handleChamge'}
                        />
                        <StockFormTemplate htmlFor={"brand"} title={"Car Brand"} id_name={'brand'}
                            onChange={'handleChamge'}
                        />


                    </div>
                    <div className="row">

                        <StockFormTemplate htmlFor={"model"} title={"Car Model"} id_name={'model'}
                            onChange={'handleChamge'}
                        />
                        <StockFormTemplate htmlFor={"numPlate"} title={"Car No. Plate"} id_name={'numPlate'}
                            onChange={'handleChamge'}
                        />


                    </div>
                    <div className="row">


                        <StockFormTemplate htmlFor={"entrytime"} title={"Entry Time"} id_name={'entrytime'} type={'time'}
                            onChange={'handleChamge'}
                        />
                        <StockFormTemplate htmlFor={"color"} title={"Car Color"} id_name={'color'}
                            onChange={'handleChamge'}
                        />

                    </div>
                    <div className="row">

                        < StockFormTemplate htmlFor={"engine"} title={"Engine No."} id_name={'engine'}
                            onChange={'handleChamge'}
                        />
                        <StockFormTemplate htmlFor={"emergency"} title={"Emergency Contact"} id_name={'emergency'}
                            onChange={'handleChamge'}
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
