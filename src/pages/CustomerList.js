import React, { useState, useEffect } from 'react';


import { sortFunc } from '../assets/utilities.js';
import Modal from 'react-modal/lib/components/Modal';
import '../components/Customers/showCustomer.css'
import { newCustomer } from "../assets/DataModel.js";
import ModalFormTemplate from '../components/Customers/ModalFormTemplate.js';
import Table from '../components/Table.js'
import Loading from '../components/Loader/Loading.js';
import axios from 'axios';
import { showToast } from '../components/toast.js';


const ShowCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState(null)
  const [error_message, set_error_message] = useState("")
  const [confirm_modal, set_confirm_modal] = useState(false)
  const base_url = process.env.REACT_APP_BACKEND_API


  useEffect(async () => {

    await getCustomerList()

  }, [])

  const getCustomerList = async () => {
    setIsLoading(true)

    axios.get(`${base_url}/api/customers`)
      .then(res => {
        res.data.map(el => {
          const address = el?.address?.Primary || el?.address?.Secondary


          return {
            ...el, name: `${el?.first_name}  ${el?.last_name}`,
            address: `${address?.house_no},${address?.road_no},${address?.city},${address?.postal_code},${address?.country} `, gender: el?.sex
          }
        })
        setCustomers(res.data.map(el => {
          const address = el?.address?.Primary || el?.address?.Secondary

          return {
            ...el, name: `${el?.first_name}  ${el?.last_name}`,
            address: `${address?.house_no},${address?.road_no},${address?.city},${address?.postal_code},${address?.country} `, gender: el?.sex
          }
        }))
      })
      .catch(e => {
        console.log(e.message);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 250);

      })


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
  const onEditClick = (e, row) => {

    setToastMessege('Updated Cutomer:')
    setButtonValue('Update')
    setIsOpen(true)
  }
  const [buttonValue, setButtonValue] = useState('Submit')
  const [modalCustomer, setModalCustomer] = useState(newCustomer)
  const [toastMessege, setToastMessege] = useState("Added Customer: ")
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const openModal = () => {
    setError(null)
    setModalCustomer(newCustomer)
    setButtonValue('Submit')
    setIsOpen(true)
  }
  const onDelete = (e) => {
    set_confirm_modal(true)


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
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row)
      setModalCustomer(row);
      setIsOpen(true)

    }
  }
  const resetForm = () => {
    setError(null)
    setModalCustomer(newCustomer)

  }
  const handleModalChange = (e) => {
    setModalCustomer({
      ...(modalCustomer),
      [e.target.name]: e.target.value

    });
  };
  const submit = (e) => {

    e.stopPropagation()
    e.preventDefault();

    /* RESET & SET ERROR */
    set_error_message("")
    setError(null)
    const errors = Object.entries(modalCustomer).filter(customer_prop => {
      if (!customer_prop[1] || customer_prop[1] == "") {

        return customer_prop[0]
      }
    })

    if (errors.length) {

      setError(errors[0][0])
      setTimeout(() => {
        setIsLoading(false)
      }, 250);

      return
    }

    /* RESET & SET ERROR */


    setIsLoading(true)
    axios.post(`${base_url}/api/customers/add`, modalCustomer)
      .then(res => {
        console.log(res.data);
        showToast({ message: "Cusomer Added successfully" })

        resetForm()
        setTimeout(() => {
          setIsLoading(false)
        }, 250);
      })

      .catch(e => {
        console.log(e);
        showToast({ message: e.request.response, type: 'error' })
        set_error_message(e.request.response);
        setTimeout(() => {
          setIsLoading(false)
        }, 250);
      })
      .finally(() => {

      })

  }
  const handleUpdate = (e) => {
    e.stopPropagation()
    e.preventDefault();

    /* RESET & SET ERROR */
    set_error_message("")
    setError(null)
    const errors = Object.entries(modalCustomer).filter(customer_prop => {
      if (!customer_prop[1] || customer_prop[1] == "") {

        return customer_prop[0]
      }
    })

    if (errors.length) {

      setError(errors[0][0])
      setTimeout(() => {
        setIsLoading(false)
      }, 250);

      return
    }

    /* RESET & SET ERROR */
    setIsLoading(true)
    axios.put(`${base_url}/api/customers/${modalCustomer.id}`, modalCustomer)
      .then(res => {

        showToast({ message: 'Updated Customer Data' })
        setTimeout(() => {
          setIsLoading(false)
        }, 250);
  
        setIsOpen(false)

      })
      .catch(e => {
        set_error_message(e.response?.data);
        showToast({ message: e.response?.data|| "Error!" ,type:'danger'})
        setTimeout(() => {
          setIsLoading(false)
        }, 250);
      })
  }
  const handleDelete = () => {

    axios.delete(`${base_url}/api/customers/${modalCustomer.id}`)
      .then(res => {
        set_confirm_modal(false)
        setIsOpen(false)
        showToast({ message: "Customer Removed", type: 'warning' })
        getCustomerList()
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: true,
      sortCaret: sortFunc,
      maxWidth: '20px',
      sortable: true

      /*    style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' } ,*/
      /*  wrap: true, width: "4rem", backgroundColor: 'blue', headerStyle: (selector, id) => {
         return { backgroundColor: "blue" };   // removed partial line here
       }, */

    },

    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      sortCaret: sortFunc
    },
    {
      dataField: 'dob',
      text: 'Date of birth'

    },
    {
      dataField: 'gender',
      text: 'Gender',
      sort: true,
      sortCaret: sortFunc
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortFunc
    },
    {
      dataField: 'address',
      text: 'Address'
    },
    {
      dataField: 'phone',
      text: 'Contact',
      sort: true,
      sortCaret: sortFunc
    },
    {
      dataField: 'added_date',
      text: 'Date Joined'
    }, {
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"
          onClick={(e) => {

            onEditClick(e, row);
            setModalCustomer(row);
            setIsOpen(true)
          }}
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
    {(isLoading && !modalIsOpen) ? <Loading /> :
      <div className="container-fliude! mb-2" >
        <div className='d-flex justify-content-between'>
          <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Customer List</h2>
          <h2 className='mb-2'><button className="btn btn-sm btn-outline-primary float-right
          inline-block align-middle text-center select-none border font-normal
           whitespace-no-wrap rounded py-1 px-3 no-underline   leading-tight
            text-xs  text-blue-600 border-blue-600  hover:text-white bg-white
             hover:bg-blue-600 " onClick={openModal} >Add Customer</button></h2>
        </div>


        <div className='card mt-12'>
          <div className='card-body'>

            <Table data={customers.reverse()} column={columns} handleAction={rowEvents.onClick} paginate />
            {/*  <BootstrapTable striped hover bordered

            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={customers}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
            className='testCont'
          >

          </BootstrapTable> */}

          </div>

        </div>
      </div>
    }



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
        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Customer Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal}
            style={{ background: 'none', position: 'absolute', right: 5, top: -5, margin: 0, padding: 0, border: 'none' }}>
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
            <ModalFormTemplate
              handleModalChange={handleModalChange}
              setModalCustomer={setModalCustomer}
              onDelete={onDelete}
              submit={submit}
              update={handleUpdate}
              closeModal={closeModal}
              data={modalCustomer}
              buttonValue={buttonValue}
              isloading={isLoading}
              error={error}
              error_message={error_message}
            />
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      isOpen={confirm_modal}
      appElement={document.getElementById('app')}
      onRequestClose={(e) => { e.preventDefault(); e.stopPropagation(); set_confirm_modal(false) }}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >

      <div className="modal-body text-center" >
        <h4>Are you sure to remove customer?</h4>
        <button type="button" className=" absolute top-0 right-2" aria-label="Close"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); set_confirm_modal(false) }}>
          <span aria-hidden="true">×</span>
        </button>

        <div className='flex justify-center gap-4'>
          <button className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 
          px-3 leading-normal no-underline text-blue-600 border-blue-600  hover:text-white bg-white hover:bg-blue-600`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); set_confirm_modal(false); handleDelete() }}>Yes</button>
          <button className={`inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1
           px-3 leading-normal no-underline text-red-600 border-red-600 hover:bg-red-600 hover:text-white bg-white `}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); set_confirm_modal(false) }}>No</button>
        </div>
      </div>
    </Modal>
  </div>
};

export default ShowCustomers;
