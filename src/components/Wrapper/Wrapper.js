import './wrapper.css'
import ShowCount from './ShowCount';
import { useState, useEffect } from 'react'
import { categoryOptions } from '../../assets/DataModel';
import { getIndexed } from '../../assets/utilities';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns } from '../Cars/Checkout';
import Chart from './Chart'
import { apiURL } from '../../assets/api';

const Wrapper = () => {
    const [customerList, setCustomerList] = useState([])
    const [carList, setCarList] = useState([])
    const [stockList, setStockList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [soldItemList, setSoldItemList] = useState([])
    const [topFiveSold, setTopFiveSold] = useState([])
    const getTopFive = ([...soldItems]) => {

        soldItems.sort((prev, next) => {
            return next.qty - prev.qty
        })

        const topFive = []
        let topCount = 5
        if (soldItems.length < 5) {
            topCount = soldItems.length
        }
        for (let i = 0; i < topCount; i++) {
            topFive.push(soldItems[i])
        }

        return topFive

    }
    const getFirebaseData = async () => {
        apiURL.get('/.json').then((res) => {
            //set Customers
            const customers = []
            if (res.data.customer) {
                Object.keys(res.data.customer).map((key) => {
                    let newObj = res.data.customer[key]
                    customers.push(newObj)
                })
                customers.reverse()
                setCustomerList(customers)
            }
            else {
                setCustomerList([])
            }

            //set Stocks
            const stocks = []
            if (res.data.stock) {
                Object.keys(res.data.stock).map((key) => {
                    let newObj = res.data.stock[key]
                    stocks.push(newObj)
                })
                stocks.reverse()
                setStockList(stocks)

            }
            else {
                setStockList([])
            }

            let soldItems = [];
            categoryOptions.forEach((element) => {
                let itemCount = 0
                stocks.map((st) => {
                    if (st.category == element && st.sold) {
                        itemCount += 1
                    }
                })
                if (itemCount > 0) {
                    soldItems.push({ category: element, qty: itemCount })
                }

            })
            setSoldItemList(soldItems)
            //set SOld
            /*     const soldItems = [];
                 categoryOptions.forEach((element) => {
                     let count = 0
                     if (stocks.length > 0) {
                         stocks.map((st) => {
                             if (st.category == element && st.sold) {
                                 let newData = { category: element, qty: count + 1 }
                                 soldItems.push(newData)
                             }
                         })
                     }
     
                 })
                 setSoldItemList(soldItems)
     
                 //Set Top Five
     
                 soldItems.sort((prev, next) => {
                     return prev.count - next.count
                 })
                 const topFive = []
                 let topCount = 5
                 if (soldItems.length < 5) {
                     topCount = soldItems.length
                 }
                 for (let i = 0; i < topCount; i++) {
                     topFive.push(soldItems[i])
                 }
     
                 setTopFiveSold(topFive)
     */

            //set Cars
            const cars = []
            if (res.data.car) {
                Object.keys(res.data.car).map((key) => {
                    let newObj = res.data.car[key]
                    cars.push(newObj)
                })
                cars.reverse()
                setCarList(cars)
            }
            else {
                setCarList([])
            }

            //set Employees

            const employees = []
            if (res.data.employee) {
                Object.keys(res.data.employee).map((key) => {
                    let newObj = res.data.employee[key]
                    employees.push(newObj)
                })
                employees.reverse()
                setEmployeeList(employees)
            }
            else {
                setEmployeeList([])
            }



        })
    }





    useEffect(() => {
        getFirebaseData()
    }, [])

    const getAvailable = (data, prop) => {
        let count = 0
        if (data.length > 0) {
            data.map((dt) => {
                if (!dt[prop]) {
                    count = count + 1
                }
            })
        }

        return count

    }

    return (

        <div className="container-fliud" style={{ marginBottom: '30px' }}>
            <div className="row">
                <ShowCount bg={"primary"} title={"Customers"} iname={"users"} count={customerList.length} />
                <ShowCount bg={"success"} title={"Cars"} iname={'automobile'} count={getAvailable(carList, 'statusOut')} />
                <ShowCount bg={"warning"} title={"Stocks"} iname={'gears'} count={getAvailable(stockList, 'sold')} />
                <ShowCount bg={"danger"} title={"Employees"} iname={"briefcase"} count={employeeList.length} />
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white"><h4>Sold Items Table</h4></div>
                        <div className="card-body">
                            <div className="table-responsive">

                                <BootstrapTable striped hover bordered
                                    keyField='id'
                                    data={getIndexed(getTopFive(soldItemList))}
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
                                {/*soldItemList.length>0?(<Chart
                                    type={'bar'}
                                    data_labels={soldItemList}

                                />)
                           :(<div> nai</div>)*/}
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
                                {/*<Chart
                                    type={'pie'}
                                    data_labels={topFiveSold}

                                />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wrapper
