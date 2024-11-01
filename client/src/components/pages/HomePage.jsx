import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import  toast  from 'react-hot-toast';
import {Checkbox} from "antd";
import {Radio} from "antd";
import {Price} from "./helper/Price.js";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import api from "../const.js";

const HomePage = () => {
  const [products , setproducts] = useState(null);
  const [categories , setcategories] = useState([]);
  const [checked , setchecked] = useState([]);
  const [radio , setradio] = useState([]);
  const [count , setcount] = useState(0);
  const [cart , setcart] = useCart();
  const [page , setpage] = useState(1);
  const navigate = useNavigate();



  // get total count of products
  const getTotalCount = async()=> {
    try {
      let response = await fetch(`${api}/api/v1/product/product-count`);
      // console.log(response);
      if (response.ok){
        response = await response.json();
        if (response.success){
          setcount(response.count);
        }
        else {
          console.log("Got error while fetching product count , success : false");
          toast.error("Got error while fetching product count , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }


  // filter by category
  const handleFilter = (value , id)=> {
    let all = [...checked];
    if (value){
      all.push(id);
    }
    else {
      all = all.filter((c)=> c !== id); // doubt
    }
    setchecked(all);
  }

  // show all category
  const showAllCategory = async()=> {
    try {
      let response =  await fetch(`${api}/api/v1/category/get-category`);
      // console.log(response);
      if (response.ok){
        response = await response.json();
        // console.log(response);
        if (response.success){
          setcategories(response.categories);
        }
        else {
          console.log("Error during fetching categories , success : false");
          toast.error("Error during fetching categories , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  // get single product
  const getSingleProduct = async(id)=> {
    try {
      let response = await fetch(`${api}/api/v1/product/get-product/${id}`);
      // console.log(response);
      if (response.ok){
        response = await response.json();
        // console.log(response);
        if (response.success){
          navigate(`/${id}`);
        }
        else {
          toast.error("Got error during the fetching of products , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  // fetch all products
  const fetchData = async()=> {
    try {
      let response = await fetch(`${api}/api/v1/product/product-list/${page}`);
      // console.log(response);
      if (response.ok){
        response = await response.json();
        // console.log(response);
        if (response.success){
          setproducts(response.products);
        }
        else {
          toast.error("Got error during the fetching of products , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  // product-filter
  const filterProduct = async()=> {
    try {
      let response = await fetch(`${api}/api/v1/product/product-filters` , {
        method : "POST"  ,
        headers : {
          "Content-Type" : "application/json"
        } ,
        body : JSON.stringify({radio , checked})
      });
      console.log(response);
      if (response.ok){
        response = await response.json();
        console.log(response);
        if (response.success){
          setproducts(response.products);
        }
        else {
          toast.error("Got some error during filtering , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  useEffect(()=> {
    if (radio.length == 0 && checked.length == 0) fetchData();
    showAllCategory();
    getTotalCount();
  } , [page]);

  useEffect(()=> {
    if (radio.length > 0 || checked.length > 0) filterProduct();
  }, [radio , checked]);

  return (
    <Layout title="Home" description="This is the home page" author="Ashish Saini" keywords="home">
      {/* {JSON.stringify(radio , null , 4)} */}
      <div className='row'>
        <div className='col-md-2 d-flex flex-column'>
          {/* Sidebar/Filter Section */}
          <h4 className='text-center'>Filter by category</h4>
          {
            categories?.map((category)=> {
              return<div className='d-flex flex-column'>
              <Checkbox onChange={(event)=> handleFilter(event.target.checked , category._id)}>
                {category.name}
              </Checkbox>
              </div>
               
            })
          }
          <h4 className='text-center'>Filter by price</h4>
          <Radio.Group onChange={(event)=> setradio(event.target.value)}>
          {
            Price?.map((price)=> {
              return  <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
            })
            
          }
          </Radio.Group>
          <button class="btn btn-danger"  onClick={()=> window.location.reload()}>Reset Filters</button>
        </div>
        <div className='col-md-9'>
          {/* Main Content Section */}
          <h1 className='text-center'>All products</h1>
          {products ? (
            <div className='d-flex flex-wrap'>
              {products.map((product) => (
                <div key={product._id} className="card" style={{ width: '18rem', margin: '10px' }}>
                <img src={`${api}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.description.substring(0,20)} height="200px" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  {/* Add additional information as needed */}
                  <p className="card-text">{product.description.substring(0 , 30)}</p>
                  {/* to limit the character in description */}
                  <p className="card-text">$ {product.price}</p>
                  <button className="btn btn-primary" onClick={()=> getSingleProduct(product._id)}>View Details</button>
                  <button className='btn btn-danger m-2' onClick={()=> {
                    setcart([...cart , product]);
                    localStorage.setItem("cart" , JSON.stringify([...cart , product]));
                    toast.success("Item added successfuly");
                  }}>Add to cart</button>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
          {page - 1 > 0 ? <div className='btn btn-warning m-3'
          onClick={(event)=> {
            event.preventDefault();
            setpage(page - 1);
          }}
          >
              prev
          </div> : null}
          {(6*page < count) ?<div className='btn btn-warning m-3'
          onClick={(event)=> {
            event.preventDefault();
            setpage(page + 1);
          }}
          >
              next
          </div>: null}
        </div>
      </div>
      
    </Layout>
  );
  
}

export default HomePage
