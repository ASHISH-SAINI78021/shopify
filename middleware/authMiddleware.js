const JWT = require("jsonwebtoken");
const User = require("../models/user");

module.exports.isLoggedIn = (req , res , next)=> {
    try{
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_TOKEN);
        req.user = decode;
        next();
    }
    catch(err){
        res.send(err);
    }
}

// admin route
module.exports.isAdmin = async(req , res , next)=> {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1){
            res.send({
                success : false ,
                message : "This is not admin"
            })
            return ;
        }
        else {
            next();
        }
    } catch (error) {
        res.send({
            success : false ,
            message : "This is not admin" , 
            error
        })
    }
}