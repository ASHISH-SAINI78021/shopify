const mongoose = require("mongoose");
const Product = require("../models/product.js");
const Order = require("../models/order.js");
const Category = require("../models/category.js");
const fs = require("fs");
const slugify = require("slugify");
const braintree = require("braintree");


module.exports.createProductController = async(req , res)=> {
    try {
        const {name , description , shipping , quantity , price} = req.fields;
        if (!name || !description || !shipping || !quantity || !price){
            return res.send({
                success : false ,
                message : "All fields are required"
            })
        }

        const {photo} = req.files;
        if (!photo){
            console.log(photo.size);
            return res.send({
                success : false ,
                message : "Photo is required and it must be less than 1MB"
            })
        }

        const product = new Product({...req.fields , slug : slugify(name)});
        if (photo){
            product.photo.data = fs.readFileSync(photo.path);
            console.log(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();

        return res.send({
            success : true ,
            message : "successfully sent" ,
            photo
        })

    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error while creating new Product" ,
            err
        })
    }
}

module.exports.getAllProductsController = async(req , res)=> {
    try {
        const products = await Product.find({}).select("-photo").populate("category").limit(12).sort({createdAt : -1});
        return res.send({
            success : true ,
            length : products.length ,
            products
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error when fetching products" ,
            err
        });
    }
}

module.exports.getSingleProductController = async(req , res)=> {
    try {
        const product = await Product.findById(req.params.id).select("-photo").populate("category");
        console.log(product);
        return res.send({
            success : true ,
            product
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error when fetching this product" ,
            err
        })
    }
}

module.exports.deleteProductController = async(req , res)=> {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.send({
            success : true ,
            message : "Deleted successfuly"
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error during deletion of this product" ,
            err
        })
    }
}

module.exports.getPhotoController = async (req, res) => {
    try {
      const product = await Product.findById(req.params.pid).select("photo");
  
      if (!product || !product.photo || !product.photo.data) {
        return res.status(404).json({
          success: false,
          message: "Product photo not found",
        });
      }
  
      res.set("Content-Type", product.photo.contentType);
      res.send(product.photo.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };


module.exports.updateProductController = async(req , res)=> {
    try {
        const {name , description , shipping , quantity , price} = req.fields;
        if (!name || !description || !shipping || !quantity || !price){
            return res.send({
                success : false ,
                message : "All fields are required"
            })
        }

        const {photo} = req.files;
        // if (!photo){
        //     console.log(photo.size);
        //     return res.send({
        //         success : false ,
        //         message : "Photo is required and it must be less than 1MB"
        //     })
        // }

        let product = await Product.findByIdAndUpdate(req.params.id , {...req.fields} , {new : true});
        if (photo){
          product = await product.findById(req.params.id , {photo: photo} , {new : true});
        }
        console.log(product);
        return res.send({
            success : true ,
            product
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error during updation of product" 
        })
    }
}


// filter
module.exports.filterController = async(req , res)=> {
    try {
        const {radio , checked} = req.body;
        if (!radio){
            return res.send({
                success : false ,
                message : "radio is empty"
            })
        }
        if (!checked){
            return res.send({
                success : false ,
                messsage : "checked is empty"
            })
        }

        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = {$gte: radio[0] , $lte: radio[1]};
        const products = await Product.find(args);

        return res.send({
            success : true ,
            products
        })
        
    } catch (err) {
        console.log(err);
        res.send({
            success : false ,
            message : "Filter request has failed from server side" ,
            err
        })
    }
}

// product count
module.exports.productCountController = async(req ,res)=> {
    try {
        const count = await Product.find({}).estimatedDocumentCount(); // it is used to count the documents in a collection
        if (!count){
            return res.send({
                success : false ,
                message : "Collection does not exists"
            });
        }

        return res.send({
            success : true ,
            count
        })

    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got error in product count" ,
            err
        })
    }
}



// product list controller
// implement pagination
module.exports.productListController = async(req , res)=> {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await Product.find({}).select("-photo").skip((page - 1)*perPage).limit(perPage).sort({createdAt : - 1});

        return res.send({
            success : true ,
            products
        })
    } catch (err) {
        console.log(err);
        res.send({
            success : false ,
            message : "Got err in product list controller" ,
            err
        })
    }
}

// searching filter
module.exports.searchProductController = async(req , res)=> {
    try {
        const {keyword} = req.params;
        if (keyword.toString().trim() === ""){
            return res.send({
                success : false ,
                message : "Enter a valid value"
            })
        }
        
        const products = await Product.find({
            $or:[
                {name : {$regex : keyword , $options : "i" }} , // options "i" means it is in small letters
                {description : {$regex : keyword , $options : "i"}}
            ]
        }).select("-photo");

        return res.send({
            success : true ,
            products
        })

    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got error in searching" ,
            err
        })
    }
}

// similar products
module.exports.similarProductController = async(req , res)=> {
    try {
        const pid = req.params.pid; // product id
        const cid = req.params.cid; // category id
        
        const products = await Product.find({
            category : cid ,
            _id : {$ne : pid} // not included
        }).select("-photo").limit(3);

        return res.send({
            success : true ,
            products
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got some error in showing similar products" ,
            err
        })
    }
}


// product by category
module.exports.categoryProductController = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });

        // console.log(req.params.slug);

        if (!category) {
            return res.send({
                success: false,
                message: "Category not found",
            });
        }
        const products = await Product.find({ category: category }).select("-photo").populate("category");
        console.log(products);

        if (!products || products.length === 0) {
            return res.send({
                success: false,
                message: "No products available for this category",
            });
        }

        return res.send({
            success: true,
            products,
        });

    } catch (err) {
        console.log(err);
        return res.send({
            success: false,
            message: "Got error in category product controller",
            err,
        });
    }
};


// || payment gateway
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

module.exports.braintreeTokenController = async(req , res)=> {
    try {
       gateway.clientToken.generate({} , function(err , response){
        if (err){
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }

       }) 
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Error in token fetching for payment gateway" ,
            err
        })
    }
}


// || payment controller
module.exports.braintreePaymentController = async(req , res)=> {
    try {
        const {cart , nonce} = req.body;
        const total = 0;
        cart.map((value)=> {
            total += value.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount : total ,
            paymentMethodNonce : nonce ,
            options : {
                submitForSettlement : true
            }
        } , function(error , result){
            if (result){
                const order = new Order({
                    products : cart ,
                    payment : result ,
                    buyer : req.user._id // it will get from isLoggedIn middleware
                }).save();
                res.json({ok : true});
            }
            else {
                res.status(500).send(error)
            }
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Error in payment" ,
            err
        })
    }
}

