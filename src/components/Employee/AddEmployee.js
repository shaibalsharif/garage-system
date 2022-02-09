import StockFormTemplate from '../Stock/StockFormTemplate'
import { useState } from 'react';
import { newEmp } from '../../assets/DataModel';

const AddEmployee = () => {

    const [empDetails, setEmpDetails] = useState(newEmp)
    const initEmployee = () => {
        return JSON.parse(localStorage.getItem('employees') || JSON.stringify(testEmp))
    }

    const handleChange = (e) => {
        setEmployee({
            ...(empDetails),
            [e.target.name]: e.target.value
        });
    };

    const submitEmp = () => {

    }
    return <div class="container">
        <h2>Employee Form</h2>
        <div class="card">
            <div class="card-body">
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
                            <textarea  className={"form-control"} id={'address'} name={"address"} onChange={handleChange} />
                        </div>

                    

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>
};

export default AddEmployee;
