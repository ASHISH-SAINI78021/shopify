import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./Admin.module.css";
import DashboardLayout from "./DashboardLayout";
import toast from "react-hot-toast";
import CategoryForm from "./CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import api from "../../const.js"

const CreateCategory = () => {
  const [category, setcategory] = useState(null);
  const [value, setvalue] = useState("");
  const [auth, setauth] = useAuth();
  const [submit, setsubmit] = useState("");
  const [del, setdel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState(null); // particular category data
  const [updatedata , setupdatedata] = useState(null);
  const [id , setid] = useState(null);

  const handleEdit = async (event, id) => {
    try {
      let response = await fetch(
        `${api}/api/v1/category/get-one/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (response.ok) {
        response = await response.json();
        console.log(response);

        if (response.success) {
          setIsModalOpen(true);
          setdata(response.category);
          setvalue("");
        } else {
          toast.error("Error in updation of category");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };
  const handleDelete = async (event, id) => {
    try {
      setdel(1);
      let response = await fetch(
        `${api}/api/v1/category/deletecategory/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
          method: "DELETE",
        }
      );

      if (response.ok) {
        response = await response.json();
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          setdel(0);
          setvalue("");
        } else {
          toast.error("Error in deletion of category");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in deletion of category");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = value;
    try {
      let response = await fetch(
        `${api}/api/v1/category/create-category`,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ name }),
        }
      );

      if (response.ok) {
        response = await response.json();
        if (response.success) {
          toast.success(response.message);
          setsubmit(1);
          setvalue("");
        } else {
          toast.error("Error in addition of new category");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in additon of new category");
    }
  };
  const fetchData = async () => {
    try {
      let response = await fetch(
        `${api}/api/v1/category/get-category`
      );
      if (response.ok) {
        response = await response.json();
        if (response.success) {
          setcategory(response.categories);
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
  const handleOk = async() => {
    setIsModalOpen(false);
    try {
      const name = updatedata;
      let response = await fetch(`${api}/api/v1/category/update-category/${id}` , {
        method : "PUT" ,
        headers : {
          "Content-Type" : "application/json" ,
          "Authorization" : auth?.token 
        } ,
        body : JSON.stringify({name})
      })

   
       
      if (response.ok){
        response = await response.json();
        if (response.success){
          toast.success("Updated successfully");
          setid(null);
        }
        else {
          toast.error("Got some error during updation , success : false");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in updation in details");
    }
  };
  useEffect(() => {
    fetchData();
  }, [submit, del, value , id]);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout title={"Create Category"}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <DashboardLayout />
        </div>
        <div className={styles.right}>
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={value}
              setvalue={setvalue}
            />
            <>
              <Modal
                title="Update Category 😊"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Old Category Name : {data?.name}</p>
                <form>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="exampleInputEmail1"
                      placeholder="Enter new category name"
                      value={updatedata}
                      onChange={ev => setupdatedata(ev.target.value)}
                    />
                </form>
              </Modal>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Slug Name</th>
                    <th scope="col">Button</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((value, index) => {
                    return (
                      <tr>
                        <th scope="row">{++index}</th>
                        <td>{value.name}</td>
                        <td key={value._id}>{value.slug}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {handleEdit(event, value._id); setid(value._id)}}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(event, value._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
