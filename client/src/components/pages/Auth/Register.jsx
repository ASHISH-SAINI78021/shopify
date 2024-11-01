import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import api from "../../const.js";

const Register = () => {
    const [name , setname] = useState("");
    const [password , setpassword] = useState("");
    const [email , setemail] = useState("");
    const [phone , setphone] = useState("");
    const [address , setaddress] = useState("");
    const navigate = useNavigate();
    const [answer , setanswer] = useState("");
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
          let response = await fetch(`${api}/api/v1/auth/register` , {
            method : "POST" , 
            headers : {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({name , password , email , phone , address , answer})
          });
          
          if (response.ok){
            response = await response.json();
            if (response.success){
              toast.success("registered successfully");
              navigate("/login");
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
        <h1 className="mt-3">Register</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={ev => setname(ev.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={ev => setphone(ev.target.value)}
              className="form-control"
              id="exampleInputPhone"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
               address
            </label>
            <input
              type="text" 
              name="address"
              value={address}
              onChange={ev => setaddress(ev.target.value)}
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
               Enter a secret sentence
            </label>
            <input
              type="text" 
              name="answer"
              value={answer}
              onChange={ev => setanswer(ev.target.value)}
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
