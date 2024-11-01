const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true
    } , 
    slug : {
        lowercase : true ,
        type : String
    }
})

const Category = mongoose.model("Category" , categorySchema);

module.exports = Category;
