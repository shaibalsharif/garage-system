import React ,{useState, useEffect}from 'react';
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap'


const fakeData = [{
  id: "11", firstName: "shaibal", lastName: "sharif",
  city: "dhaka", street: "new st", companyName: "nothing",
  email: "shao@gmail.com"
}, {
  id: "11", firstName: "shaibal", lastName: "sharif",
  city: "dhaka", street: "new st", companyName: "nothing",
  email: "shao@gmail.com"
}, {
  id: "11", firstName: "shaibal", lastName: "sharif",
  city: "dhaka", street: "new st", companyName: "nothing",
  email: "shao@gmail.com"
}]
const Test = () => {
  const [itemList, setItemList]=useState([]);
  const [players, setPlayers]=useState([]);
  const [loading,setLoading] =useState([false]);
  const getItemData = async () =>{
    try {
      const data= await axios.get(
        "https://nba-players.herokuapp.com/players-stats");
      //console.log(data);
      setPlayers(data.data)
      
    } catch (e) {
      //console.log(e);
    }
  }

  const columns =[
    {dataField:'name',text: "Player Name" },
    {dataField:'points_per_game',text: "Points_per_game ▼" ,sort:'true'},
    {dataField:'team_name',text: "Player Team" }
  ]

  useEffect(()=>{
    getItemData()
  },[])
  return <BootstrapTable className='table table-striped table-hover table-bordered'
    keyField='name'
    data={players}
    columns={columns}
    pagination={paginationFactory()}

    />
  
    

};

export default Test
