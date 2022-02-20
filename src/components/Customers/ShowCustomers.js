import React, { useState, useEffect, useMemo } from 'react';
import { testCustomers } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLocalStorage, rowEvents } from '../../assets/utilities';
import * as ReactBootstrap from 'react-bootstrap'
import { Button } from 'bootstrap';
import { getIndexed, sortFunc } from '../../assets/utilities';
import Modal from 'react-modal/lib/components/Modal';
import './showCustomer.css'
import AddCustomer from './AddCustomer';
import ReactModal from 'react-modal';
import CustomerFormTemplate from './CustomerFormTemplate';
import { newCustomer } from "../../assets/DataModel";
import { apiURL } from '../../assets/api'
import { toast } from 'react-toastify';
import ModalFormTemplate from './ModalFormTemplate';



export const initCustomers = () => {
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
  const actionsFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      < div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal"
        }}>
        <button className='btn btn-sm btn-outline-primary btn-block'
          onClick={onEditClick}>
          <i className='fa fa-pencil-square-o'>
          </i>
        </button>
      
      </div>
    );
  }
  const onEditClick=(e,row)=>{
    setToastMessege('Updated Cutomer:')
    setButtonValue('Update')
    setIsOpen(true)
  }
 const [buttonValue,setButtonValue]=useState('Submit')
  const [modalCustomer, setModalCustomer] = useState(newCustomer)
  const [toastMessege,setToastMessege]= useState("Added Customer: ")
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setToastMessege("Added Customer: ")
    setModalCustomer(newCustomer)
    setButtonValue('Submit')
    setIsOpen(true)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const closeModal = () => {
    setIsOpen(false);
  }
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.

  }
  const rowEvents={
    onClick: (e,row,rowIndex)=>{
     
       setModalCustomer(row);
    }
  } 
  const handleChange = (e) => {
    setCustomerDetails({
      ...(customerDetails),
      [e.target.name]: e.target.value

    });

  };
  const handleModalChange = (e) => {
    setModalCustomer({
      ...(modalCustomer),
      [e.target.name]: e.target.value

    });
  };
  
  const submit = (e) => {
    e.preventDefault()

    let tempCustomer = { ...modalCustomer };
    tempCustomer.name = tempCustomer.firstName[0].toUpperCase() + tempCustomer.firstName.substring(1) + " " + tempCustomer.lastName[0].toUpperCase() + tempCustomer.lastName.substring(1)
    delete tempCustomer.firstName
    delete tempCustomer.lastName

    apiURL.post('/customer.json', tempCustomer).then((response) => {
      console.log("WOrking firebase");
      console.log(response);
    })
    
    toast.success(toastMessege + tempCustomer.name, {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
    })

    e.target.reset();
    setIsOpen(false);

  }
  const [customerDetails, setCustomerDetails] = useState(newCustomer)

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
    }, {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter,
      attrs: { class: "EditRow" }
    }
  ]
   /*const  getSplit=()=>{
     let toSplit= JSON.parse(JSON.stringify(modalCustomer))
     if(toSplit.name==""){
       return toSplit
     }
     const name = toSplit.name.split(" ").map(m => m.trim()).filter(f => !!f);
     if(!!name[0]) {
      toSplit.firstName= name[0];
     }
     if(!!name[1]) {
      toSplit.lastName= name[1];
     }
     toSplit.phone = "afddfdsf"
    return toSplit;
      
   }*/
  return <div>
    <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Customer List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick={openModal} >Add Customer</button></h2>
      </div>


      <div className='card'>
        <div className='card-body'>

          <BootstrapTable striped hover bordered
            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(customers)}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
            className='testCont'
          >

          </BootstrapTable>
        </div>
      </div>
    </div>


    {/* Modals */}
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      appElement={document.getElementById('app')}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-body" >
        <h2>Customer Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal} style={{ background: 'none', position: 'absolute', right: -5, top: -5, margin: 0, padding: 0, border: 'none' }}>
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
           <ModalFormTemplate
           handleModalChange={handleModalChange}
           submit={submit}
           closeModal={closeModal}
           data={modalCustomer}
           buttonValue={buttonValue}
           />
          </div>
        </div>
      </div>
    </Modal>

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
