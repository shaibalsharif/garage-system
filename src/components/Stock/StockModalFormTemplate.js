import StockFormTemplate from "../Stock/StockFormTemplate"
import { categoryOptions } from "../../assets/DataModel";

const StockModalFormTemplate =({update,onDelete, handleModalChange, submit, closeModal, data, buttonValue }) => {
  return (
    <form onSubmit={submit}>
    <div className="row">
        <StockFormTemplate isSelect={true} htmlFor={'category'} title={"Category"} id_name={"category"} 
        value={data.category} placeholderOption={"Choose Category"} options={categoryOptions} onChange={handleModalChange}/>
        <StockFormTemplate htmlFor={"addDate"} title={"Adding Date"} type={"date"} id_name={"addDate"} onChange={handleModalChange} 
        value={data.addDate}/>

    </div>
    <div className="row">
        <StockFormTemplate isPrice={true} htmlFor={"buyPrice"} title={"Buy Price"} type={"number"}
        value={data.buyPrice} id_name={"buyPrice"} onChange={handleModalChange}/>
        <StockFormTemplate isPrice={true} htmlFor={"sellPrice"} title={"Sell Price"} type={"number"} 
        value={data.sellPrice}id_name={"sellPrice"} onChange={handleModalChange}/>

    </div>
    <div className="row">

        <StockFormTemplate isSelect={true} htmlFor={'warrenty'} title={"Warrenty"} id_name={"warrenty"}
           value={data.warrenty} options={["No", "Yes"]} onChange={handleModalChange}/>
        <StockFormTemplate htmlFor={"warrentyEnd"}
            value={data.warrentyEnd} title={"Warrenty End Date"} type={"date"} id_name={"warrentyEnd"}onChange={handleModalChange} />

    </div>

    <div className='button-group mt-3'>
    {buttonValue == 'Submit' ? (< button type="submit" className="btn btn-outline-primary" >{buttonValue}</button>) :
          (< button className="btn btn-outline-primary" onClick={update}>{buttonValue}</button>)}

        <button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={closeModal}>Close</button>
        {buttonValue == 'Update' ? (<button type="button" className="btn btn-outline-danger" style={{ marginLeft: '5px' }} onClick={onDelete}>Delete</button>) : (<div></div>)}
      </div>

</form>
  )
}

export default StockModalFormTemplate