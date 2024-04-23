import StockFormTemplate from "../components/Stock/StockFormTemplate"
import { useState } from "react";
import uniqid from 'uniqid'
import { testStock } from "../assets/DataModel";
import { newStock } from "../assets/DataModel";
import { useNavigate } from "react-router-dom";
import { categoryOptions } from "../assets/DataModel";
import { apiURL } from "../assets/api";
import { toast } from "react-toastify";
import Input from "../components/Inputs";
const AddStock = () => {


    const navigate = useNavigate()
    const [stockDetails, setStockDetails] = useState(newStock)
    const initStocks = () => {
        return JSON.parse(localStorage.getItem('stocks') || JSON.stringify(testStock))
    }


    const handleChange = (e) => {

        setStockDetails({
            ...(stockDetails),
            [e.target.name]:
                ((e.target.id == 'buyPrice') || (e.target.id == 'sellPrice')) ?
                    parseInt(e.target.value) : e.target.value
        });
    };


    const submitStock = (e) => {
        e.preventDefault();
        let tempStock = { ...stockDetails }
        if (tempStock.category == "" || tempStock.buyPrice <= 0 || tempStock.sellPrice <= 0) {
            toast.error("Enter All Required Info ", {
                className: "ERROR_TOAST",
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            apiURL.post('/stock.json', tempStock).then((response) => {
                e.target.reset();
                navigate("/stocks")
            })
            toast.success("Added New Stock : " + tempStock.category, {
                className: "SUCCESS_TOAST",
                position: toast.POSITION.TOP_CENTER
            })
        }




    }
    return <div className="container">
        <h2>Add Stock</h2>
        <div className="card">
            <div className="card-body px-2 md:px-[8%] lg:px-[15%] xl:px-[18%]">
                <form onSubmit={submitStock}className="w-full">
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"category"} label={"Category"} type={"dropdown"} options={categoryOptions} onChange={handleChange} />
                        <Input name={"addDate"} label={"Adding Date"} type={"date"} options={categoryOptions} onChange={handleChange} />
                        {/* <StockFormTemplate isSelect={true} htmlFor={'category'} title={"Category"} id_name={"category"}
                        
                            placeholderOption={"Choose Category"} options={categoryOptions} onChange={handleChange} /> */}
                        {/* <StockFormTemplate htmlFor={"addDate"} title={"Adding Date"} type={"date"} id_name={"addDate"} onChange={handleChange} /> */}

                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"buyPrice"} label={"Buy Price"} type={"number"} onChange={handleChange} />
                        <Input name={"sellPrice"} label={"Sell Price"} type={"number"} onChange={handleChange} />

                        {/* <StockFormTemplate isPrice={true} htmlFor={"buyPrice"} title={"Buy Price"} type={"number"} id_name={"buyPrice"} onChange={handleChange} />
                        <StockFormTemplate isPrice={true} htmlFor={"sellPrice"} title={"Sell Price"} type={"number"} id_name={"sellPrice"} onChange={handleChange} /> */}

                    </div>
                    <div className="flex gap-2 justify-between items-center">
                        <Input name={"warrenty"} label={"Warrenty"} type={"dropdown"} options={["No", "Yes"]} onChange={handleChange} />
                        <Input name={"warrentyEnd"} label={"Warrenty End Date"} type={"date"} onChange={handleChange} />

                        {/* <StockFormTemplate isSelect={true} htmlFor={'warrenty'} title={"Warrenty"} id_name={"warrenty"}
                            options={["No", "Yes"]} onChange={handleChange} />
                        <StockFormTemplate htmlFor={"warrentyEnd"}
                            title={"Warrenty End Date"} type={"date"} id_name={"warrentyEnd"} onChange={handleChange} /> */}

                    </div>

                    <button type="submit" className="btn btn-primary mt-2 px-6 py-2 bg-green-400 rounded-md tracking-wider 
                    font-semibold w-fit mx-auto text-center">Submit</button>

                </form>
            </div>
        </div>
    </div>;
};

export default AddStock;
