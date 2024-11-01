import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const Details = () => {
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  const [SimilarProducts, setSimilarProducts] = useState(null);
  const [cid, setcid] = useState(1);
  const [cart , setcart] = useCart();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/product/get-product/${id}`);
      if (response.ok) {
        response = await response.json();
        if (response.success) {
          setproduct(response.product);
          setcid(response.product.category._id);
        } else {
          console.log("Got some error during fetching of product, success: false");
          toast.error("Got some error during fetching of product, success: false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const similarProducts = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/v1/product/similar-products/${id}/${cid}`);
      console.log(response);
      if (response.ok) {
        response = await response.json();
        console.log(response);
        if (response.success) {
          setSimilarProducts(response.products);
        }  
        //  else {
        //   console.log("Got error while fetching similar products, success: false");
        //   toast.error("Got error while fetching similar products, success: false");
        // }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  // Placeholder for handling click on "View Details" button
  const getSingleProduct = (productId) => {
    // Replace this with your actual logic for displaying details of a single product
    console.log(`View details for product with ID: ${productId}`);
    navigate(`/${productId}`);
  };

  useEffect(() => {
    getProduct();
    similarProducts();
  }, [cid]);

  return (
    <Layout>
      <div className="container d-flex">
        <div className="image">
          <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt="" height="300px" />
        </div>
        <div className="details m-3">
          <p>Product Name: {product?.name}</p>
          <p>Product price: {product?.price}</p>
          <p>Product category: {product?.category.name}</p>
          <p>Product description: {product?.description}</p>
          <button className='btn btn-danger m-2' onClick={()=> {
                    setcart([...cart , product]);
                    localStorage.setItem("cart" , JSON.stringify([...cart , product]));
                    toast.success("Item added successfuly");
                  }}>Add to cart</button>
        </div>
      </div>
      <h2 className='text-center'>Similar products</h2>
      <div className="similar-products text-center d-flex flex-wrap">
        
        {SimilarProducts?.map((product) => (
          <div key={product._id} className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt="" height="200px" />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description.substring(0, 30)}</p>
              <p className="card-text">$ {product.price}</p>
              <button className="btn btn-primary" onClick={() => getSingleProduct(product._id)}>
                View Details
              </button>
              <button className='btn btn-danger m-2' onClick={()=> {
                    setcart([...cart , product]);
                    localStorage.setItem("cart" , JSON.stringify([...cart , product]));
                    toast.success("Item added successfuly");
                  }}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Details;
