import React, { useState, useEffect, useMemo } from 'react';
import { newCar, testCar } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLocalStorage } from '../../assets/utilities';
import * as ReactBootstrap from 'react-bootstrap'
import { Button } from 'bootstrap';
import { getIndexed, sortFunc } from '../../assets/utilities';
import { initCustomers } from "../Customers/ShowCustomers"
import actionsFormatter from '../Customers/ShowCustomers'
import Modal from 'react-modal/lib/components/Modal';
import CarModalFormTemplate from './CarModalFormTemplate';
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
  const onEditClick = (e, row) => {
    setToastMessege('Updated Car:')
    setButtonValue('Update')
    setIsOpen(true)
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
    );
  }



  const [buttonValue, setButtonValue] = useState('Submit')
  const [modalCar, setModalCar] = useState(newCar)
  const [toastMessege, setToastMessege] = useState("Added Car: ")
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setToastMessege("Added Car: ")
    setModalCar(newCar)
    setButtonValue('Submit')
    setIsOpen(true)
  }

  const customStyles = {
    content: {
      top: '52%',
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

      setModalCar(row);
    }
  }
  const handleModalChange = (e) => {
    setModalCar({
      ...(modalCar),
      [e.target.name]: e.target.value

    });
  };
  const submit = (e) => {
    e.preventDefault()

    let tempCar = { ...modalCar };
   

    apiURL.post('/car.json', tempCar).then((response) => {
      
    })

    toast.success(toastMessege + tempCar.model, {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
    })

    e.target.reset();
    setIsOpen(false);

  }

  const [cars, setCars] = useState(initCars())
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(initCars()))

  }, [cars])
  const customers = initCustomers()

  const getData = (customers, cars) => {

    cars.map((car) => {

      let matchCustomer
      matchCustomer = customers.find((customer) => {
        if (car.custRegNo == customer.regNo) {
          console.log(car.custRegNo);

          return true
        }
      })
      if (matchCustomer) {
        car.custName = matchCustomer.name;
      }

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
      text: 'Car Color', sort: 'true',
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
      dataField: 'entryDate',
      text: 'Car Entry Date',
      
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
    }, {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter,
      attrs: { class: "EditRow" }
    }
  ]

  {/*  <button className="btn btn-sm btn-outline-primary btn-block" onClick="initEdit(content,cus)">
                      <i className="fa fa-pencil-square-o" />
                    </button>
                    <button className="btn btn-sm btn-outline-danger btn-block" onClick="initArchive(delete,cus)">
                      <i className="fa fa-trash" />
                    </button> */ }
  return <div>
    <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Car list</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right"
          onClick={openModal} >Add Car</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(getData(customers, cars))}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
            className='testCont'
          >

          </BootstrapTable>
        </div>
      </div>
    </div>


    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >

      <div className="modal-body">
        <h2>Car Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal} 
          style={{ background: 'none', position: 'absolute', right: -5, top: -5, margin: 0, padding: 0, border: 'none' }} >
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
            <CarModalFormTemplate
              handleModalChange={handleModalChange}
              submit={submit}
              closeModal={closeModal}
              data={modalCar}
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

export default ShowCars;
