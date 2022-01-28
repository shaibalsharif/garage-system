
const CustomerFormTemplate = ({ isSelect, isAddress, htmlFor, title, type, id_name, onChange }) => {

    return <div className={isAddress ? ("form-group") : ("col-md-6 form-group")}>
        <label htmlFor={htmlFor}>{title}</label>
        {!isSelect ? (<input type={type} className="form-control" id={id_name} name={id_name} onChange={onChange} />) :
            (<select className="form-control" id={id_name} name={id_name} onChange={onChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>)}
    </div>

};
CustomerFormTemplate.defaultProps = {
    isSelect: false,
    isAddress: false
}
export default CustomerFormTemplate;
