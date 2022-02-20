import React, { useState, useEffect, useMemo } from 'react';
import { newEmp, testCustomers, testEmps } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLocalStorage } from '../../assets/utilities';
import * as ReactBootstrap from 'react-bootstrap'
import { Button } from 'bootstrap';
import { getIndexed, sortFunc } from '../../assets/utilities';
import actionsFormatter from '../Customers/ShowCustomers'
import { apiURL } from '../../assets/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal/lib/components/Modal';
import EmployeeModalFormTemplate from './EmployeeModalFormTemplate'
import uniqid from 'uniqid'
const ShowEmployees = () => {
 
  const initEmps = () => {
    let x = localStorage.getItem('employees');
    if (x) {
      return JSON.parse(x)
    }
    else {
      localStorage.setItem('employees', JSON.stringify(testEmps))
      return testEmps
    }

  }
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
    )}
    const onEditClick = (e, row) => {
      setToastMessege('Updated Employee:')
      setButtonValue('Update')
      setIsOpen(true)
    }
    const [buttonValue, setButtonValue] = useState('Submit')
    const [modalEmployee, setModalEmployee] = useState(newEmp)
    const [toastMessege, setToastMessege] = useState("Added Employee: ")
    const [modalIsOpen, setIsOpen] = useState(false)
    const openModal = () => {
      setToastMessege("Added Employee: ")
      setModalEmployee(newEmp)
      setButtonValue('Submit')
      setIsOpen(true)
    }
    const customStyles = {
      content: {
        top: '48%',
        left: '55%',
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
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
  
        setModalEmployee(row);
      }
    }
    const handleModalChange = (e) => {
      setModalEmployee({
        ...(modalEmployee),
        [e.target.name]: e.target.value
  
      });
    };
    const submit = (e) => {
      e.preventDefault()
  
      let tempEmp = { ...modalEmployee };
      tempEmp.name = tempEmp.firstName[0].toUpperCase() + tempEmp.firstName.substring(1) + " " + tempEmp.lastName[0].toUpperCase() + tempEmp.lastName.substring(1)
        tempEmp.regNo=uniqid()
        
      apiURL.post('/employee.json', tempEmp).then((response) => {
        
      })
  
      toast.success(toastMessege + tempEmp.name, {
        className: "SUCCESS_TOAST",
        position: toast.POSITION.TOP_CENTER
      })
  
      e.target.reset();
      setIsOpen(false);
  
    }
  const [employees, setEmployees] = useState(initEmps())
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(initEmps()))
    
  }, [employees])
  const data = employees
  
  console.log(data);
  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },{
      dataField: 'name',
      text: 'Name',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
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
    }, {
      dataField: 'phone',
      text: 'Contact',
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
      dataField: 'dob',
      text: 'Date of birth',
      
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'joinDate',
      text: 'Date Joined',
     
      headerClasses: 'bg-dark text-light'
    },{
      dataField: 'emergency',
      text: 'Emergency Contact',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter,headerClasses: 'bg-dark text-light',
      attrs: { class: "EditRow" }
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
        <h2>Employee List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick={openModal} >Add Employee</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
           headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(employees)}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
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
        <h2>Employee Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal} style={{ background: 'none', position: 'absolute', right: -5, top: -5, margin: 0, padding: 0, border: 'none' }}>
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
            <EmployeeModalFormTemplate
              handleModalChange={handleModalChange}
              submit={submit}
              closeModal={closeModal}
              data={modalEmployee}
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

export default ShowEmployees;
