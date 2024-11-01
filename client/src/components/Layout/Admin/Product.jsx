import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./Admin.module.css";
import DashboardLayout from "./DashboardLayout";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
const { Option } = Select;
import api from "../../const.js"

const Product = () => {
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState(null);
  const [description, setdescription] = useState(null);
  const [quantity, setquantity] = useState(null);
  const [price, setprice] = useState(null);
  const [category, setcategory] = useState(null);
  const [photo, setphoto] = useState(null);
  const [shipping, setshipping] = useState(null);
  const [auth , setauth] = useAuth();

  // get one category
  const fetchData = async () => {
    try {
      let response = await fetch(
        `${api}/api/v1/category/get-category`
      );
      if (response.ok) {
        response = await response.json();
        if (response.success) {
          setcategories(response.categories);
        } else {
          console.log("Cannot access category");
          toast.error("Cannot access categories");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching categories");
    }
  };

  const handleSubmit = async(event)=> {
    try {
      event.preventDefault();
      if (!name || !description || !quantity || !price || !category || !photo || shipping === null) {
        toast.error("Please fill in all required fields");
        return;
      }
      const productData = new FormData();
      productData.append("name" , name);
      productData.append("description" , description);
      productData.append("quantity" , quantity);
      productData.append("price" , price);
      productData.append("photo" , photo);
      productData.append("shipping" , shipping);
      productData.append("category" , category);
      let response = await fetch(`${api}/api/v1/product/create-product` , {
        method : "POST" ,
        headers : {
          "Authorization" : auth?.token
        } ,
        body : productData
      })


      if (response?.ok){
        response = await response.json();
        if (response?.success){
          toast.success("Product added successfully");
          setname(null);
          setdescription(null);
          setphoto(null);
          setquantity(null);
          setcategories([]);
          setcategory(null);
          setshipping(null);
          fetchData();
        }
        else {
          toast.error("Did not add product , success : false");
          console.log("Did not add product , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout title={"Dashboard - Add Products"}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout />
        </div>
        <div className={styles.right}>
          <div>
            {/* It is showing category here */}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <Select
                placeholder="Select a category"
                bordered={false}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setcategory(value)}
              >
                {categories?.map((value) => {
                  return (
                    <Option key={value._id} value={value._id}>
                      {value.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    onChange={(ev) => setphoto(ev.target.files[0])}
                    hidden
                  />
                </label>
                <div className="preview">
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="error"
                      height={"200px"}
                      className="m-2"
                    />
                  )}
                </div>
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    onChange={(ev) => setname(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="description"
                    id=""
                    cols="30"
                    placeholder="Enter description"
                    rows="3"
                    onChange={(ev) => setdescription(ev.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    onChange={(ev) => setquantity(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    onChange={(ev) => setprice(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    placeholder="Enter shipping status"
                    bordered={false}
                    size="medium"
                    className="form-select mb-3"
                    onChange={(ev) => setshipping(ev)}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <button className="btn btn-primary" >Create product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
