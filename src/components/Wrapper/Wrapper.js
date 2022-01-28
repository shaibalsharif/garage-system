import './wrapper.css'
import ShowCount from './ShowCount';
import { useState, useEffect } from 'react'
import { testCustomers, testStock } from '../../assets/DataModel';

const Wrapper = () => {
    const chart = [1, 2, 3, 4, 5];
   

    const initCustomers = () => {
        let x= localStorage.getItem('customers');
        if(x){
            return JSON.parse(x)
        }
        else{
             localStorage.setItem('customers',JSON.stringify(testCustomers))
             return testCustomers
        }
      
    }
    const initStocks = () => {
        return JSON.parse(localStorage.getItem('stocks') || JSON.stringify(testStock))
    }

    const [customers, setCustomers] = useState(initCustomers)
    useEffect(() => {
        localStorage.setItem('customers', JSON.stringify(initCustomers()))
    }, [customers])

    const [stocks, setStocks] = useState(initStocks)
    useEffect(() => {
        localStorage.setItem('stocks', JSON.stringify(testStock))
    }, [stocks])
   
    return (

        <div className="container-fliud" style={{ marginBottom: '30px' }}>
            <div className="row">
                <ShowCount bg={"primary"} title={"Customers"} iname={"users"} count={customers.length} />
                <ShowCount bg={"success"} title={"Cars"} iname={'automobile'} count={5} />
                <ShowCount bg={"warning"} title={"Stocks"} iname={'gears'} count={stocks.length} />
                <ShowCount bg={"danger"} title={"Employees"} iname={"briefcase"} count={5} />
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><h4>Sold Items Table</h4></div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-bordered table-sm">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>SL No</th>
                                            <th>Catagory</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td />
                                            <td />
                                            <td />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><h4>Top 5 Items Sold</h4></div>
                        <div className="card-body">
                            <div>
                                <canvas id="canvasBar">{chart['bar']}</canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-danger text-white"><h4>Customer Table</h4></div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-bordered table-sm">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Pos</th>
                                            <th>Customer</th>
                                            <th>Customer Reg No</th>
                                            <th>Entry (times)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>{ }</td>
                                            <td>{ }</td>
                                            <td>{ }</td>
                                            <td>{ }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-danger text-white"><h4>Top 5 Customers</h4></div>
                        <div className="card-body">
                            <div>
                                <canvas id="canvasDou">{chart['dou']}</canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white"><h4>Total Car Entries</h4></div>
                        <div className="card-body">
                            <div>
                                <canvas id="canvasLine">{ }</canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white"><h4>Top 5 Items Sold</h4></div>
                        <div className="card-body">
                            <div>
                                <canvas id="canvasPie">{ }</canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wrapper
