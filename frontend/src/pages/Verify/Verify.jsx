import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';
const Verify = () => {
    const [serachParams,setSearchParams] = useSearchParams();
    const success = serachParams.get("success");
    const OrderId = serachParams.get("orderId")
    const {url} =useContext(Storecontext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify",{success,OrderId});
        if(response.data.success){
         navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }
    useEffect(()=>{
verifyPayment();
    },[])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
