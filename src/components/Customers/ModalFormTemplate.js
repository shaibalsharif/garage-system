import CustomerFormTemplate from "./CustomerFormTemplate"
const ModalFormTemplate = ({ update, handleModalChange, submit, closeModal, data, buttonValue, onDelete }) => {

  return (

    <div> <form onSubmit={submit}>

      <div className="row">
        <CustomerFormTemplate htmlFor={"firstName"} title={"First Name"} value={data.firstName} type={"text"} id_name={"firstName"} onChange={handleModalChange} />
        <CustomerFormTemplate htmlFor={"lastName"} title={"Last Name"} value={data.lastName} type={"text"} id_name={"lastName"} onChange={handleModalChange} />
      </div>
      <div className="row">
        <CustomerFormTemplate htmlFor={"dob"} title={"Date of Birth"} value={data.dob} type={"date"} id_name={"dob"} onChange={handleModalChange} />
        <CustomerFormTemplate isSelect={true} htmlFor={"gender"} title={"Gender"} value={data.gender} id_name={"gender"} onChange={handleModalChange} />
      </div>
      <div className="row">
        <CustomerFormTemplate htmlFor={"email"} title={"Email"} type={"email"} value={data.email} id_name={"email"} onChange={handleModalChange} />
        <CustomerFormTemplate htmlFor={"phone"} title={"Phone No."} type={"text"} value={data.phone} id_name={"phone"} onChange={handleModalChange}>
        </CustomerFormTemplate>
      </div>
      <CustomerFormTemplate isAddress={true} htmlFor={'address'} title={"Address"} value={data.address} type={"text"} id_name={"address"} onChange={handleModalChange} />




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
ModalFormTemplate.defaultProps = {
  buttonValue: "Submit"
}
export default ModalFormTemplate