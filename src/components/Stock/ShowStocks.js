import React, { useState, useEffect, useMemo } from 'react';
import { testCustomers } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { sortFunc,getIndexed } from '../../assets/utilities'; 
import * as ReactBootstrap from 'react-bootstrap'

const ShowStocks = () => {

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
      dataField: 'regNo',
      text: 'Reg. No.',
      sort: 'true',
      sortCaret: sortFunc
      ,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'dob',
      text: 'Date of birth',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'address',
      text: 'Address',
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'phone',
      text: 'Contact',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'joinDate',
      text: 'Date Joined',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    }
  ]



  return <div>
     <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Customer List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick="initAdd(content)" >Add Customer</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
            keyField='id'
            data={getIndexed(testCustomers)}
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
