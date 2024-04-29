import { useEffect, useState } from "react"
import Input from "../Inputs"
import CustomerFormTemplate from "./CustomerFormTemplate"
import axios from "axios"
import Loading from "../Loader/Loading"

const ModalFormTemplate = ({ isloading, update, setModalCustomer, handleModalChange, submit, closeModal, data = {},
  buttonValue, onDelete, error = null,
  error_message = null }) => {

  const base_url = process.env.REACT_APP_BACKEND_API

  useEffect(() => {

    axios.get(`${base_url}/api/customers/${data.id ? data.id : ""}`)
      .then(res => {

        const address = res.data?.address?.Primary || res.data?.address?.Secondary
        address.address_type = res.data?.address?.Primary ? 'Primary' : 'Secondary'
        delete res?.data?.address

        res.data && setModalCustomer({ ...res.data, ...address })
      })
      .catch(e => {

      })
  }, [])




  return (

    <div>
      <form onSubmit={submit}>


        {isloading ? <Loading />
          : <div>
            <div className="lg:flex gap-2 justify-between items-center">
              <Input name={"first_name"} label={"First Name"} type={"text"} value={data['first_name']} onChange={handleModalChange} error={error} />
              <Input name={"last_name"} label={"Last Name"} type={"text"} value={data['last_name']} onChange={handleModalChange} error={error} />

            </div>
            <div className="lg:flex gap-2 justify-between items-center">
              <Input name={"dob"} label={"Date of Birth"} type={"date"} value={data['dob']} onChange={handleModalChange} error={error} />
              <Input name={"sex"} label={"Sex"} type={"dropdown"} options={['male', 'female']} value={data['sex']} onChange={handleModalChange} error={error} />


              {/* <CustomerFormTemplate isSelect={true} htmlFor={"gender"} title={"Gender"} id_name={"gender"}  value={data['first_name']} onChange={handleModalChange} error={error} /> */} </div>
            <div className="flex gap-2 justify-between items-center">
              <Input name={"email"} label={"Email"} type={"email"} value={data['email']} onChange={handleModalChange} error={error} />
              <Input name={"phone"} label={"Phone No."} type={"text"} value={data['phone']} onChange={handleModalChange} error={error} />
              {/* 
<CustomerFormTemplate htmlFor={"email"} title={"Email"} type={"email"} id_name={"email"}  value={data['first_name']} onChange={handleModalChange} error={error} />
<CustomerFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} id_name={"phone"}  value={data['first_name']} onChange={handleModalChange} error={error}>
</CustomerFormTemplate> */}
            </div>
            {/*    <Input name={"address"} label={"Address"} type={"textarea"}  value={data['first_name']} onChange={handleModalChange} error={error} /> */}

            <div className="flex gap-2 justify-between items-center">
              <Input name={"address_name"} label={"Address Name"} type="text" value={data['address_name']} onChange={handleModalChange} error={error} />
              <Input name={"address_type"} label={"Address Type"} type="dropdown" options={['Primary', 'Secondary']}
                value={data['address_type']} onChange={handleModalChange} error={error} />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Input name={"house_no"} label={"House"} type="text" value={data['house_no']} onChange={handleModalChange} error={error} />

              <Input name={"road_no"} label={"Road"} type="text" value={data['road_no']} onChange={handleModalChange} error={error} />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Input name={"city"} label={"City"} type="text" value={data['city']} onChange={handleModalChange} error={error} />
              <Input name={"country"} label={"Country"} type="text" value={data['country']} onChange={handleModalChange} error={error} />
            </div>
            <Input name={"postal_code"} label={"Postal Code"} type="number" value={data['postal_code']} onChange={handleModalChange} error={error} />
            {error_message ? <p className="text-red-500 px-4 text-center h-2">{error_message}</p> : <p className="text-red-500 px-4 text-center h-2">{error_message}</p>}

          </div>}


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
ModalFormTemplate.defaultProps = {
  buttonValue: "Submit"
}
export default ModalFormTemplate