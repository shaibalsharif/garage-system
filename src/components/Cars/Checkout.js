import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';

import { categoryOptions } from '../../assets/DataModel';
import { getIndexed, toUnicodeVariant } from '../../assets/utilities';
import { apiURL } from '../../assets/api'
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";



export const columns = [
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

 

  const handlePrint=()=>{
    window.print()
  };
    //printjs prints
    //clear values
    //update stock
    //update car & car statusOut
    //update customer entry count

  

  const [carList, setCarList] = useState([])
  const [customerList, setCustomerList] = useState([])
  const [stockList, setStockList] = useState([])
  const [availableStock, setAvailableStock] = useState([])
  const [carRegOptions, setCarRegOptions] = useState([])
  const [buyList, setBuyList] = useState([])
  const [custName, setcustName] = useState("");
  const [carBrand, setcarBrand] = useState("");
  const [carModel, setcarModel] = useState("");
  const [carEntry, setcarEntry] = useState("");
  const [category, setCategory] = useState("")
  const [itemOptions, setitemOptions] = useState([])
  const [serviceCharge, setServiceCharge] = useState(0)
  const [discount, setDiscount] = useState(0)
  const navigate= useNavigate()

      
  const getFirebaseData = () => {

   if(!localStorage.getItem('login')){
     navigate('/')
   }

    apiURL.get('/.json').then((res) => {

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




      const stocks = []
      if (res.data.stock) {
        Object.keys(res.data.stock).map((key) => {
          let newObj = res.data.stock[key]
          if (!newObj.sold) {
            newObj.itemNo = key
            stocks.push(newObj)
          }
        })
        stocks.reverse()
        setStockList(stocks)

      }
      else {
        setStockList([])
      }

      let avilableItems = [];
      categoryOptions.forEach((element) => {
        let itemCount = 0
        stocks.map((st) => {
          if (st.category == element) {
            itemCount += 1
          }
        })
        if (itemCount > 0) {
          avilableItems.push({ category: element, qty: itemCount })
        }

      })
      setAvailableStock(avilableItems)


      const cars = []
      const options = []
      if (res.data.car) {
        Object.keys(res.data.car).map((key) => {
          let newObj = res.data.car[key]
          newObj.carRegNo = key
          cars.push(newObj)
          options.push(key)
        })

        setCarList(cars)
        setCarRegOptions(options)


      }
      else {
        setCarList([])
        setCarRegOptions([])
      }



    })
  }



  const getStockOptions = () => {
    const stockOptions = []
    availableStock.map((st) => {
      if (st.qty > 0) {
        stockOptions.push(st.category)
      }
    })
    return stockOptions
  }
  let stockOptions = []
  stockList.map((st) => {
    stockOptions.push(st.category)
  })

  const handleCarIn = (e) => {
    const regNoInput = e.target.value
    const checkOutCar = carList.find((car) => {
      return car.carRegNo == regNoInput
    })
    console.log(checkOutCar);
    setcustName(checkOutCar.custName)
    setcarBrand(checkOutCar.brand)
    setcarModel(checkOutCar.model)
    setcarEntry(checkOutCar.entryDate)
  }





  const handleSelectCate = (e) => {

    const selectedCategory = e.target.value
    const itemOption = []
    stockList.map((st) => {

      if (st.category == selectedCategory) {
        //  debugger
        itemOption.push(st.itemNo)
        //     debugger
      }
    })

    setitemOptions(itemOption)
    // debugger
    setCategory(selectedCategory)
  }
  const getPrice = (code) => {
    let x = stock.find((st) => {
      return st.itemNo == code
    })
    return x.sellPrice
  }
  const setItemSold = (item) => {
    let tempStock = [...stockList]
    tempStock.map((ts) => {
      if (ts.itemNo == item) {
        ts.sold = true
      }
    })
  }

  const handleItemSelection = (e) => {
    const selectedItem = e.target.value;
    const tempBuyList = [...buyList]
    apiURL.patch(`/stock/${selectedItem}.json`, { sold: true }).then((res) => {
      apiURL.get(`/stock/${selectedItem}.json`).then((res) => {
        res.data.itemNo = selectedItem
        tempBuyList.push(res.data)
        console.log(res.data);
        setBuyList(tempBuyList)
        console.log(tempBuyList);
        getFirebaseData()
      })

    })
    setAvailableStock([])
    setitemOptions([])
  }


  const removeBuyItem = (e) => {
    const td = e.target.parentNode
    const tr = td.parentNode
    const removeKey = tr.children[1].textContent;
    apiURL.patch(`/stock/${removeKey}.json`, { sold: false }).then((res) => {
      console.log(res);
      const result = []
      buyList.map(bl => {
        if (bl.itemNo != removeKey) {
          result.push(bl)
        }
      })
      setBuyList(result);
      getFirebaseData()
    })


  }
  const handleService = (e) => {
    e.target.name == 'discount' ? (e.target.value > 100 ? (setDiscount(100), e.target.value = 100) :
      setDiscount(e.target.value)) : setServiceCharge(e.target.value)

  }
  const getTotalPrice = () => {

    let total = 0;
    if (buyList.length > 0) {
      buyList.map((bl) => {
        total += bl.sellPrice
      })
    }

    let tempTotal = total + parseFloat(serviceCharge)

    tempTotal = tempTotal - (tempTotal * (discount / 100))
    return tempTotal
  }
  useEffect(() => {
    getFirebaseData()
  }, [])

  return (
    <div className="container-fliude">
      <h2>Car Check Out</h2>
      <div className="row">
        <div className="card col-md-5" style={{ margin: '0px', padding: '0px' }}>
          <div className="card-body">
            <div className="table-responsive">
              <BootstrapTable striped hover bordered
                keyField='id'
                data={getIndexed(availableStock)}
                columns={columns}>
              </BootstrapTable>
             
            </div>
          </div>
        </div>
        <div className="card col-md-7" style={{ margin: '0px', padding: '0px' }}>
          <div className="card-body checkOut" >
            <h4>Car Info</h4>
            <div style={{ border: '1px solid', padding: '15px' }}>
              <div className="row">
                <div className="col">
                  <p className='bg-dark text-light text-center'><strong>Car Reg. No.</strong></p>
                  <select className='form-select form-control form-select-sm text-center' name="carReg" onChange={handleCarIn}>
                    <option value="" disabled selected hidden>Choose Car Reg. No.</option>
                    {carRegOptions.map(option => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                  <br />
                </div>
                <div className="col">
                  <p className='bg-dark text-light text-center'><strong>Customer Name</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(custName, 'bold sans', 'bold')}</p>
                </div>
              </div>
              <div className="row" style={{ padding: '5px 15px' }}>
                <div className="col " style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Brand</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carBrand, 'bold sans', 'bold')}</p>
                </div>
                <div className="col" style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Model</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carModel, 'bold sans', 'bold')}</p>
                </div>
                <div className="col" style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Entry Date</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carEntry, 'bold sans', 'bold')}</p>
                </div>
              </div>
            </div>
            <h4>Select Category &amp; Item</h4>
            <div className="row">
              <div className="col">
                <p><strong>Category</strong></p>
                <p>
                  <select className="form-select form-control " onChange={handleSelectCate}>
                    <option value="" selected >Choose a Category</option>
                    {getStockOptions().map(option => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </p>
              </div>
              <div className="col">
                <p><strong>Item</strong></p>
                <p>
                  <select className="form-control form-select" onChange={handleItemSelection}>
                    <option value="" selected  >Choose item</option>
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
                    <th >Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>


                  {buyList.map(bl => (
                    <tr>
                      <td>{bl.category}</td>

                      <td>{bl.itemNo}</td>
                      <td>{bl.sellPrice}</td>

                      <td className='text-center'>
                        <button className="btn btn-sm btn-danger" onClick={removeBuyItem} >X</button>
                      </td>

                    </tr>))}
                  <tr>
                    <th>Discount</th>
                    <th />
                    <th>
                      <input type="number" name="discount" placeholder='0%' onChange={handleService} />
                    </th>
                  </tr>
                  <tr>
                    <th>Service Charge</th>
                    <th />
                    <th>
                      <input type="number" name="serviceCharge" onChange={handleService} />
                    </th>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <th />
                    <th>{getTotalPrice()}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <button type="button" className="btn btn-outline-primary" onClick={handlePrint} >Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout