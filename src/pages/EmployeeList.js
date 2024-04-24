import React, { useState, useEffect, useMemo } from 'react';
import { newEmp, testCustomers, testEmps } from '../assets/DataModel';
import { getLocalStorage } from '../assets/utilities';
import { getIndexed, sortFunc } from '../assets/utilities';
import actionsFormatter from './CustomerList'
import { apiURL } from '../assets/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal/lib/components/Modal';
import EmployeeModalFormTemplate from '../components/Employee/EmployeeModalFormTemplate'
import { toUnicodeVariant } from '../assets/utilities';
import Table from '../components/Table';
import Loading from '../components/Loader/Loading';


const ShowEmployees = () => {

  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getFirebaseData = async () => {
    setIsLoading(true)
    try {
      apiURL.get('/employee.json').then((res) => {
        const employeeList = []
        if (res.data) {
          Object.keys(res.data).map((key) => {
            let newObj = res.data[key]
            newObj.regNo = key
            employeeList.push(newObj)
          })
          employeeList.reverse()
          setEmployees(getIndexed(employeeList))
        }
        else {
          setEmployees([])
        }

      })
    } catch (error) {

    }
    finally {
     setTimeout(() => {
       setIsLoading(false)
     }, 750);

    }





  }

  useEffect(() => {
    getFirebaseData()
  }, [])


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
    )
  }
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

  const onDelete = (e) => {
    if (window.confirm(`Are you sure to delete Employee: ${toUnicodeVariant(modalEmployee.name, 'bold sans', 'bold')} ?`)) {
      apiURL.delete(`/employee/${modalEmployee.regNo}.json`).then(res => {

        getFirebaseData()
      })
      toast.success("Deleted Employee: " + modalEmployee.name, {
        className: "SUCCESS_TOAST",
        position: toast.POSITION.TOP_CENTER
      })
      closeModal()
    }
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
  const handleUpdate = (e) => {
    e.preventDefault()
    let tempEmp = { ...modalEmployee };
    tempEmp.name = tempEmp.firstName[0].toUpperCase() +
      tempEmp.firstName.substring(1) + " " +
      tempEmp.lastName[0].toUpperCase() +
      tempEmp.lastName.substring(1)

    apiURL.put(`/employee/${tempEmp.regNo}.json`, tempEmp).then((response) => {
      getFirebaseData()

      setIsOpen(false);
    })

    toast.success(toastMessege + tempEmp.name, {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
    })
  }
  const submit = (e) => {
    e.preventDefault()
    let tempEmp = { ...modalEmployee };
    tempEmp.name = tempEmp.firstName[0].toUpperCase() +
      tempEmp.firstName.substring(1) + " " +
      tempEmp.lastName[0].toUpperCase() + tempEmp.lastName.substring(1)

    apiURL.post('/employee.json', tempEmp).then((response) => {
      getFirebaseData()
    })

    toast.success(toastMessege + tempEmp.name, {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
    })

    e.target.reset();
    setIsOpen(false);
  }


  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    }, {
      dataField: 'name',
      text: 'Name',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'regNo',
      text: 'Reg. No.',
      sort: true,
      sortCaret: sortFunc
      ,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },

    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: 'phone',
      text: 'Contact',
      sort: true,
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
    }, {
      dataField: 'emergency',
      text: 'Emergency Contact',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    }, {
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"
          onClick={(e) => { setModalEmployee(row); setIsOpen(true) }}
        >
          Edit
        </button>
      ), button: true,
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter,
      attrs: { className: "EditRow" }
    }
  ]

  return <div>
    {isLoading ? <Loading /> :

      <div className="container-fliude" >
        <div className='d-flex justify-content-between'>
          <h2>Employee List</h2>
          <h2><button className="btn btn-sm btn-outline-primary float-right" onClick={openModal} >Add Employee</button></h2>

        </div>


        <div className='card'>
          <div className='card-body'>

            <Table data={getIndexed(employees)} column={columns} />

            {/* <BootstrapTable striped hover bordered
            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(employees)}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
          >

          </BootstrapTable> */}
          </div>
        </div>
      </div>}


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
              onDelete={onDelete}
              submit={submit}
              update={handleUpdate}
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
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">×</span>
        </button>
      </h4>
      <div>
        <button className="btn btn-outline-primary" onClick={closeModal}>Yes</button>
        <button className="btn btn-outline-danger" onClick={closeModal}>No</button>
      </div>
    </div>
  </div>
};

export default ShowEmployees;
