const Category = require("../models/category");
const slugify = require("slugify");

// create category
module.exports.createCategoryController = async(req , res)=> {
    const {name} = req.body;
    if (!name){
        return res.send({
            success : false ,
            message : "Name field is required"
        })
    }

    const existing = await Category.findOne({name});
    if (existing){
        return res.send({
            success : false ,
            message : "Category already exists"
        })
    }

    const newCategory = await new Category({name , slug: slugify(name)}).save();
    return res.send({
        success : true ,
        message : "Category has been successfuly created" ,
        newCategory
    })
}

// update category name
module.exports.updateCategoryController = async(req , res)=> {
    try {
        const name = req.body.name
        const update = await Category.findByIdAndUpdate(req.params.id , {name:name , slug: slugify(name)} , {new : true});
        return res.send({
            success : true ,
            message : "Category updated successfully" ,
            update
        })
    } catch (err) {
        console.log(err);
        res.send({
            success : false ,
            message : "got error while updating category" ,
            err
        })
    }
}

// get all categories
module.exports.getCategoryController = async (req , res)=> {
    try {
        const categories = await Category.find();
        if (!categories){
            return res.send({
                success : false ,
                message : "Not category exists"
            })
        }

        return res.send({
            success : true ,
            categories
        })

    } catch (err) {
        console.log(err);
        res.send({
            success : true ,
            message : "Got error while fetching categories" ,
            err
        })
    }
}


// get one category
module.exports.getOneCategoryController = async (req , res)=> {
    try {
        const category = await Category.findById(req.params.id);
        if (!category){
            return res.send({
                success : false ,
                message : "Category does not exist"
            })
        }

        return res.send({
            success : true ,
            category
        })

    } catch (err) {
        console.log(err);
        res.send({
            success : false ,
            message : "Got error while fetching this id" ,
            err
        })
    }
}


// delete category
module.exports.deleteCategory = async (req , res)=> {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.send({
            success : true ,
            message : "Category deleted successfully"
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Got error while deleting category" ,
            err
        })
    }
}
