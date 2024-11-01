import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [auth , setauth] = useAuth();
  const [cart , setcart] = useCart();
  const [totalprice , settotalprice] = useState(0);
  const [clientToken , setclientToken] = useState("");
  const [instance , setinstance] = useState("");
  const [loading , setloading] = useState(false);
  
  const navigate = useNavigate();
  // console.log(clientToken);

  // total price
  const totalPrice = () => {
    try {
      const total = cart.reduce((sum, product) => sum + product.price, 0);
      const formattedTotal = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      settotalprice(formattedTotal);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }


  // remove item from the cart
  const removeCartItem = (id)=> {
    try {
      let mycart = [...cart];
      const index = mycart.findIndex(item=> item._id === id);
      mycart.splice(index , 1);
      setcart(mycart);
      localStorage.setItem("cart" , JSON.stringify(mycart));
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  // || get client token for payment
  const getToken = async()=> {
    try {
      let response = await fetch("http://localhost:8080/api/v1/product/braintree/token");
      console.log(response);
      if (response.ok){
        response = await response.json();
        if (response.success){
          setclientToken(response.clientToken);
        }
      }
      else {
        console.log("Error in fetching token");
        toast.error("Error in fetching token");
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  // || handlePayment
  const handlePayment = async()=> {
    try {
      const nonce = await instance.requestPaymentMethod();
      setloading(true);
      let response = await fetch("http://localhost:8080/api/v1/product/payment" , {
        method : "POST" ,
        header : {
          "Content-Type" : "application/json" ,
          "Authorization" : auth?.token
        } ,
        body : JSON.stringify({nonce , cart})
      })
      setloading(false);
      localStorage.removeItem("cart");
      setcart([]);
      navigate("/dashboard/user/order");
      toast.success("payment successfuly completed");
    } catch (err) {
      console.log(err);
      toast.error(err);
      setloading(false);
    }
  }

  useEffect(()=> {
    totalPrice();
  } , [totalprice]);
  useEffect(()=> {
    getToken();
  } , [auth?.token]);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className='text-center bg-light p-2 mb-1'>Hello {auth?.user?.name}</h1>
          <p className='text-center'>You have selected {cart?.length} items 👀 {!(auth?.user?.name)?<button className='btn btn-danger' onClick={()=> navigate("/login")}>Login</button>: null}</p>
        </div>
      </div>
      <div className="row">
        <div className='col-md-6 m-3'>
          {
            cart?.map((product)=> (
              <div className="row card m-3">
                <div className="col-md-7 m-2 d-flex">
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt="" width="50px" height="200px" />
                  <div className="info m-3">
                    <p>{product.name}</p>
                    <p>{product.description.substring(0, 30)}</p>
                    <b>Price : ${product.price}</b>
                    <button className='btn btn-danger' onClick={()=> removeCartItem()}>Remove</button>
                  </div>
                </div>
              </div>
              
            ))
          }
        </div>
        <div className='col-md-4'>
          <h4>Cart summary</h4>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total : {totalprice} </h4>
          <hr />
          {auth?.token ? (
            <>
              <p>Address : {auth?.user?.address}</p>
              <button className='btn btn-outline-primary'>Update Address</button>
            </>
            ):(
            <>
              <p>Login first to make payments</p>
              <button className='btn btn-outline-primary' onClick={navigate("/login" ,{state: "/cart"})}>Login</button>
            </>
            )}
            {
              (!clientToken || !cart?.length) ? "" : (
                <>
                <DropIn
            options={{ 
                authorization: clientToken ,
                paypal : {
                  flow: "vault"
                }
             }}
            onInstance={(instance) => setinstance(instance)}
          />
          <button className='btn btn-primary' onClick={handlePayment}
            disabled={loading || !instance || !auth?.user?.address}
          >{loading ? "processing..." : "Make payment"}</button>
                </>
              )
            }
        
        </div>
        
      </div>
    </Layout>
  )
}

export default Cart
