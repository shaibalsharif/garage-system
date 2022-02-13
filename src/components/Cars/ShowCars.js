import React, { useState, useEffect, useMemo } from 'react';
import { testCar } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLocalStorage } from '../../assets/utilities';
import * as ReactBootstrap from 'react-bootstrap'
import { Button } from 'bootstrap';
import { getIndexed, sortFunc } from '../../assets/utilities';
import {initCustomers} from "../Customers/ShowCustomers"

export const initCars = () => {
    let x = localStorage.getItem('cars');
    if (x) {
      return JSON.parse(x)
    }
    else {
      localStorage.setItem('cars', JSON.stringify(testCar))
      return testCar
    }

  }
const ShowCars = () => {

  
 
  const [cars, setCars] = useState(initCars())
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(initCars()))
    
  }, [cars])
 const customers= initCustomers()
  
 const getData=(customers, cars)=>{

       cars.map((car)=>{
           
          let matchCustomer
          matchCustomer= customers.find((customer)=>{
                if(car.custRegNo==customer.regNo){
                  console.log(car.custRegNo);
                  
                  return true
                }
            })
            
             console.log(matchCustomer);
             
             if(matchCustomer){
                car.custName=matchCustomer.name;
              }
           
           
            console.log(matchCustomer);
      })
      return cars
 }
  
  
  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },
    {
      dataField: 'carRegNo',
      text: 'Car Reg. No.',
      sort: 'true',
      sortCaret: sortFunc
      ,
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: 'custRegNo',
      text: 'Customer Reg. No.',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'custName',
      text: 'Customer Name',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'brand',
      text: 'Car Brand',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'model',
      text: 'Car Model',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'numPlate',
      text: 'Car Number Plate',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'color',
      text: 'Car Color',sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'engine',
      text: 'Car Engine No.',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'emergency',
      text: 'Emergency Contact',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'problem',
      text: 'Initial Problem',
      headerClasses: 'bg-dark text-light'
    }
  ]
  {/*  <button className="btn btn-sm btn-outline-primary btn-block" onClick="initEdit(content,cus)">
                      <i className="fa fa-pencil-square-o" />
                    </button>
                    <button className="btn btn-sm btn-outline-danger btn-block" onClick="initArchive(delete,cus)">
                      <i className="fa fa-trash" />
                    </button> */ }
  return  <div>
    <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Car list</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick="initAdd(content)" >Add Customer</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
            keyField='id'
            data={getIndexed(getData(customers, cars))}
            columns={columns}
            pagination={paginationFactory()}
          >

          </BootstrapTable>
        </div>
      </div>
    </div>


    {/* Modals */}

    {<div className="modal-body" style={{ display: 'none' }}>
      <h2>Customer Form
        <button type="button" className="close" aria-label="Close" onClick="d('Cross click')">
          <span aria-hidden="true">×</span>
        </button>
      </h2>
      <div className="card">
        <div className="card-body">
          <form >
            <cutomer-form />
            <button type="button" className="btn btn-outline-primary" onClick="submitCustomer()">Submit</button>
            <button type="button" className="btn btn-outline-primary" onClick="updateCustomer()">Update</button>
            <button type="button" className="btn btn-outline-danger" onClick="c('Close click')">Close</button>
          </form>
        </div>
      </div>
    </div>}


    <div className="modal-body text-center" style={{ display: 'none' }}>
      <h4>Do you want to delete?
        <button type="button" className="close" aria-label="Close" onClick="d('Cross click')">
          <span aria-hidden="true">×</span>
        </button>
      </h4>
      <div>
        <button className="btn btn-outline-primary" onClick="archiveCustomer()">Yes</button>
        <button className="btn btn-outline-danger" onClick="c('Close click')">No</button>
      </div>
    </div>
  </div>
};

export default ShowCars;
