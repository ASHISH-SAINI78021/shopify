const express = require("express");
const { createCategoryController, updateCategoryController, getCategoryController, getOneCategoryController, deleteCategory } = require("../controllers/createCategoryController.js");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware.js");
const router = express.Router();


router.post("/create-category" ,isLoggedIn , isAdmin , createCategoryController);
router.put("/update-category/:id" ,isLoggedIn , isAdmin , updateCategoryController);
router.get("/get-category" , getCategoryController);
router.get("/get-one/:id" , getOneCategoryController);
router.delete("/deletecategory/:id" , deleteCategory);


module.exports = router;