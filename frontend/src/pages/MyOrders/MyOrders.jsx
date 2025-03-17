import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import {Storecontext} from "../../context/Storecontext"
import axios from 'axios';
import {assets} from '../../assets/assets'

const MyOrders = () => {

const {url,token} = useContext(Storecontext);
    const[data,setData] = useState([]);

    const fetchOrders = async()=>{
        const response = await axios.post(url+"/api/order/usersorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }
    useEffect(()=>{
       if(token){
        fetchOrders();
       }
    },[token])
    
  return (
    <div className='myorders'>
      <h2>My Orders</h2>
      <div className="container">
        {
            data.map((order,index)=>{
           return(
            <div key={index} className="my-orders-order">
                   <img src={assets.parcel_icon} alt="" />
                   <p>{order.items.map((item,index)=>{
                         if(index===order.items.length-1){
                            return item.name+" X " +item.quantity;
                         }  
                         else{
                            return item.name+" X " +item.quantity+","
                         }
                   })}</p>
                   <p>${order.amount}</p>
                   <p>items:{order.items.length}</p>
                   <p><span>&#x25cf;</span><b>{order.status}</b></p>
                   <button onClick={fetchOrders}>Track Orders</button>
            </div>
           )
            })
        }
      </div>
    </div>
  )
}

export default MyOrders
