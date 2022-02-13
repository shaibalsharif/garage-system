import uniqid from 'uniqid'
const date = new Date()
export const newStock = {
    itemNo: uniqid(),
    category: "Multimedia",
    buyPrice: 0,
    sellPrice: 0,
    addDate: String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0'),
    warrenty: "No",
    warrentyEnd: "",
    sold: false
}
export const newCar={
    entryDate: String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0'),
    carRegNo:"",
    custRegNo:"",
    brand:"",
    model:"",
    numPlate:"",
    entryTime:"",
    color:"",
    engine:"",
    emergency:"",
    problem:""
}

export const newEmp={
    regNo:"",
    firstName:"",
    lastName:"",
    dob:"",
    gender:"Male",
    email:"",
    phone:"",
    joinDate:String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0'),
    emergency:"",
    address:""
}
export const testEmps=[{
    regNo: uniqid(),
    name:"Ahmed hanif",
    dob:"16-01-1997",
    gender:"Male",
    email:"hanif@hotmail.com",
    phone:'01254669854',
    joinDate:'01-01-2019',
    emergency:'0154698546',
    address:"Baridhara, Dhaka"
},{
    regNo: uniqid(),
    name:"Rakib Khan",
    dob:"01-10-2000",
    gender:"Male",
    email:"rakib@hotmail.com",
    phone:'01354648854',
    joinDate:'12-11-2020',
    emergency:'0194694546',
    address:"Gulshan, Dhaka"
},{
    regNo: uniqid(),
    name:"Shahina Ahmed",
    dob:"14-01-1995",
    gender:"Female",
    email:"sha@gmail.com",
    phone:'01557669784',
    joinDate:'21-05-2019',
    emergency:'0174797546',
    address:"Genda, Savar"
},{
    regNo: uniqid(),
    name:"Arif Mia",
    dob:"25-09-2001",
    gender:"Male",
    email:"arif@gmail.com",
    phone:'01875469256',
    joinDate:'22-01-2019',
    emergency:'0154449946',
    address:"Jhautola, Jessore"
},{
    regNo: uniqid(),
    name:"Nila Chowdhury",
    dob:"22-02-1997",
    gender:"Female",
    email:"nila.ch@yahoo.com",
    phone:'014569697712',
    joinDate:'01-01-2019',
    emergency:'01848558446',
    address:"Mirpur, Dhaka"
},]
export const testCar=[]
export const testStock = [
    {
        itemNo: uniqid(),
        category: "Multimedia",
        buyPrice: "3500",
        sellPrice: "4000",
        addDate: "2020-11-11",
        warrenty: "Yes",
        warrentyEnd: "2029-11-11"
    }, {
        itemNo: uniqid(),
        category: "Wheels",
        buyPrice: "11000",
        sellPrice: "12100",
        addDate: "2019-11-11",
        warrenty: "No",
        warrentyEnd: ""
    }, {
        itemNo: uniqid(),
        category: "AC",
        buyPrice: "6800",
        sellPrice: "7500",
        addDate: "2019-11-11",
        warrenty: "No",
        warrentyEnd: ""
    }, {
        itemNo: uniqid(),
        category: "Battery",
        buyPrice: "2800",
        sellPrice: "3150",
        addDate: "2019-11-11",
        warrenty: "No",
        warrentyEnd: ""
    }, {
        itemNo: uniqid(),
        category: "Looking Glass",
        buyPrice: "850",
        sellPrice: "1100",
        addDate: "2019-11-11",
        warrenty: "No",
        warrentyEnd: ""
    }, {
        itemNo: uniqid(),
        category: "Bumper",
        buyPrice: "1100",
        sellPrice: "1450",
        addDate: "2019-11-11",
        warrenty: "No",
        warrentyEnd: ""
    }, {
        itemNo: uniqid(),
        category: "Head Lights",
        buyPrice: "1200",
        sellPrice: "1500",
        addDate: "2019-11-11",
        warrenty: "Yes",
        warrentyEnd: "2029-11-11"
    },
]
export const newCustomer = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    email: "",
    phone: "",
    address: "",
    regNo: uniqid(),
    joinDate: String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')

}
{/*const getDate=(date)=>{
    return String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
}*/}
export const testCustomers = [
    {
        name: "Hamid Khan",
        dob: "2010-01-22",
        gender: "Male",
        email: "jkjj@gmail.com",
        phone: "00112255",
        address: "adadadadadadadadad",
        regNo: uniqid(),
        joinDate: "2022-01-01"
    }, {
        name: "Rashid Khan",

        dob: "1999-12-20",
        gender: "Female",
        email: "jk4j@gmail.com",
        phone: "0011255",
        address: "adadadadadadadadad",
        regNo: uniqid(),
        joinDate: "2021-11-09"
    }, {
        name: "Hamid Ahmed",
        dob: "2005-11-30",
        gender: "Male",
        email: "kjj@gmail.com",
        phone: "0012255",
        address: "adadadadadadadadad",
        regNo: uniqid(),
        joinDate: "2020-05-09"
    }

] 