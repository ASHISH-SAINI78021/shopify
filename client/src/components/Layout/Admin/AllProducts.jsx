import React, { useEffect, useState } from "react";
import Layout2 from "../Layout2";
import toast from "react-hot-toast";
import { Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api from "../../const.js"

const AllProducts = () => {
  const [products, setProducts] = useState(null); // used to fetch all products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product , setproduct] = useState(null); // used to fetch only single product
  const [auth , setauth] = useAuth();
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      let response = await fetch(
        `${api}/api/v1/product/get-all-products`
      );

      if (response.ok) {
        response = await response.json();
        setProducts(response.products);
      } else {
        toast.error("Error in showing products, success: false");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error fetching products");
    }
  };

  const handleDelete = async(id)=> {
    try {
      let response = await fetch(`${api}/api/v1/product/get-product/${id}` , {
        headers : {
          "Authorization" : auth?.token
        } , 
        method : "DELETE"
      })
      console.log(response);
      if (response.ok){
        response = await response.json();
        if (response.success){
          toast.success("Deleted successfully");
          fetchData();
        }
        else {
          console.log("Got error in deletion , success : false");
          toast.error("Got error in deletion , success : false");
        }
      }
      else {
        console.log("Request failed");
        toast.error("Request failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }
  const showModal = async(id) => {
    setIsModalOpen(true);
    try {
      let response = await fetch(`${api}/api/v1/product/get-product/${id}`);
      console.log(response);
      if (response.ok){
        response = await response.json();
        console.log(response);
        if (response.success){
          setproduct(response.product);
        }
        else {
          toast.error("Error in fetching product , success : false");
          console.log("Error in fetching product , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // get non-file data
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout2>
      <div className="d-flex flex-wrap align-items-center">
        {products?.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="card" style={{ width: "18rem" }}>
              <img
                src={`${api}/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={`Product: ${product.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={()=> showModal(product._id)}>
                  Info
                </button>
                <button className="btn btn-primary m-3" onClick={()=> navigate(`/dashboard/admin/update/${product._id}`)}>Edit</button>
                <button className="btn btn-primary m-3" onClick={()=> handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
          
        )}
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Old Name : {product?.name} </p>
        <p>Old Description : {product?.description}</p>
        <p>Old Price : {product?.price} </p>
        <p>Old quantity : {product?.quantity} </p>
        <p>Old Shipping : {product?.shipping} </p>
        <p>Old Slug : {product?.slug} </p>
        <p>Old category : {product?.category?.name} </p>
        <p>Created At : {product?.createdAt} </p>
      </Modal>
    </Layout2>
  );
};

export default AllProducts;
