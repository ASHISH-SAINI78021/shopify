import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from "../const.js";

const CategoryProduct = () => {

    const [category , setcatgory] = useState(null);
    const [products , setproducts] = useState([]);
    const {slug} = useParams();  
    const navigate = useNavigate(); 


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

    // getting products based on selected category
    const getProduct = async()=> {
        try {
            let response = await fetch(`${api}/api/v1/product/product-category/${slug}`);
            // console.log(response);
            if (response.ok){
                response = await response.json();
                // console.log(response);
                if (response.success){
                    setproducts(response.products);
                }
                else {
                    console.log("Got error during fetching products , success : false");
                    toast.error("Got error during fetching products , success : false");
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    useEffect(()=> {
        getProduct();
    } , []);

  return (
    <Layout>
      <div className='d-flex flex-wrap'>
              {products.map((product) => (
                <div key={product._id} className="card" style={{ width: '18rem', margin: '10px' }}>
                <img src={`${api}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt="" height="200px"/>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  {/* Add additional information as needed */}
                  <p className="card-text">{product.description.substring(0 , 30)}</p>
                  {/* to limit the character in description */}
                  <p className="card-text">$ {product.price}</p>
                  <button className="btn btn-primary" onClick={()=> getSingleProduct(product._id)}>View Details</button>
                </div>
              </div>
              ))}
            </div>
    </Layout>
  )
}

export default CategoryProduct
