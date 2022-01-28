import StockFormTemplate from "./StockFormTemplate"
import { useState } from "react";
import uniqid from 'uniqid'
import { testStock } from "../../assets/DataModel";
import { newStock } from "../../assets/DataModel";


const AddStock = () => {
    const [stockDetails, setStockDetails] = useState(newStock)
    const initStocks = () => {
        return JSON.parse(localStorage.getItem('stocks') || JSON.stringify(testStock))
    }


    const handleChange = (e) => {
        setStockDetails({
            ...(stockDetails),
            [e.target.name]: e.target.value
        });
    };


    const submitStock = (e) => {
        e.preventDefault();
        let stock= initStocks()
        let tempStock = { ...stockDetails }
        tempStock.itemNo=uniqid()
        stock.push(tempStock)
       localStorage.setItem('stocks',JSON.stringify(stock))
        
    }
    return <div className="container">
        <h2>Add Stock</h2>
        <div className="card">
            <div className="card-body">
                <form onSubmit={submitStock}>
                    <div className="row">
                        <StockFormTemplate isSelect={true} htmlFor={'category'} title={"Category"} id_name={"category"}
                            options={["Multimedia", "Bumper", "Looking Glass",
                                "Head Lights", "Doors", "Front Glass",
                                "Battery", "AC", "Engine Oil", "Wheels"]} onChange={handleChange}/>
                        <StockFormTemplate htmlFor={"addDate"} title={"Adding Date"} type={"date"} id_name={"addDate"} onChange={handleChange} />

                    </div>
                    <div className="row">
                        <StockFormTemplate isPrice={true} htmlFor={"buyPrice"} title={"Buy Price"} type={"text"} id_name={"buyPrice"} onChange={handleChange}/>
                        <StockFormTemplate isPrice={true} htmlFor={"sellPrice"} title={"Sell Price"} type={"text"} id_name={"sellPrice"} onChange={handleChange}/>

                    </div>
                    <div className="row">

                        <StockFormTemplate isSelect={true} htmlFor={'warrenty'} title={"Warrenty"} id_name={"warrenty"}
                            options={["No", "Yes"]} onChange={handleChange}/>
                        <StockFormTemplate htmlFor={"warrentyEnd"}
                            title={"Warrenty End Date"} type={"date"} id_name={"warrentyEnd"}onChange={handleChange} />

                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Submit</button>

                </form>
            </div>
        </div>
    </div>;
};

export default AddStock;
