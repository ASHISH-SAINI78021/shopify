import React, { useState } from "react";
import Layout from '../../Layout/Layout'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useLocation } from "react-router-dom";
import api from "../../const.js";

const Login = () => {
    const [password , setpassword] = useState("");
    const [email , setemail] = useState("");
    const navigate = useNavigate();
    const [auth , setauth] = useAuth();
    const location = useLocation();
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
          let response = await fetch(`${api}/api/v1/auth/login` , {
            method : "POST" , 
            headers : {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({password , email})
          });
          
          if (response.ok){
            response = await response.json();
            if (response.success){
              toast.success("Login successfully");
              setauth({
                ...auth ,
                user : response.user ,
                token : response.token
              })
              localStorage.setItem("auth" , JSON.stringify(response));
              navigate(location.history || "/");
            }
            else {
              toast.error(response.message);
            }
          }
        }
        catch(err){
          toast.error(err);
        }
        
    }
  return (
    <Layout>
      <div className="register">
        <h1 className="mt-3">Login</h1>
        <form onSubmit={handleSubmit}>
       
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={ev => setemail(ev.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={ev => setpassword(ev.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="submit" className="btn btn-primary m-2" onClick={()=> navigate('/forgotpassword')}>
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
