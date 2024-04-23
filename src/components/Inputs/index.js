import React from 'react'

const Input = ({ type = "text", onChange, name, label, placeholder = "", error = true, errorText = "", textColor = "", options = [], setter }) => {


  return (
    <div>
      {type == 'text' || type == 'email' ? (
        <div className="  p-2 flex flex-col space-y-1 pt-4 w-[400px]">
          <label className='text-sm' htmlFor={name}>{label}</label>
          <input type={type} className="p-1 outline-none shadow-lg focus:bg-gradient-to-br from-[#5f5f5f81] to-[#5f5f5f25]"
            id={name} name={name} placeholder={placeholder} onChange={onChange} />
          <div className='h-5 text-red-500 text-sm '>{error ? errorText : ""}</div>
        </div>
      ) :
      type == 'number' ? (
        <div className="  p-2 flex flex-col space-y-1 pt-4 w-[400px]">
          <label className='text-sm' htmlFor={name}>{label}</label>
          <input type={type} className="p-1 outline-none shadow-lg focus:bg-gradient-to-br from-[#5f5f5f81] to-[#5f5f5f25]"
            id={name} name={name} placeholder={placeholder} onChange={onChange} />
          <div className='h-5 text-red-500 text-sm '>{error ? errorText : ""}</div>
        </div>
      ) :
        type == 'date' ? (<div className="  p-2 flex flex-col space-y-1 pt-4 w-[300px]">
          <label className='text-sm' htmlFor={name}>{label}</label>
          <input type={type} className="p-1 outline-none shadow-lg focus:bg-gradient-to-br from-[#5f5f5f81] to-[#5f5f5f25]"
            id={name} name={name} placeholder={placeholder} onChange={onChange} />
          <div className='h-5 text-red-500 text-sm '>{error ? errorText : ""}</div>
        </div>)
          :
          type == 'dropdown' ? (
            <div className="  p-2 flex flex-col space-y-1 pt-4 w-[300px]">
              <label className='text-sm' htmlFor={name}>{label}</label>
              <select type={type} className="capitalize w-full p-1 outline-none shadow-lg focus:bg-gradient-to-br from-[#5f5f5f81] to-[#5f5f5f25]"
                id={name} name={name} placeholder={placeholder} onChange={onChange} >
                {options.length ?
                  options?.map(item => <option className=' w-[300px]' value={item}>{item}</option>) : <></>}
              </select>


              <div className='h-5 text-red-500 text-sm '>{error ? errorText : ""}</div>
            </div>
          ) 
          :
          type == 'textarea' ? (<div className="  p-2 flex flex-col space-y-1 pt-4 w-[400px]">
            <label className='text-sm' htmlFor={name}>{label}</label>

            <textarea className="p-1 outline-none shadow-lg focus:bg-gradient-to-br from-[#5f5f5f81] to-[#5f5f5f25]"
              id={name} name={name} placeholder={placeholder} onChange={onChange} ></textarea>
            <div className='h-5 text-red-500 text-sm '>{error ? errorText : ""}</div>
          </div>):
            <></>
      }


    </div >
  )
}

export default Input