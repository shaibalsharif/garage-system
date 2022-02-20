import StockFormTemplate from "../Stock/StockFormTemplate"
const EmployeeModalFormTemplate = ({ handleModalChange, submit, closeModal, data, buttonValue }) => {
  return (
    <form onSubmit={submit}>
      <div className="row">

        <StockFormTemplate
          htmlFor={'firstName'} title={'First Name'} id_name={'firstName'} onChange={handleModalChange}
        value={data.firstName} />
        <StockFormTemplate
          htmlFor={'lastName'} title={'Last Name'} id_name={'lastName'} onChange={handleModalChange}
          value={data.lastName}/>
      </div>
      <div className="row">
        <StockFormTemplate htmlFor={"dob"}
        value={data.dob} title={"Date of Birth"} type={"date"} id_name={"dob"} onChange={handleModalChange} />
        <StockFormTemplate isSelect={true} htmlFor={'gender'} title={"Gender"} id_name={"gender"}
         value={data.gender} options={["Male", "Female"]} onChange={handleModalChange} />
      </div>
      <div className="row">
        <StockFormTemplate htmlFor={"email"} 
        value={data.email} title={"Email"} type={"text"} id_name={"email"} onChange={handleModalChange} />
        <StockFormTemplate htmlFor={"phone"} 
        value={data.phone} title={"Phone No."} type={"text"} id_name={"phone"} onChange={handleModalChange} />

      </div>
      <div className="row">
        <StockFormTemplate htmlFor={'joinDate'} title={"Joining Date"} id_name={"joinDate"}
          value={data.joinDate} type={'date'} onChange={handleModalChange} />
        <StockFormTemplate htmlFor={"emergency"}
          value={data.emergency} title={"Emergency Contact"} id_name={"emergency"} onChange={handleModalChange} />

      </div>

      <div className="form-group">
        <label htmlFor={'address'}>{'Address'}</label>
        <textarea className={"form-control"} value={data.address} id={'address'} name={"address"} onChange={handleModalChange} />
      </div>



      <div className='button-group mt-3'>
        <button type="submit" className="btn btn-outline-primary" >{buttonValue}</button>

        <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Close</button>
        {buttonValue == 'Update' ? (<button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Delete</button>) : (<div></div>)}
      </div>


    </form>
  )
}

export default EmployeeModalFormTemplate