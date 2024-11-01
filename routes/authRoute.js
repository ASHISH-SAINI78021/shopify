const express = require("express");
const registerController = require("../controllers/registerController.js");
const { isLoggedIn  , isAdmin} = require("../middleware/authMiddleware.js");
// const {loginController} = require("../controllers/registerController.js");

const router = express.Router();

// register method
router.post("/register" , registerController.registerController);
router.post("/login" , registerController.loginController);


// forgot password || Post
router.post("/forgotpassword" , registerController.forgotpasswordController);

// user request || protected route
router.get("/user-auth" , isLoggedIn , (req , res)=> {
    res.status(200).send({ok : true});
})

// Admin Route || protected route
router.get("/admin-auth" , isLoggedIn , isAdmin , (req , res)=> {
    res.status(200).send({ok : true});
})

// update user credentials
router.put("/user-update" , isLoggedIn , registerController.updateController);
module.exports = router