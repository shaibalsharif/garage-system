import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify'


export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data)
  }
  else {
    return null
  }
}

export const getIndexed = (params) => {
  if (params.length>0) {
    params.map((param, index) => {
      param.id = index + 1
    })
  }

  return params
}

export const sortFunc = (order, column) => {
  if (!order) return (<span>&nbsp;&nbsp;</span>);
  else if (order === 'asc') return (<span>&nbsp;&nbsp;▲</span>);
  else if (order === 'desc') return (<span>&nbsp;&nbsp;▼</span>);
  return null;
}  