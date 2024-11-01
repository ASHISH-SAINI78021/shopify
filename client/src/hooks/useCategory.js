import { useState , useEffect } from "react";
import toast  from "react-hot-toast";
import api from "../components/const.js";

export default function useCategory(){
    const [categories , setcategories] = useState([]);

    // get category
    const getCategory = async()=> {
        try {
            let response = await fetch(`${api}/api/v1/category/get-category`);
            // console.log(response);
            if (response.ok){
                response = await response.json();
                // console.log(response);
                if (response.success){
                    setcategories(response.categories);
                }
                else {
                    console.log("Got error in fetching category , success : false");
                    toast.error("Got error in fetching category , success : false");
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    }

    useEffect(()=> {
        getCategory();
    } , []);

    return categories;
    
}