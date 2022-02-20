import StockFormTemplate from "../Stock/StockFormTemplate"
import { testCustomers } from '../../assets/DataModel'


const CarModalFormTemplate = ({ handleModalChange, submit, closeModal, data, buttonValue }) => {


    let options = []
    let custNameList = []

    const getRegNo = () => {
        const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(testCustomers));
        

        customers.map((customer) => {
            options.push(customer.regNo)
            custNameList.push(customer.name)


        })
        return options
    }


    return (
        <div>
            <form onSubmit={submit}>

            <div className="row">
                        <StockFormTemplate isSelect={true} isCar={true} htmlFor={"custRegNo"} title={"Customers Reg. No."} id_name={'custRegNo'}
                          nameList={custNameList} options={getRegNo()} value ={data.custRegNo}placeholderOption="Choose Customer Reg." onChange={handleModalChange}
                        />
                        <StockFormTemplate htmlFor={"brand"} title={"Car Brand"} value={data.brand} id_name={'brand'}
                            onChange={handleModalChange}
                        />


                    </div>
                <div className="row">

                    <StockFormTemplate htmlFor={"model"} title={"Car Model"} value={data.model} id_name={'model'}
                        onChange={handleModalChange}
                    />
                    <StockFormTemplate htmlFor={"numPlate"} title={"Car No. Plate"} value={data.numPlate} id_name={'numPlate'}
                        onChange={handleModalChange}
                    />


                </div>
                <div className="row">


                    <StockFormTemplate htmlFor={"entryDate"} title={"Entry Date"} value={data.entryDate} id_name={'entryDate'} type={'date'}
                        onChange={handleModalChange}
                    />
                    <StockFormTemplate htmlFor={"color"} title={"Car Color"} value={data.color} id_name={'color'}
                        onChange={handleModalChange}
                    />

                </div>
                <div className="row">

                    < StockFormTemplate htmlFor={"engine"} title={"Engine No."} value={data.engine} id_name={'engine'}
                        onChange={handleModalChange}
                    />
                    <StockFormTemplate htmlFor={"emergency"} title={"Emergency Contact"} value={data.emergency} id_name={'emergency'}
                        onChange={handleModalChange}
                    />


                </div>
                <div className="form-group">
                    <label htmlFor="problem">Initial Problem <small>(optional)</small></label>
                    <textarea type="text" className="form-control" id="problem" onChange={handleModalChange} defaultValue={data.problem} name="problem" />
                </div>

                <div className='button-group mt-3'>
                    <button type="submit" className="btn btn-outline-primary" >{buttonValue}</button>

                    <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Close</button>
                    {buttonValue=='Update'?(<button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Delete</button>):(<div></div>)}
                </div>
            </form>
        </div>
    )
}
CarModalFormTemplate.defaultProps = {
    buttonValue: "Submit"
}
export default CarModalFormTemplate