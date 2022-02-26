import axios from "axios";


export const apiURL= axios.create(
    {
        baseURL: 'https://garage-dashboard-6c29b-default-rtdb.asia-southeast1.firebasedatabase.app/'
    }
)
export const  getJSONData=(dir)=>{


    async function getD() {
        let data = await apiURL.get(dir)
        return data
      }
      return getD( )

}