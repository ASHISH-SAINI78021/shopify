const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products : [{
        type : mongoose.ObjectId ,
        ref : "Product"
    }] ,
    payment : {} ,
    buyer : {
        type : mongoose.ObjectId ,
        ref : "User"
    } ,
    status : {
        type : String ,
        default : "Not proccessed" ,
        enum : ["Not processed" , "Processing" , "Shipped" , "Delivered" , "Canceled"]
    }
} , {timestamps : true});

const Order = mongoose.model("Order" , orderSchema);

module.exports = Order;
