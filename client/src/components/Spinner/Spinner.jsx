import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Spinner = ({page}) => {
    const [count , setcount] = useState(5);
    const [pageNotFound , setPageNotFound] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=> {
        const interval = setInterval(() => {
            setcount((prevalue) => --prevalue);
        }, 1000);

        if (count == 0 && page == 1){
            navigate(-1);
        }
        else if (count == 0 && !page) {
            navigate("/login" , {
                history : location.pathname
            });
        }
        return ()=> clearInterval(interval);
    } , [count]);
  return (
    <div>
        <h1>Redirecting you in {count} seconds</h1>
      <div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    </div>
  )
}

export default Spinner
