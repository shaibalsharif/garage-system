import BootstrapTable from 'react-bootstrap-table-next';
import { useState } from 'react';
import { initCustomers } from '../Customers/ShowCustomers';

import { initStocks } from '../Stock/ShowStocks';
import { categoryOptions } from '../../assets/DataModel';
import { getIndexed } from '../../assets/utilities';

export  const columns = [
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

const Checkout = () => {
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
  

  //const customers = 
  //const stock = initStocks()
  const [cars,setCars]=useState(initCars())
  const [customers, setCustomers] = useState(initCustomers())
  const [stock,setStock]= useState(initStocks())
  const [buyList, setBuyList] = useState([])
  const [custName, setcustName] = useState("");
  const [carBrand, setcarBrand] = useState("");
  const [carModel, setcarModel] = useState("");
  const [carEntry, setcarEntry] = useState("");
  const [category, setCategory] = useState("")
  
  const getCarOptions=()=>{
  let carOptions = []
  cars.map((car) => {
    carOptions.push(car.carRegNo)
  })
  return carOptions
  }
 

  let stockOptions = []
  stock.map((st) => {
    stockOptions.push(st.category)
  })

  const [itemOptions, setitemOptions] = useState([])


  const getCheckOutCar = (carReg) => {
    const foundCar = cars.find((car) => {
      return car.carRegNo == carReg
    })
    return foundCar

  }
  const getCheckOutCustomer = (custReg) => {
    const foundCust = customers.find((customer) => {
      return customer.regNo == custReg
    })
    return foundCust
  }

  const handleCarIn = (e) => {

    const checkOutCar = getCheckOutCar(e.target.value)
    setcustName(getCheckOutCustomer(checkOutCar.custRegNo).name)
    setcarBrand(checkOutCar.brand)
    setcarModel(checkOutCar.model)
    setcarEntry(checkOutCar.entryDate)
    console.log(carBrand);

  }

const getStockData=(sold)=>{
  let stockData=[];
    categoryOptions.forEach((element)=>{
          let count=0
          stock.map((st)=>{
           if(st.category== element && !st.sold){
             let newData= {category: element, qty: count+1 }
             stockData.push(newData)
           }
          })
    })
    return stockData
}
   
 
  const getItems = (selectedCategory) => {

    let x = stock.map((st) => {

      if (!st.sold && st.category == selectedCategory) {
        console.log(st.itemNo);
        return st.itemNo

      }
    })
    return x
    console.log(x);
  }

  const handleSelectCate = (e) => {
    let selectedCategory = ""
    selectedCategory = e.target.value
    console.log(selectedCategory);
    setCategory(selectedCategory)
    let items = getItems(selectedCategory)
    console.log(getItems("AC"));
    items = items.filter((item) => {
      return item !== undefined
    })

    console.log(items);

    setitemOptions(items)
  }
  const getPrice = (code) => {
    let x = stock.find((st) => {
      return st.itemNo == code
    })
    return x.sellPrice
  }
 const setItemSold=(item)=>{
     let tempStock =[...stock]
     tempStock.map((ts)=>{
      if(ts.itemNo==item){
        ts.sold=true
      }
     })
 }
  const handleItemSelection = (e) => {
 
    const itemCode = e.target.value
       if(itemCode!=""){
         const newItem = { category: category, item: itemCode, price: getPrice(itemCode) }
    let buyItem = [...buyList]
    buyItem.push(newItem);
    setBuyList(buyItem)
    setItemSold(itemCode)
       }
    

  }
 
  return (<div className="container-fliude">
    <h2>Car Check Out</h2>
    <div className="row">
      <div className="card col-md-5" style={{ margin: '0px', padding: '0px' }}>
        <div className="card-body">
          <div className="table-responsive">
            <BootstrapTable striped hover bordered
              keyField='id'
              data={getIndexed(getStockData(false)) }
              columns={columns}>
            </BootstrapTable>
            {/*<table className="table table-striped table-hover table-bordered table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>SL No</th>
                  <th>Catagory</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
             </table>*/}
          </div>
        </div>
      </div>
      <div className="card col-md-7" style={{ margin: '0px', padding: '0px' }}>
        <div className="card-body checkOut">
          <h4>Car Info</h4>
          <div style={{ border: '1px solid', padding: '15px' }}>
            <div className="row">
              <div className="col">
                <p className='bg-dark text-light text-center'><strong>Car Reg. No.</strong></p>
                <select className='form-select form-control form-select-sm text-center' name="carReg" onChange={handleCarIn}>
                  <option value="" disabled selected hidden>Choose Car Reg. No.</option>
                  {getCarOptions().map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
                <br />
              </div>
              <div className="col">
                <p className='bg-dark text-light text-center'><strong>Customer Name</strong></p>
                <p className='text-center' style={{ border: '1px solid' }}>{custName}</p>
              </div>
            </div>
            <div className="row" style={{ padding: '5px 15px' }}>
              <div className="col " style={{ border: '1px solid' }}>
                <p className='bg-dark text-light text-center'><strong>Brand</strong></p>
                <p className='text-center' style={{ border: '1px solid' }}>{carBrand}</p>
              </div>
              <div className="col" style={{ border: '1px solid' }}>
                <p className='bg-dark text-light text-center'><strong>Model</strong></p>
                <p className='text-center' style={{ border: '1px solid' }}>{carModel}</p>
              </div>
              <div className="col" style={{ border: '1px solid' }}>
                <p className='bg-dark text-light text-center'><strong>Entry Date</strong></p>
                <p className='text-center' style={{ border: '1px solid' }}>{carEntry}</p>
              </div>
            </div>
          </div>
          <h4>Select Category &amp; Item</h4>
          <div className="row">
            <div className="col">
              <p><strong>Category</strong></p>
              <p>
                <select className="form-select form-control " onChange={handleSelectCate}>
                  <option value="" disabled selected hidden>Choose a Category</option>
                  {stockOptions.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </p>
            </div>
            <div className="col">
              <p><strong>Item</strong></p>
              <p>
                <select className="form-control form-select" onChange={handleItemSelection}>
                  <option value=""  selected >Choose item</option>
                  {itemOptions.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </p>
            </div>
          </div>
          <div className="col">
            <table className="table table-striped table-hover table-bordered table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>Catagory</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {buyList.map(bl => (<tr>
                  <td>{bl.category}</td>
                  {console.log(bl.price)}
                  <td>{bl.item}</td>
                  <td>{bl.price}</td>

                  <td className='text-center'>
                    <button className="btn btn-sm btn-danger" >X</button>
                  </td>

                </tr>))}
                <tr>
                  <th>Service Charge</th>
                  <th />
                  <th>
                    <input type="text" name="chagre" />
                  </th>
                </tr>
                <tr>
                  <th>Total</th>
                  <th />
                  <th>Total Price</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button type="button" className="btn btn-outline-primary" >Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Checkout