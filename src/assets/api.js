import axios from "axios";
export const apiURL= axios.create(
    {
        baseURL: 'https://garage-dashboard-6c29b-default-rtdb.asia-southeast1.firebasedatabase.app/'
    }
)