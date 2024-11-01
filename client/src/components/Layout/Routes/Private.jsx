import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const Private = () => {
    const [ok , setok] = useState(false);
    const [auth , setauth] = useAuth();
    useEffect(()=> {
        const authCheck = async ()=> {
            const response = await fetch("http://localhost:8080/api/v1/auth/user-auth" , {
                headers : {
                    Authorization : auth?.token
                }
            })
            if (response.ok){
                console.log("hi");
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

export default Private
