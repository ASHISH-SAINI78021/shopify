import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const PageNotFound = ({page}) => {
    const [ok , setok] = useState(false);
    useEffect(()=> {
        const fetchData = async (req , res)=> {
            let response = await fetch("http://localhost:8080/pageNotFound");
            response = await response.json();
            if (response.succcess){
                setok(true);
            }
            else {
                setok(false);
            }
        }
        fetchData();
    } , [])

    if (page === "login"){
      return (ok) ? <Outlet/> : <Spinner page={1}/>;
    }

  return (
    <div>
      {(ok) ? <Outlet/> : <div>
        <h1>Page not found</h1>
        <Spinner page={1}/>
      </div>}
    </div>
  )
}

export default PageNotFound
