const StockFormTemplate = ({ value,isCar,nameList ,isSelect, isPrice, htmlFor, type, title, pHolder, id_name, options ,onChange, placeholderOption}) => {

  return <div className="col-md-6 form-group">
    <label htmlFor={htmlFor}>{title}</label>
    {isSelect ? (<select className="form-select form-control" placeholder={pHolder} id={id_name} value={value} name={id_name} onChange={onChange} >
    <option value="" disabled selected hidden>{placeholderOption}</option>
      {options.map((option,i) => (
        <option value={option}>{  !isCar?option: option+" ("+nameList[i]+")"}</option>
      ))}
    </select>) : isPrice ? (<div className="input-group mb-3">
      <input type={type} className="form-control" id={id_name} value={value} name={id_name} onChange={onChange} />
      <div className="input-group-append">
        <span className="input-group-text">Taka</span>
      </div>
    </div>) : (<input type={type} className="form-control" value={value} id={id_name} name={id_name} onChange={onChange}/>)}
     
    

  </div>;
};
StockFormTemplate.defaultProps = {
  isSelect: false,
  isPrice: false,
  isCar:false
}
export default StockFormTemplate;
