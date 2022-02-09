import React, { useState, useEffect, useMemo } from 'react';
import { testCustomers } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { sortFunc,getIndexed } from '../../assets/utilities'; 
import * as ReactBootstrap from 'react-bootstrap'
import {testStock} from '../../assets/DataModel'
const ShowStocks = () => {


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
  const[stock,setStock] =useState(initStocks())

  useEffect(()=>{
    localStorage.setItem('stocks',JSON.stringify(initStocks()))
  },[stock])
  const data=stock
  const columns = [
    {
      dataField: 'id',
      text: "SL. No.",
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },
    {
      dataField: 'category',
      text: 'Category',
      sort: 'true',
      sortCaret: sortFunc
      ,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'buyPrice',
      text: 'Buying Price',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'sellPrice',
      text: 'Selling Price',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'addDate',
      text: 'Adding Date',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'warrenty',
      text: 'Warrenty',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'warrentyEnd',
      text: 'Warrenty End',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    }
  ]



  return <div>
     <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Stock List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick="initAdd(content)" >Add Stock</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
            keyField='id'
            data={getIndexed(stock)}
            columns={columns}
            pagination={paginationFactory()}
          >

          </BootstrapTable>
        </div>
      </div>
    </div>
  </div>;
};

export default ShowStocks;
