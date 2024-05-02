import StockFormTemplate from "../Stock/StockFormTemplate"
import { useState, useEffect } from "react"
import { apiURL } from "../../assets/api"
import Input from "../Inputs"
import { carColors, carsInBangladesh } from "../../utils/data"

const CarModalFormTemplate = ({ options, nameList, update, onDelete, handleModalChange,
    submit, closeModal, data, buttonValue, modalCar, setModalCar,
    error = null, isLoading,
    error_message = null }) => {
    console.log(data);
    const base_url = process.env.REACT_APP_BACKEND_API
    const handleStatusCheckbox = (e, setter, data) => {
        if (data && setter) {
            setter({
                ...data,
                ['status']: e.target.checked ? 'in-garage' : 'N/A'
            })
            return
        }
        setModalCar({
            ...modalCar,
            ['status']: e.target.checked ? 'in-garage' : 'N/A'
        })

    }

    return (
        <div>
            <form onSubmit={submit}
                className="needs-validation" noValidate>


                <div className="lg:flex gap-2 justify-between items-center">
                    <Input value={data["customer_id"]}
                        error={error} name={"customer_id"}
                        label={"Customer"} type={"text"}
                        disabled />
                    <Input value={data["brand"]} error={error} name={"brand"} label={"Brand"} type={"dropdown"}
                        options={carsInBangladesh.map(car => car?.brand)}
                        onChange={handleModalChange} />
                </div>
                <div className="lg:flex gap-2 justify-between items-center">

                    <Input value={data["model"]} error={error} name={"model"} label={"Car Model"} type={"dropdown"}
                        options={data?.brand ?
                            carsInBangladesh.find(car => car?.brand == data?.brand)?.models : []}
                        onChange={handleModalChange} />
                    <Input value={data && data["plate"]} error={error} name={"plate"} label={"Car No. Plate"} type={"text"} onChange={handleModalChange} />




                </div>
                <div className="lg:flex gap-2 justify-between items-center">
                    <Input disabled value={data && data["entry_date"]} error={error} name={"entry_date"} label={"Date of Entry"} type={"date"} onChange={handleModalChange} />
                    <div>
                        <Input value={data && data["color"]} error={error} name={"color"} label={"Color"} type={"dropdown"}
                            options={carColors?.map(color => color.code)}
                            optionDisplayValue={carColors?.map(color => color.name)}
                            onChange={handleModalChange} />
                        <div style={{
                            backgroundColor: data && data?.color
                        }}
                            className={` h-4 w-[96%] mx-auto border-[1px] `}></div>
                    </div>



                </div>
                <div className="lg:flex gap-2 justify-between items-center">
                    <Input value={data && data["engine"]} error={error} name={"engine"} label={"Engine No."} type={"text"} onChange={handleModalChange} />

                    <Input value={data && data["emergency"]} error={error} name={"emergency"} label={"Emergency Contact"} type={"text"} onChange={handleModalChange} />



                </div>

                <Input value={data && data["initial_problem"]} error={error} fullwidth name={"initial_problem"} label={"Initial Problem"} type={"textarea"} onChange={handleModalChange} />
                <Input defaultValue value={data && data["status"]} error={error} name={"status"} label={"Accept in Garage"} type={"checkbox"} onChange={handleStatusCheckbox} />

                {/* <div className="flex gap-2 justify-between items-center">
                            <Input value={data && data["name"]} error={error} name={"address_name"} label={"Address Name"} type="text" value={data && data['address_name']} onChange={handleModalChange} error={error} />
                            <Input value={data && data["name"]} error={error} name={"address_type"} label={"Address Type"} type="dropdown" options={['Primary', 'Secondary']}
                                value={data && data['address_type']} onChange={handleModalChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input value={data && data["name"]} error={error} name={"house_no"} label={"House"} type="text" value={data && data['house_no']} onChange={handleModalChange} error={error} />

                            <Input value={data && data["name"]} error={error} name={"road_no"} label={"Road"} type="text" value={data && data['road_no']} onChange={handleModalChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input value={data && data["name"]} error={error} name={"city"} label={"City"} type="text" value={data && data['city']} onChange={handleModalChange} error={error} />
                            <Input value={data && data["name"]} error={error} name={"country"} label={"Country"} type="text" value={data && data['country']} onChange={handleModalChange} error={error} />
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <Input value={data && data["name"]} error={error} name={"postal_code"} label={"Postal Code"} type="number" value={data && data['postal_code']} onChange={handleModalChange} error={error} />
                            
                        </div> */}

                {error_message ? <p className="text-red-500 px-4 text-center h-2">{error_message}</p> : <p className="text-red-500 px-4 text-center h-2">{error_message}</p>}


                <div className='button-group mt-3 px-[14%] flex justify-between '>
                    {buttonValue == 'Submit' ? (< button type="submit" className="inline-block align-middle text-center select-none border font-normal
           whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-blue-600 border-blue-600 
            hover:text-white bg-white hover:bg-blue-600" >{buttonValue}</button>) :
                        (< button className="binline-block align-middle text-center select-none border font-normal
            whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-blue-600 border-blue-600 
             hover:text-white bg-white hover:bg-blue-600" onClick={update}>{buttonValue}</button>)}

                    <button type="button" className="inline-block align-middle text-center select-none border font-normal 
          whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 
           hover:text-white bg-white hover:bg-red-700" style={{ marginLeft: '5px' }} onClick={closeModal}>Close</button>
                    {buttonValue == 'Update' ? (<button type="button" className="inline-block align-middle text-center select-none border font-normal 
          whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-red-600 border-red-600 
           hover:text-white bg-white hover:bg-red-700" style={{ marginLeft: '5px' }} onClick={onDelete}>Delete</button>) : (<div></div>)}
                </div>
            </form>
        </div>
    )
}
CarModalFormTemplate.defaultProps = {
    buttonValue: "Submit"
}
export default CarModalFormTemplate