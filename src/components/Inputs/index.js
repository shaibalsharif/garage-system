import React from 'react'

const Input = ({ type = "text", onChange, name, label, placeholder = "", value,
  error, errorText = "", textColor = "", options = [], optionDisplayValue = [], selected, disabled = false, setter,
  labelStyle = "vertical",
}) => {


  return (
    <div className=''>
      {type == 'text' || type == 'email' ? (
        <div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" :
          "flex flex-col"}  mx-auto xl:!w-[400px]`}>
          <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
          <input value={value} disabled={disabled} type={type} className={`${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} p-1 outline-none  border-[1px] focus:border-[#000] px-2 focus:shadow-lg`}
            id={name} name={name} placeholder={placeholder} onChange={onChange} />
          {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
        </div>
      ) :
        type == 'number' ? (
          <div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : "flex flex-col"}  mx-auto xl:!w-[400px]`}>
            <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>

            <input value={value} disabled={disabled} type={type} className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
              id={name} name={name} placeholder={placeholder} onChange={onChange} />
            {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
          </div>
        ) :
          type == 'date' ? (<div className="  p-2 flex flex-col  mx-auto xl:!w-[400px] ">
            <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
            <input value={value} disabled={disabled} type={type} 
            className={`w-full p-1 outline-none ${error && name == error ? 
              'border-[1px] border-red-500 ' : 
              "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
              id={name} name={name} placeholder={placeholder} onChange={onChange} />
            {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
          </div>)
            :
            type == 'dropdown' ? (
              <div className={` p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : " flex flex-col"}  mx-auto xl:!w-[400px] `}>
                <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
                <select disabled={disabled} type={type} 
                className={` capitalize w-full p-1 outline-none ${error && name == error ?
                   'border-[1px] border-red-500 ' :
                    "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
                  id={name} name={name} placeholder={placeholder} onChange={onChange} >

                  <option disabled selected>select {label}</option>


                  {options.length ?
                    options?.map((item, index) => <option key={`${item}${index}`} className=' w-[400px]' selected={value ? value : false}
                      value={item}>{optionDisplayValue.length ? optionDisplayValue[index] : item}</option>) : <></>}
                </select>


                {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
              </div>
            )
              :
              type == 'textarea' ? (<div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : "flex flex-col"}  mx-auto xl:!w-[400px]`}>
                <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
                <textarea disabled={disabled} className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
                  id={name} name={name} placeholder={placeholder} onChange={onChange} ></textarea>
                {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
              </div>) :
                <></>
      }


    </div >
  )
}

export default Input