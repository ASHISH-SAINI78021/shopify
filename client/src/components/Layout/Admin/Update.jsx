import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./Admin.module.css";
import DashboardLayout from "./DashboardLayout";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Select } from "antd";
import { useAuth } from "../../context/auth";
const { Option } = Select;

const Update = () => {
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState(null);
  const [oldphoto, setoldphoto] = useState(null);
  const [photo , setphoto] = useState(null);
  const [shipping, setshipping] = useState(null);
  const [catid , setcatid] = useState(null);
  const [auth, setauth] = useAuth();
  const { id } = useParams();

  // get old data
  const oldData = async () => {
    try {
      let response = await fetch(
        `http://localhost:8080/api/v1/product/get-product/${id}`
      );
    //   console.log(response);
      if (response.ok) {
        response = await response.json();
        if (response.success) {
        //   console.log(response);
          setname(response.product.name);
          setdescription(response.product.description);
          setquantity(response.product.quantity);
          setprice(response.product.price);
          setcategory(response.product.category.name);
          setcatid(response.product.category._id);
          setshipping(response.product.shipping);
        } else {
          toast.error("Error during fetching the old data , success : true");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  // get Old photo
  const oldPhoto = async()=> {
    try {
        let response = await fetch(`http://localhost:8080/api/v1/product/product-photo/${id}`);
        console.log(response);
        if (response.ok){
            setoldphoto(response.url);
        }
        else {
            console.log("Error in fetching image , success : false");
            toast.error("Error in fetching image , success : false");
        }
    } catch (err) {
        console.log(err);
        toast.error(err);
    }
  }

  // get one category
  const fetchData = async () => {
    try {
      let response = await fetch(
        "http://localhost:8080/api/v1/category/get-category"
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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!name || !description || !quantity || !price || !category || shipping === null) {
        toast.error("Please fill in all required fields");
        return;
      }
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("category", catid);
      console.log(productData);
      let response = await fetch(`http://localhost:8080/api/v1/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": auth?.token
        },
        body: productData
      })

      console.log(response);

      if (response?.ok) {
        response = await response.json();
        console.log(response);
        if (response?.success) {
          toast.success("Product added successfully");
          setname("");
          setdescription("");
          setquantity("");
          setcategories([]);
          setprice(null);
          setcategory(null);
          setshipping(null);
          setphoto(null);
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
    oldData();
    oldPhoto();
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
                value={category}
                onChange={(value) => setcategory(value)}
              >
                {categories?.map((value) => (
                  <Option key={value._id} value={value._id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                    <h3>Old Photo</h3>
                    <img src={oldphoto} alt="" />
                </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload new photo"}
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
                    value={name}
                    onChange={(ev) => setname(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="description"
                    value={description}
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
                    value={quantity}
                    placeholder="Enter quantity"
                    name="quantity"
                    onChange={(ev) => setquantity(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    name="price"
                    onChange={(ev) => setprice(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    placeholder="Enter shipping status"
                    bordered={false}
                    size="medium"
                    value={shipping ? "Yes" : "No"}
                    className="form-select mb-3"
                    onChange={(ev) => setshipping(ev)}
                  >
                    <Option value="1" >Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <button className="btn btn-primary">Update product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Update;
