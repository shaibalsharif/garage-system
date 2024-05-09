import React, { useEffect, useState } from 'react'
import Input from '../Inputs'

const CarSearchPanel = ({ customerId, setCustomerId, brand, setBrand, model, setModel,plate, setPlate, onchange }) => {
    const [customerList, setCustomerList] = useState([])

    useEffect(() => {
        setCustomerList([1, 2, 4, 5, 6])
    }, [])

    return (
        <div className='sm:flex  w-full h-full flex-wrap'>
            <Input name={'select-customer'} label={"Customer"} type='dropdown' value={customerId} onChange={(e)=>setCustomerId(e.target.value)}
                options={customerList}
            />
            <Input name={'search-brand'} label={"Brand"} type='search' value={brand} onChange={(e)=>setBrand(e.target.value)}

            />
            <Input name={'search-model'} label={"Model"} type='search' value={model} onChange={(e)=>setModel(e.target.value)}

            />

            <Input name={'search-plate'} label={"Plate"} type='search' value={plate} onChange={(e)=>setPlate(e.target.value)}

            />
        </div>
    )
}

export default CarSearchPanel