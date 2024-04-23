import React from 'react'
import "./loading.css"
const Loading = () => {

  /* HTML: <div class="loader"></div> */

  return (
    <div className=" flex justify-center items-center">
      <div>
        <div className="loader">

        </div>
        <p className='text-[#e4cd49] font-semibold text-xl py-8'>Loading</p>
      </div>

    </div>
  )
}

export default Loading