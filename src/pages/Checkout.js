import React, { useContext, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import  Checkoutform  from '../components/Cars/CheckoutForm';

const Checkout=()=>{
  const componentRef = useRef();
  return(
    <div>
    <Checkoutform ref={componentRef} />
    <ReactToPrint 
    trigger={() =>{  return(<button type="button"  style={{position:'absolute', right:'20px'}} className=" btn btn-outline-primary mt-2 px-4" >PRINT</button>)}}
    content={() => componentRef.current}>
    </ReactToPrint>
    </div>
  )
}
export default Checkout
