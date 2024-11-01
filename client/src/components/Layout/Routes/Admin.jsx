import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import api from "../../const.js";

const Admin = () => {
    const [ok , setok] = useState(false);
    const [auth , setauth] = useAuth();
    useEffect(()=> {
        const authCheck = async ()=> {
            const response = await fetch(`${api}/api/v1/auth/admin-auth` , {
                headers : {
                    Authorization : auth?.token
                }
            })
            if (response.ok){
                setok(true);
            }
            else {
                setok(false);
            }
        }

        if (auth?.token){
            authCheck();
        }
    } , [auth]);

  return (
    <div>
      {(ok) ? <Outlet/> :<Spinner/> }
    </div>
  )
}

export default Admin
