import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


function Verify() {
const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

const [searchParams,setSearchParams] = useSearchParams();
const success = searchParams.get("success");
const orderId = searchParams.get("orderId");

const verifyPayment = async () => {
  try {
    
    const response = await axios.post(
      backendUrl + "/api/order/verify",
      {
        success,
        orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("VERIFY RESPONSE:", response.data);
    console.log("URL:", window.location.href);
    console.log("success:", success);
    console.log("orderId:", orderId);

    if (response.data.success) {
      setCartItems({});
      navigate("/orders");
    } else {
      navigate("/cart");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error verifying payment");
    navigate("/cart");
  }
};
useEffect(() => {
  if (token && success && orderId) {
    verifyPayment();
  }
}, [token, success, orderId]);

  return (
    <div>
      
    </div>
  )
}

export default Verify
