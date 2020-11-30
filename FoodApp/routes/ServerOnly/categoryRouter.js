const router = require('express').Router();
const Category = require('../../models/ServerOnly/categoryModel');

router.post('/register', async (req,res)=>{
    try{
        let{ newCategoryType, img } = req.body
        
        const existingType = await Category.findOne({newCategoryType: newCategoryType});
        if(existingType){
            return res.status(400).json({msg: "Type already exist"});
        }

        if( !newCategoryType || !img){
            return res.status(400).json({msg: "No field entered"});
        }

        const newCategory = new Category({
            newCategoryType,
            img
        });
        
        const savedCategory = await newCategory.save();
        
        res.json(savedCategory)

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/display', async (req,res)=>{
    const displayType = await Category.find()
    res.json(displayType)
})


module.exports = router;