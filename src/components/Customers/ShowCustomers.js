import React, { useState, useEffect, useMemo } from 'react';
import { testCustomers } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLocalStorage } from '../../assets/utilities';
import * as ReactBootstrap from 'react-bootstrap'
import { Button } from 'bootstrap';
import { getIndexed, sortFunc } from '../../assets/utilities';
import './showCustomer.css'
 export const  initCustomers = () => {
    let x = localStorage.getItem('customers');
    if (x) {
      return JSON.parse(x)
    }
    else {
      localStorage.setItem('customers', JSON.stringify(testCustomers))
      return testCustomers
    }

  }
const ShowCustomers = () => {


 

 
  const [customers, setCustomers] = useState(initCustomers())
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(initCustomers()))
    
  }, [customers])
  const data = customers
  
  //console.log(data);
  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: 'true',
      sortCaret: sortFunc,
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },
    {
      dataField: 'regNo',
      text: 'Reg. No.',
      sort: 'true',
      sortCaret: sortFunc
      
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: 'true',
      sortCaret: sortFunc
    },
    {
      dataField: 'dob',
      text: 'Date of birth'
     
    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: 'true',
      sortCaret: sortFunc
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: 'true',
      sortCaret: sortFunc
    },
    {
      dataField: 'address',
      text: 'Address'
    },
    {
      dataField: 'phone',
      text: 'Contact',
      sort: 'true',
      sortCaret: sortFunc
    },
    {
      dataField: 'joinDate',
      text: 'Date Joined'
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
        <h2>Customer List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick="initAdd(content)" >Add Customer</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          
          <BootstrapTable striped hover bordered 
            headerClasses= 'bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(customers)}
            columns={columns}
            pagination={paginationFactory()}
            className='testCont'
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

export default ShowCustomers;
