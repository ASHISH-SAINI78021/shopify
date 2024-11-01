import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [newPassword , setnewpassword] = useState("");
    const [email , setemail] = useState("");
    const navigate = useNavigate();
    const [answer , setanswer] = useState("");
    
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
          let response = await fetch(`http://localhost:8080/api/v1/auth/forgotpassword` , {
            method : "POST" , 
            headers : {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({newPassword , email , answer})
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
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              newPassword
            </label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={ev => setnewpassword(ev.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
