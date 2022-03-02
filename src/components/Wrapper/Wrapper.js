
import ShowCount from './ShowCount';
import { useState, useEffect } from 'react'
import { categoryOptions } from '../../assets/DataModel';
import { getIndexed } from '../../assets/utilities';
import BootstrapTable from 'react-bootstrap-table-next';

import { apiURL } from '../../assets/api';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Wrapper = () => {
    const [customerList, setCustomerList] = useState([])
    const [carList, setCarList] = useState([])
    const [stockList, setStockList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [soldItemList, setSoldItemList] = useState([])
    const [topFiveSold, setTopFiveSold] = useState([])
    const soldColumns = [
        {
            dataField: 'id', headerClasses: 'bg-dark text-light',
            text: "SL. No."
        }, {
            dataField: "category", headerClasses: 'bg-dark text-light',
            text: 'Category'
        }, {
            dataField: 'qty', headerClasses: 'bg-dark text-light',
            text: "Quantuty"
        }]
    const custColumns = [
        {
            dataField: 'id', headerClasses: 'bg-dark text-light',
            text: "SL. No."
        }, {
            dataField: "name", headerClasses: 'bg-dark text-light',
            text: 'Customer'
        }, {
            dataField: 'regNo', headerClasses: 'bg-dark text-light',
            text: "Reg No"
        }, {
            dataField: 'entryCount', headerClasses: 'bg-dark text-light',
            text: "Entry (times)"
        }]
    const getTopFiveSold = ([...soldItems]) => {

        soldItems.sort((prev, next) => {
            return next.qty - prev.qty
        })

        const topFive = []
        let topCount = 5
        if (soldItems.length < 5) {
            topCount = soldItems.length
        }
        for (let i = 0; i < topCount; i++) {
            if (soldItems[i].qty <= 0) {
                continue
            }
            topFive.push(soldItems[i])
        }

        return topFive

    }
    const getTopFiveCustomer = ([...customers]) => {
        customers.sort((prev, next) => {
            return next.entryCount - prev.entryCount
        })

        const topFive = []
        let topCount = 5
        if (customers.length < 5) {
            topCount = customers.length
        }
        for (let i = 0; i < topCount; i++) {
            if (customers[i].entryCount == 0) {
                continue
            }
            topFive.push(customers[i])
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
                    newObj.regNo = key
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
    //getTopFive(soldItemList))
    const getSoldData = () => {

        return {
            // labels: getLabels(),
            labels: getTopFiveSold(soldItemList.map((sl) => sl.category)),

            datasets: [{
                label: '# of items sold',
                // data: getData(),
                data: getTopFiveSold(soldItemList.map((sl) => sl.qty)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            }]
        }
    }
    const getCustLabels = () => {
        const nameLabels = getTopFiveCustomer(customerList.map((cs) => cs.name))
        
      nameLabels.push('others')
        
        console.log(nameLabels);
        return nameLabels
    }
    const getCustomerPercentage = () => {
        let totalEntries = 0;
        customerList.map((cs) => {
            totalEntries += cs.entryCount
        })
          
        const dataList = getTopFiveCustomer(customerList.map((sl) => sl.entryCount))
        const dataPercent = []
        let percnetEntries = 0
        dataList.map((dl_item) => {
            percnetEntries += dl_item
            dataPercent.push((dl_item * 100) / totalEntries)
        })
        dataPercent.push((totalEntries-percnetEntries)*100/totalEntries)
        return dataPercent
    }

    const getCustData = () => {
        return {
            // labels: getLabels(),
            labels: getCustLabels(),

            datasets: [{
                label: '# of items sold',
                // data: getData(),
                data: getCustomerPercentage(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,

            }]
        }
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
                                    data={getIndexed(getTopFiveSold(soldItemList))}
                                    columns={soldColumns}>
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
                                {soldItemList.length > 0 ?
                                    <Bar data={getSoldData()}
                                       /> : <></>}

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
                                <BootstrapTable striped hover bordered
                                    keyField='id'
                                    data={getIndexed(getTopFiveCustomer(customerList))}
                                    columns={custColumns}>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-danger text-white"><h4>Top 5 Customers</h4></div>
                        <div className="card-body">
                            <div>
                                {soldItemList.length > 0 ?
                                    <Doughnut data={getCustData()}
                                    options={{
                                        radius:"60%"
                                    }}
                                    /> : <></>}

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
                                {soldItemList.length > 0 ?
                                    <Line data={getSoldData()} /> : <></>}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white"><h4>Top 5 Items Sold</h4></div>
                        <div className="card-body">
                            <div>
                                {soldItemList.length > 0 ?
                                    <Pie data={getSoldData()}
                                    options={{
                                        radius:"75%"
                                    }} /> : <></>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wrapper
