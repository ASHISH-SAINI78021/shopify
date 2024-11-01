const express = require("express");
const { createProductController, getAllProductsController, getSingleProductController, deleteProductController, getPhotoController, updateProductController, filterController, productCountController, productListController, searchProductController, similarProductController, categoryProductController, braintreePaymentController, braintreeTokenController } = require("../controllers/productController.js");
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware.js");
const formidable = require("express-formidable");
const router = express.Router();


router.post("/create-product" , isLoggedIn , isAdmin , formidable() , createProductController);
router.get("/get-all-products" , getAllProductsController);
router.get("/get-product/:id" , getSingleProductController);
router.delete("/get-product/:id" , isLoggedIn , isAdmin , deleteProductController);
router.get("/product-photo/:pid" , getPhotoController);
router.put("/update-product/:id" , formidable() , updateProductController);
router.post("/product-filters" , filterController);
router.get("/product-count" , productCountController);
router.get("/product-list/:page" , productListController);
router.get("/search/:keyword" , searchProductController);
router.get("/similar-products/:pid/:cid" , similarProductController);
// product by category
router.get("/product-category/:slug" , categoryProductController);

// || get token for payment gateway
router.get("/braintree/token" , braintreeTokenController);

// || payment controller 
router.get("/braintree/payment" , isLoggedIn , braintreePaymentController)
module.exports = router;