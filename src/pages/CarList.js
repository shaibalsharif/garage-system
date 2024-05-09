import React, { useState, useEffect, useMemo } from 'react';
import { newCar } from '../assets/DataModel';
import { toUnicodeVariant } from '../assets/utilities';

import { getIndexed, sortFunc } from '../assets/utilities';

import Modal from 'react-modal/lib/components/Modal';
import CarModalFormTemplate from '../components/Cars/CarModalFormTemplate';
import { apiURL } from '../assets/api';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import Loading from '../components/Loader/Loading';
import axios from 'axios';
import { showToast } from '../components/toast';
import CarSearchPanel from '../components/Cars/CarSearchPanel';

const ShowCars = () => {

  const [options, setOptions] = useState([])
  const [nameList, setNameList] = useState([])
  const [confirm_modal, set_confirm_modal] = useState(false)
  const [error, setError] = useState(null)
  const [error_message, set_error_message] = useState("")

  const onEditClick = (e, row) => {
    setToastMessege('Updated Car: ')
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

  const [model, setModel] = useState("")
  const [brand, setBrand] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [plate, setPlate] = useState("")
  const [carId, setCarId] = useState("")
  const [status, setStatus] = useState("")



  const [buttonValue, setButtonValue] = useState('Submit')
  const [modalCar, setModalCar] = useState(newCar)
  const [toastMessege, setToastMessege] = useState("Added Car: ")
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  const onDelete = (e) => {
    set_confirm_modal(true)
  }
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

  const handleUpdate = (e) => {
    e.preventDefault()
    e.stopPropagation()
    set_error_message("")
    setError(null)
    setIsLoading(true)
    const errors = Object.entries(modalCar).filter(car_prop => {
      if (!car_prop[1] || car_prop[1] == "") {

        return car_prop[0]
      }
    })

    if (errors.length) {

      setError(errors[0][0])
      set_error_message("")
      setTimeout(() => {
        setIsLoading(false)
      }, 250);

      return
    }
    axios.put(`${base_url}/api/cars/${modalCar.id}`, modalCar)
      .then(res => {
        showToast({ message: 'Updated Car Data' })
        setTimeout(() => {
          setIsLoading(false)
        }, 250);
        setIsOpen(false)
      })
      .catch(e => {

        set_error_message(e.response?.data);
        showToast({ message: e.response?.data || "Error!", type: 'danger' })
        setTimeout(() => {
          setIsLoading(false)
        }, 250);

      })
      .finally(() => {
        setIsLoading(false)
      })

    // apiURL.put(`/car/${tempCar.carRegNo}.json`, tempCar).then((response) => {
    //   // getFirebaseData()

    //   setIsOpen(false);
    // })

    // toast.success(toastMessege + tempCar.model + "[" + tempCar.carRegNo + "]", {
    //   className: "SUCCESS_TOAST",
    //   position: toast.POSITION.TOP_CENTER
    // })
  }
  const handleDelete = (e) => {
    axios.delete(`${base_url}/api/cars/${modalCar.id}`)
      .then(res => {
        set_confirm_modal(false)
        setIsOpen(false)
        showToast({ message: "Car Removed", type: 'warning' })
        getCarList()
      })
      .catch((e) => {
        console.log(e);
      })
  }


  const submit = (e) => {
    e.preventDefault()

    let tempCar = { ...modalCar };
    if (tempCar.brand.trim() != "" &&
      tempCar.model.trim() != "" && tempCar.numPlate.trim() != "" &&
      tempCar.engine.trim() != "" && tempCar.emergency.trim() != "") {
      tempCar.custName = nameList[options.indexOf(tempCar.custRegNo)]
      apiURL.post('/car.json', tempCar).then((response) => {
        // getFirebaseData()
      })

      toast.success(toastMessege + tempCar.model, {
        className: "SUCCESS_TOAST",
        position: toast.POSITION.TOP_CENTER
      })

      e.target.reset();
      setIsOpen(false);
    } else {

      toast.error("Enter All Required Info ", {
        className: "ERROR_TOAST",
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const [car, setCar] = useState([])
  const base_url = process.env.REACT_APP_BACKEND_API
  const getCarList = (e) => {
    setIsLoading(true)
    axios.get(`${base_url}/api/cars`, {
      params: {
        customer_id: customerId,
        brand: brand,
        model: model,
        plate: plate,
        id: carId,
        status: status
      }
    })
      .then(res => {
        setCar(res.data)
        setIsLoading(false)
      })
      .catch(e => {
        console.log(e?.response?.statusText);
        setIsLoading(false)
      })
  }


  useEffect(() => {
    getCarList()
  }, [model,brand,customerId,plate])



  const columns = [
    {
      dataField: 'id',
      text: "Car ID",
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },
    {
      dataField: 'customer',
      text: 'Customer',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'brand',
      text: 'Brand',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'model',
      text: 'Model',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'plate',
      text: 'Number Plate',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'color',
      cell: (row) => {

        return (
          <div
            style={{ backgroundColor: row?.color }}
            className={`w-[80%] mx-auto h-4 border-[1px]`} >

          </div>
        )
      },
      text: 'Color', sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'engine',
      text: 'Engine No.',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'entry_date',
      text: 'Entry Date',

      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'emergency',
      text: 'Emergency Contact',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'initial_problem',
      text: 'Initial Problem',
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: 'status',
      text: 'Status',
      headerClasses: 'bg-dark text-light'
    }, {
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"
          onClick={(e) => {
            onEditClick(e, row);
            setModalCar(row); setIsOpen(true)
          }}
        >
          Edit
        </button>
      ),
      button: true,
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter,
      attrs: { className: "EditRow" }
    }
  ]

  return <div>
    {isLoading ? <Loading /> : <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Car List</h2>
        <div className='flex justify-between w-full items-center'>
          <CarSearchPanel model={model} setModel={setModel}
            brand={brand} setBrand={setBrand}
            carId={carId} setCarId={setCarId}
            customerId={customerId} setCustomerId={setCustomerId}
            plate={plate} setPlate={setPlate}
            status={status} setStatus={setStatus} />
          <button className="btn btn-sm btn-outline-primary float-right
          inline-block align-middle text-center select-none border font-normal mt-2
           whitespace-no-wrap rounded py-1 px-3 no-underline   leading-tight
            text-xs  text-blue-600 border-blue-600  hover:text-white bg-white
             hover:bg-blue-600 lg:w-[10%]"
            onClick={openModal} >Add Car</button></div>

      </div>


      <div className='card'>
        <div className='card-body'>
          <Table data={car} column={columns} handleAction={rowEvents.onClick} paginate />
        </div>
      </div>
    </div>}

    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      appElement={document.getElementById('app')}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >

      <div className="modal-body">
        <h2 className="font-semibold text-2xl text-center pb-4 tracking-widest font-mono">Car Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal}
            style={{ background: 'none', position: 'absolute', right: -5, top: -5, margin: 0, padding: 0, border: 'none' }} >
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
            <CarModalFormTemplate
              handleModalChange={handleModalChange}
              setModalCar={setModalCar}
              onDelete={onDelete}
              submit={submit}
              options={options}
              nameList={nameList}
              update={handleUpdate}
              closeModal={closeModal}
              data={modalCar}
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
        <h4>Are you sure to remove Car?</h4>
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

export default ShowCars;
