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

const ShowCars = () => {

  const [options, setOptions] = useState([])
  const [nameList, setNameList] = useState([])
  const getFirebaseCustomer = async () => {

    apiURL.get('/customer.json').then((res) => {
      const customerNameList = []
      const option = []

      if (res.data) {
        Object.keys(res.data).map((key) => {
          let newObj = res.data[key]
          option.push(key)
          customerNameList.push(newObj.name)
        })
        option.reverse()
        customerNameList.reverse()


        setOptions(option)

        setNameList(customerNameList)
      }
      else {
        setOptions([])
        setNameList([])
      }
    })
  }


  const getFirebaseData = async () => {
    setIsLoading(true)
    try {
      apiURL.get('/car.json').then((res) => {
        const cars = []
        if (res.data) {
          Object.keys(res.data).map((key) => {
            let newObj = res.data[key]
            newObj.carRegNo = key
            cars.push(newObj)
          })
          cars.reverse()
          setCar(getIndexed(cars))
        }
        else {
          setCar([])
        }

      })
    } catch (error) {

    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 750);
    }

  }

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
    if (window.confirm(`Are you sure to delete Car: ${toUnicodeVariant(modalCar.model, 'bold sans', 'bold')} ?`)) {
      apiURL.delete(`/car/${modalCar.carRegNo}.json`).then(res => {
        getFirebaseData()
        toast.success("Deleted Car: " + modalCar.model, {
          className: "SUCCESS_TOAST",
          position: toast.POSITION.TOP_CENTER
        })
        closeModal()
      })

    }
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
    let tempCar = { ...modalCar };

    apiURL.put(`/car/${tempCar.carRegNo}.json`, tempCar).then((response) => {
      getFirebaseData()

      setIsOpen(false);
    })

    toast.success(toastMessege + tempCar.model + "[" + tempCar.carRegNo + "]", {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
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
        getFirebaseData()
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
  useEffect(() => {
    getFirebaseData()
    getFirebaseCustomer()

  }, [])

  const getVlaue = (cars) => {
    const inStateCars = []

    cars.map((c) => {
      if (!c.statusOut) {
        inStateCars.push(c)
      }
    })
    return inStateCars

  }

  const columns = [
    {
      dataField: 'id',
      text: "Index",
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    },
    {
      dataField: 'carRegNo',
      text: 'Car Reg. No.',
      sort: true,
      sortCaret: sortFunc
      ,
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: 'custRegNo',
      text: 'Customer Reg. No.',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'custName',
      text: 'Customer Name',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'brand',
      text: 'Car Brand',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'model',
      text: 'Car Model',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'numPlate',
      text: 'Car Number Plate',
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'color',
      text: 'Car Color', sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'engine',
      text: 'Car Engine No.',
      sort: true,
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
      sort: true,
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'problem',
      text: 'Initial Problem',
      headerClasses: 'bg-dark text-light'
    }, {
      cell: (row) => (
        <button
          className="btn btn-outline btn-xs"
          onClick={(e) => { setModalCar(row); setIsOpen(true) }}
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

  {/*  <button className="btn btn-sm btn-outline-primary btn-block" onClick="initEdit(content,cus)">
                      <i className="fa fa-pencil-square-o" />
                    </button>
                    <button className="btn btn-sm btn-outline-danger btn-block" onClick="initArchive(delete,cus)">
                      <i className="fa fa-trash" />
                    </button> */ }
  return <div>
    {isLoading ? <Loading /> : <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Car list</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right"
          onClick={openModal} >Add Car</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <Table data={car} column={columns} handleAction={rowEvents.onClick} paginate />
          {/*  <BootstrapTable striped hover bordered
            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getVlaue(car)}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
            className='testCont'
          >

          </BootstrapTable> */}
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
              onDelete={onDelete}
              options={options}
              nameList={nameList}
              update={handleUpdate}
              submit={submit}
              closeModal={closeModal}
              data={modalCar}
              buttonValue={buttonValue}
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
};

export default ShowCars;
