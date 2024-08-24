
import { useState, useEffect, forwardRef } from 'react';

import { categoryOptions } from '../../assets/DataModel';
import { getIndexed, toUnicodeVariant } from '../../assets/utilities';
import { apiURL } from '../../assets/api'
import { useNavigate } from 'react-router-dom';
import Input from '../Inputs/index'
import Table from '../Table';


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


const CheckoutForm = forwardRef((props, ref) => {

  const columns_prices = [
    {
      dataField: 'category', headerClasses: 'bg-dark text-light',
      text: "Category"
    }, {
      dataField: "itemNo", headerClasses: 'bg-dark text-light',
      text: 'Item'
    }, {
      dataField: 'sellPrice', headerClasses: 'bg-dark text-light',
      text: "Price"
    },
    {
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"

          onClick={(e) => { removeBuyItem(e, row?.itemNo) }}
        >
          X
        </button>
      ), button: true,
      dataField: "edit",
      text: "Edit",
      sort: false,
      /*  formatter: actionsFormatter, */
      attrs: { className: "EditRow" }
    }]


  const handlePrint = () => {
    window.print()
  };




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
  const navigate = useNavigate()


  const getFirebaseData = () => {

    

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
    const stock = []
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


  const removeBuyItem = (e, removeKeyProp) => {

    const td = e.target.parentNode
    const tr = td.parentNode
    const removeKey = removeKeyProp || tr.children[1].textContent;

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
    if (e.target.name == 'discount') {
      if (e.target.value > 100) {
        setDiscount(100); e.target.value = 100;
      }
      else {
        setDiscount(e.target.value)
      }
    }
    else {
      setServiceCharge(e.target.value)
    }

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
      <div className="flex flex-wrap ">
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 md:w-2/5 pr-4 pl-4"
          id="available-stock-table" style={{ margin: '0px', padding: '0px' }}>
          <div className="flex-auto p-6">
            <div className="table-responsive block w-full overflow-auto scrolling-touch">
              <Table  data={getIndexed(availableStock)}
                column={columns}/>
              

            </div>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 md:w-3/5 pr-4 pl-4"
          ref={ref} style={{ margin: '0px', padding: '0px' }}>
          <div className="flex-auto p-6 checkOut" >
            <h4>Car Info</h4>
            <div style={{ border: '1px solid', padding: '15px' }}>
              <div className="flex flex-wrap">
                <div className="relative flex-grow max-w-full flex-1 px-4">
                  <p className='bg-dark text-light text-center'><strong>Car Reg. No.</strong></p>

                  <Input className='form-select block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded form-select-sm text-center'
                    type='dropdown' options={carRegOptions} label={'Car Reg. No.'}
                    selected={<option value="" disabled selected hidden>Choose Car Reg. No.</option>}
                    onChange={handleCarIn} />

                  <br />
                </div>
                <div className="relative flex-grow max-w-full flex-1 px-4">
                  <p className='bg-dark text-light text-center'><strong>Customer Name</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(custName, 'bold sans', 'bold')}</p>
                </div>
              </div>
              <div className="flex flex-wrap " style={{ padding: '5px 15px' }}>
                <div className="relative flex-grow max-w-full flex-1 px-4 " style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Brand</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carBrand, 'bold sans', 'bold')}</p>
                </div>
                <div className="relative flex-grow max-w-full flex-1 px-4" style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Model</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carModel, 'bold sans', 'bold')}</p>
                </div>
                <div className="relative flex-grow max-w-full flex-1 px-4" style={{ border: '1px solid' }}>
                  <p className='bg-dark text-light text-center'><strong>Entry Date</strong></p>
                  <p className='text-center' style={{ border: '1px solid' }}>{toUnicodeVariant(carEntry, 'bold sans', 'bold')}</p>
                </div>
              </div>
            </div>
            <h4>Select Category &amp; Item</h4>
            <div className="flex flex-wrap ">
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <Input type='dropdown' options={getStockOptions()} label={'Category'} selected={<option value="" selected >Choose a Category</option>}
                  onChange={handleSelectCate} />
              </div>
              <div className="relative flex-grow max-w-full flex-1 px-4">
                <Input disabled={category ? false : true} type='dropdown' options={itemOptions} label={'Item'} selected={<option value="" selected  >Choose item</option>}
                  onChange={handleItemSelection} />
              </div>

            </div>
            <div className="relative flex-grow max-w-full flex-1 px-4">

              <Table column={columns_prices}
                data={buyList} />

              {/*   <thead className="thead-dark">
                  <tr>
                    <th>Catagory</th>
                    <th>Item</th>
                    <th >Price</th>
                    <th>Remove</th>
                  </tr>
                </thead> */}



              {/*    {buyList.map(bl => (
                    <tr>
                      <td>{bl.category}</td>

                      <td>{bl.itemNo}</td>
                      <td>{bl.sellPrice}</td>

                      <td className='text-center'>
                        <button className="btn btn-sm btn-danger" onClick={removeBuyItem} >X</button>
                      </td>

                    </tr>))} */}

              <div className=' text-end '>
                <div className='ml-auto w-[400px]'>

                  <Input labelStyle='horizontal' label={'Discount'} name={'discount'} type='number' onChange={handleService} placeholder='0%' />
                  <Input labelStyle='horizontal' label={'Service Charge'} name={'serviceCharge'} type='number' onChange={handleService} />
                  <Input labelStyle='horizontal' disabled label={'Total'} name={'total'} type='number' value={getTotalPrice()} />


                </div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </div>

  )
})

export default CheckoutForm
