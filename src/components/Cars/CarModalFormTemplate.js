import StockFormTemplate from "../Stock/StockFormTemplate"
import { useState, useEffect } from "react"
import { apiURL } from "../../assets/api"

const CarModalFormTemplate = ({options,nameList, update, onDelete, handleModalChange, submit, closeModal, data, buttonValue }) => {

  

    return (
        <div>
            <form onSubmit={submit}>

                <div className="row">
                    <StockFormTemplate isSelect={true} isCar={true} htmlFor={"custRegNo"} title={"Customers Reg. No."} id_name={'custRegNo'}
                        nameList={nameList} options={options} value={data.custRegNo} placeholderOption="Choose Customer Reg." onChange={handleModalChange}
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
                    {buttonValue == 'Submit' ? (< button type="submit" className="btn btn-outline-primary" >{buttonValue}</button>) :
                        (< button className="btn btn-outline-primary" onClick={update}>{buttonValue}</button>)}

                    <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Close</button>
                    {buttonValue == 'Update' ? (<button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={onDelete}>Delete</button>) : (<div></div>)}
                </div>
            </form>
        </div>
    )
}
CarModalFormTemplate.defaultProps = {
    buttonValue: "Submit"
}
export default CarModalFormTemplate