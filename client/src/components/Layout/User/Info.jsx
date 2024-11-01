import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import styles from './User.module.css'
import UserDashboardLayout from "./userDashboardLayout";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Info = () => {
    const [auth , setauth] = useAuth();
    const [name , setname] = useState("");
    const [email , setemail] = useState("");
    const [phone , setphone] = useState("");
    const [address , setaddress] = useState("");

    const update = async(event)=>{
      event.preventDefault();
      try{
        let response = await fetch(`http://localhost:8080/api/v1/auth/user-update` , {
          method : "PUT" , 
          headers : {
            "Content-Type": "application/json" ,
            "Authorization" : auth?.token
          },
          body : JSON.stringify({name , email , phone , address})
        });
        
        if (response.ok){
          response = await response.json();
          if (response.success){
            setauth({...auth , user : response.user});
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = response.user;
            localStorage.setItem("auth", JSON.stringify(ls));
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

  useEffect(()=> {
    setname(auth?.user?.name);
    setemail(auth?.user?.email);
    setphone(auth?.user?.phone);
    setaddress(auth?.user?.address);
  } , []);
  return (
    <Layout>
        <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <UserDashboardLayout />
        </div>
        <div className={styles.right}>
          <div>
          <h1 className="mt-3">Update profile 👨🏻‍💼</h1>
        <form onSubmit={update}>
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
              disabled
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Info
