import './wrapper.css'
import ShowCount from './ShowCount';
import { useState } from 'react'
import { testCustomers, testStock } from '../../assets/DataModel';

import { initStocks } from '../Stock/ShowStocks';
import { initCustomers } from '../Customers/ShowCustomers';
import { initEmployee } from '../Employee/AddEmployee';
import { getStockData } from '../Cars/Checkout';
import { categoryOptions } from '../../assets/DataModel';
import { getIndexed } from '../../assets/utilities';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns } from '../Cars/Checkout';
import { Chart as ChartJS } from 'chart.js/auto'
import Chart from './Chart'
import { testCar } from '../../assets/DataModel';

const Wrapper = () => {
    const initStocks=()=>{
        let x= localStorage.getItem('stocks');
        if (x) {
          return JSON.parse(x)
        }
        else {
          localStorage.setItem('stocks', JSON.stringify(testStock))
          return testStock
        }
      }
    const initCars = () => {
        let x = localStorage.getItem('cars');
        if (x) {
            return JSON.parse(x)
        }
        else {
            localStorage.setItem('cars', JSON.stringify(testCar))
            return testCar
        }

    }
    /* const initCustomers = () => {
         let x= localStorage.getItem('customers');
         if(x){
             return JSON.parse(x)
         }
         else{
              localStorage.setItem('customers',JSON.stringify(testCustomers))
              return testCustomers
         }
       
     }*/
    /*const initStocks = () => {
        return JSON.parse(localStorage.getItem('stocks') || JSON.stringify(testStock))
    }*/

    const [customers, setCustomers] = useState(initCustomers())
    const [stock, setStock] = useState(initStocks())
    const [employees, setEmployee] = useState(initEmployee())
    const [cars, setCars] = useState(initCars())
    const getStockData = () => {
        let stockData = [];
        categoryOptions.forEach((element) => {
            let count = 0
            if (stock.length > 0) {
                stock.map((st) => {
                    if (st.category == element && st.sold) {
                        let newData = { category: element, qty: count + 1 }
                        stockData.push(newData)
                    }
                })
            }

        })
        return stockData
    }

    /* useEffect(() => {
         localStorage.setItem('customers', JSON.stringify(initCustomers()))
     }, [customers])*/


    /*useEffect(() => {
        localStorage.setItem('stocks', JSON.stringify(testStock))
    }, [stocks])*/
    const getAvailableStock = () => {
        let count = 0
        getStockData().map((st) => {
            count += st.qty
        })
        return stock.length - count
    }
    const getTopFive = (soldStocks) => {
        soldStocks.sort((prev, next) => {
            return prev.count - next.count
        })
        let topFive = []
        let topCount=5
        if(soldStocks.length<5){
            topCount=soldStocks.length
        }
        for (let i = 0; i < topCount; i++) {
            topFive.push(soldStocks[i])
        }
        console.log(topFive);
        return topFive
    }
    return (

        <div className="container-fliud" style={{ marginBottom: '30px' }}>
            <div className="row">
                <ShowCount bg={"primary"} title={"Customers"} iname={"users"} count={customers.length} />
                <ShowCount bg={"success"} title={"Cars"} iname={'automobile'} count={cars.length} />
                <ShowCount bg={"warning"} title={"Stocks"} iname={'gears'} count={getAvailableStock()} />
                <ShowCount bg={"danger"} title={"Employees"} iname={"briefcase"} count={employees.length} />
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><h4>Sold Items Table</h4></div>
                        <div className="card-body">
                            <div className="table-responsive">

                                <BootstrapTable striped hover bordered
                                    keyField='id'
                                    data={getIndexed(getTopFive(getStockData()))}
                                    columns={columns}>
                                </BootstrapTable>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><h4>Top 5 Items Sold</h4></div>
                        <div className="card-body">
                            <div>
                                <Chart
                                    type={'bar'}
                                    data_labels={getTopFive(getStockData(true))}

                                />
                                {/*  <canvas id="canvasBar">{}</canvas>*/}
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
                                <canvas id="canvasDou">{ }</canvas>
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
                                <Chart
                                    type={'pie'}
                                    data_labels={getTopFive(getStockData(true))}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wrapper
