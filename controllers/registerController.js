const User = require("../models/user.js");
const hashPassword  = require("../helper/register.js");
const compare = require("../helper/login.js");
const JWT = require("jsonwebtoken");

module.exports.registerController = async(req , res)=> {
    try{
        const {name , email , password , phone , address , answer } = req.body;
        if (!name){
            res.send({message : "name field is required"});
            return ;
        }
        if (!answer){
            res.send({message : "answer field is required"});
            return ;
        }
        if (!email){
            res.send({message : "email field is required"});
            return ;
        }
        if (!password){
            res.send({message : "password field is required"});
            return ;
        }
        if (!phone){
            res.send({message : "phone field is required"});
            return ;
        }
        if (!address){
            res.send({message : "address field is required"});
            return ;
        }

        // all fields are here
        const existingUser = await User.findOne({email : email});
        if (existingUser){
            res.send({
                success : false ,
                message : "Please login" 
            })
            return ;
        }

        const hashedAnswer = await hashPassword(answer);

        // register the user
        const hashed = await hashPassword(password);
        const user = new User({
            name , email , password : hashed , phone , address , answer : hashedAnswer
        })

        // save
        await user.save();
        res.send({
            success : true ,
            message : "registered successfuly"
        })
    }
    catch(err){
        console.log(err);
        res.send({
            success : false ,
            message : "error in registeration" , 
            err
        })
    }
}

// login || POST
module.exports.loginController = async(req , res)=> {
    try{
        const {email , password} = req.body;

        // validations
        if (!email || !password){
            res.send({
                success : false ,
                message : "All field are required"
            })
            return ;
        }

        const user = await User.findOne({email : email});

        if (!user){
            res.send({
                success : false ,
                message : "User is not present , please register first"
            })
            return ;
        }

        // if user exits
        const exists = await compare(password , user.password);
        if (!exists){
            res.send({
                success : false ,
                message : "Either email or password is incorrect"
            })
            return ;
        }

        const token = await JWT.sign({_id : user._id} , process.env.JWT_TOKEN , {
            expiresIn : "7d"
        });
        res.send({
            success : true ,
            message : "Successfully login" ,
            user : {
                name : user.name ,
                email : user.email ,
                phone : user.phone , 
                role : user.role ,
                address : user.address
            } ,
            token
        })
    }
    catch (err){
        console.log(err);
        res.send({
            success : false ,
            message : "err in Login" ,
            err
        })
    }
}


// forgot Password controller || Post
module.exports.forgotpasswordController = async (req , res)=> {
    try {
        const {email , answer , newPassword} = req.body;
        const checked = process.env.LOGIN;
        console.log(checked);
        if (!email){
            res.json({
                success : false ,
                message : "Email is required"
            });
            return ;
        }
        if (!newPassword){
            res.json({
                success : false ,
                message : "password is required"
            });
            return ;
        }
        if (!answer){
            res.json({
                success : false ,
                message : "Answer is required"
            });
            return ;
        }
        

        let user = await User.findOne({email});
        // validation
        if (!user){
            res.json({
                success : false ,
                message : "User is not defined" ,
            })
            return ;
        }

        const exists = await compare(answer , user.answer);
        if (!exists){
            res.json({
                success : false ,
                message : "Answer not matched"
            })
            return ;
        }

        // if there is a user
        const hashed = await hashPassword(newPassword);
        user = await User.updateOne({email : email} , { $set :{ password : hashed}});
        res.json({
            success : true ,
            message : "Password changed successfuly"
        })
    } 
    catch (err) {
        console.log(err);
        res.json({
            success : false ,
            message : "Got some error" ,
            err
        })
    }
}


module.exports.updateController = async(req , res)=> {
    try {
        const {name , phone , address , email} = req.body;
        if (!name){
            return res.send({
                success : false ,
                message : "Name field is required"
            })
        }
        if (!phone){
            return res.send({
                success : false ,
                message : "Phone field is required"
            })
        }
        if (!address){
            return res.send({
                success : false ,
                message : "Address field is required"
            })
        }

        const user = await User.findOneAndUpdate({email : email} , {name : name , phone : phone , address : address} , {new : true});

        return res.send({
            success : true ,
            user : {
                name : user.name ,
                email : user.email ,
                phone : user.phone , 
                address : user.address
            } 
        })

    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got error in updation" ,
            err
        })
    }
}
