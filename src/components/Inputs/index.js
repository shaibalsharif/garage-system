import React from 'react'

const Input = ({ type = "text", onChange, name, label, placeholder = "", value,
  error, errorText = "", textColor = "", options = [], optionDisplayValue = [], selected, disabled = false, setter,
  labelStyle = "vertical", fullwidth, defaultValue,
}) => {


  return (
    <div className={`${fullwidth ? ' ' : ""}`}>
      {type == 'text' || type == 'email' ? (
        <div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" :
          "flex flex-col"}  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
          <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
          <input value={value} disabled={disabled} type={type} className={`${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} p-1 outline-none  border-[1px] focus:border-[#000] px-2 focus:shadow-lg`}
            id={name} name={name} placeholder={placeholder} onChange={onChange} />
          {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
        </div>
      ) :
        type == 'number' ? (
          <div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : "flex flex-col"}  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
            <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>

            <input value={value} disabled={disabled} type={type} className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
              id={name} name={name} placeholder={placeholder} onChange={onChange} />
            {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
          </div>
        ) :
          type == 'date' ? (<div className={`  p-2 flex flex-col  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"} `}>
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
              <div className={` p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : " flex flex-col"}  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"} `}>
                <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
                <select disabled={disabled} type={type}
                  className={` capitalize w-full p-1 outline-none ${error && name == error ?
                    'border-[1px] border-red-500 ' :
                    "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
                  id={name} name={name} placeholder={placeholder} onChange={onChange}  >

                  <option disabled selected>select {label}</option>


                  {options.length ?
                    options?.map((item, index) => <option key={`${item}${index}`}
                      className=' w-[400px]' selected={value ? value == item : false}
                      value={item}>{optionDisplayValue.length ? optionDisplayValue[index] : item}</option>) : <></>}
                </select>
                {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
              </div>
            )
              :
              type == 'textarea' ? (<div className={`p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" : "flex flex-col"}  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
                <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
                <textarea disabled={disabled} className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
                  id={name} name={name} placeholder={placeholder} onChange={onChange} ></textarea>
                {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
              </div>) :
                type == 'checkbox' ? (<div className={`p-2 flex gap-2 mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
                  <input defaultChecked={defaultValue} type={'checkbox'} disabled={disabled} className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "} focus:border-[#000] px-2 focus:shadow-lg`}
                    id={name} name={name} placeholder={placeholder} onChange={onChange} />
                  <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>

                  {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
                </div>) :
                  type == 'search' ? (
                    <div className={` rounded-md relative p-2  ${labelStyle == 'horizontal' ? "grid grid-cols-2 place-items-center gap-x-4" :
                      "flex flex-col"}  mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
                      <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>
                      <input value={value} disabled={disabled} type={type} className={`rounded-md ${error && name == error ? ' border-[1px] border-red-500 ' : "border-[1px] "} p-1 outline-none  border-[1px] focus:border-[#000] px-2 focus:shadow-lg`}
                        id={name} name={name} placeholder={placeholder} onChange={onChange} />
                      <button className='hover:border-2 active:scale-95 absolute right-[9px] top-[42%]  bg-gray-400 px-2 rounded-r-md  '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-[32px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      </button>
                      {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
                    </div>
                  ) :
                    type == 'file' ? (<div className={`p-2 flex gap-2 mx-auto ${fullwidth ? 'w-full' : "xl:!w-[400px]"}`}>
                      <input defaultChecked={defaultValue} type={'file'} disabled={disabled}
                        className={` p-1 outline-none ${error && name == error ? 'border-[1px] border-red-500 ' : "border-[1px] "}
                     focus:border-[#000] px-2 focus:shadow-lg`}
                        id={name} name={name} placeholder={placeholder} onChange={onChange} />
                      <label className='text-sm' htmlFor={name}><strong>{label}</strong></label>

                      {/* <div className='h-3 lg:h-5 text-red-500 text-xs lg:text-sm '>{error ? errorText : ""}</div> */}
                    </div>) :
                      <></>
      }


    </div >
  )
}

export default Input