import React, { useState, useEffect, useMemo } from 'react';
import { newStock, testCustomers } from '../../assets/DataModel';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { sortFunc, getIndexed } from '../../assets/utilities';
import { testStock } from '../../assets/DataModel'
import { toast } from 'react-toastify';
import Modal from 'react-modal/lib/components/Modal';
import StockModalFormTemplate from './StockModalFormTemplate'
import { apiURL } from '../../assets/api';

export const initStocks = () => {
  let x = localStorage.getItem('stocks');
  if (x) {
    return JSON.parse(x)
  }
  else {
    localStorage.setItem('stocks', JSON.stringify(testStock))
    return testStock
  }
}
const ShowStocks = () => {
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
    setToastMessege('Updated Stock:')
    setButtonValue('Update')
    setIsOpen(true)
  }
  const [buttonValue, setButtonValue] = useState('Submit')
  const [modalStock, setModalStock] = useState(newStock)
  const [toastMessege, setToastMessege] = useState("Added Stock: ")
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setToastMessege("Added Stock: ")
    setModalStock(newStock)
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

      setModalStock(row);
    }
  }
  const handleModalChange = (e) => {
    setModalCustomer({
      ...(modalCustomer),
      [e.target.name]: e.target.value

    });
  };
  const submit = (e) => {
    e.preventDefault()

    let tempStock = { ...modalStock };

    apiURL.post('/stock.json', tempStock).then((response) => {
      
    })

    toast.success(toastMessege + tempStock.category, {
      className: "SUCCESS_TOAST",
      position: toast.POSITION.TOP_CENTER
    })

    e.target.reset();
    setIsOpen(false);

  }

  const [stock, setStock] = useState(initStocks())
  const getValued = (stock) => {
    let availStock = []
    stock.map((st) => {


      if (!st.sold) {
        st.buyPrice = parseFloat(st.buyPrice)
        st.sellPrice = parseFloat(st.sellPrice)
        availStock.push(st)
      }
    })
    return availStock
  }
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(initStocks()))
  }, [stock])
  const data = stock
  const columns = [
    {
      dataField: 'id',
      text: "SL. No.",
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',
      style: { fontWeight: '800', textAlign: 'center', fontSize: '1rem' }

    }, {
      dataField: 'itemNo',
      text: "Item No.",
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light',


    },
    {
      dataField: 'category',
      text: 'Category',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'buyPrice',
      text: 'Buying Price',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'sellPrice',
      text: 'Selling Price',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'addDate',
      text: 'Adding Date',
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'warrenty',
      text: 'Warrenty',
      sort: 'true',
      sortCaret: sortFunc,
      headerClasses: 'bg-dark text-light'
    },
    {
      dataField: 'warrentyEnd',
      text: 'Warrenty End',
      headerClasses: 'bg-dark text-light'
    }, {
      dataField: "edit",
      text: "Edit",
      sort: false,
      formatter: actionsFormatter, headerClasses: 'bg-dark text-light',
      attrs: { class: "EditRow " }
    }
  ]



  return <div>
    <div className="container-fliude" >
      <div className='d-flex justify-content-between'>
        <h2>Stock List</h2>
        <h2><button className="btn btn-sm btn-outline-primary float-right" onClick={openModal} >Add Stock</button></h2>

      </div>


      <div className='card'>
        <div className='card-body'>
          <BootstrapTable striped hover bordered
            headerClasses='bg-dark text-light position-sticky'
            keyField='id'
            data={getIndexed(getValued(stock))}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
          >

          </BootstrapTable>
        </div>
      </div>
    </div>

    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      appElement={document.getElementById('app')}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-body" >
        <h2>Stock Form
          <button type="button" className="close" aria-label="Close" onClick={closeModal} style={{ background: 'none', position: 'absolute', right: -5, top: -5, margin: 0, padding: 0, border: 'none' }}>
            <span aria-hidden="true">×</span>
          </button>
        </h2>
        <div className="card">
          <div className="card-body">
            <StockModalFormTemplate
              handleModalChange={handleModalChange}
              submit={submit}
              closeModal={closeModal}
              data={modalStock}
              buttonValue={buttonValue}
            />
          </div>
        </div>
      </div>


    </Modal>




  </div>;
};

export default ShowStocks;
