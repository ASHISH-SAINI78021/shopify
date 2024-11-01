const express = require("express");
const colors = require("colors"); // it is used to color the console
const dotenv = require("dotenv").config();
const main = require("./config.js/db.js");
const morgan = require("morgan");
const User = require("./models/user.js");
const authRoute = require("./routes/authRoute.js");
const PageNotFound = require("./routes/pageNotFound.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const cors = require("cors");
const app = express();


// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


main()
.then(()=> {
    console.log(`connected to database`.bgRed.white);
})
.catch((err)=> {
    console.log(`${err}`.bgCyan.white);
});

// routes 
app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/category" , categoryRoute);
app.use("/api/v1/product" , productRoute);
app.use("/pageNotFound" , PageNotFound);


// rest api
app.get("/" , (req , res)=> {
    res.send({message : "Welcome to ecommerce app"});
})

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=> {
    console.log(`App is listenting on mode on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})