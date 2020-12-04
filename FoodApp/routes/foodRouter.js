const router = require('express').Router();
const Food = require('../models/foodModel');
const auth = require('../middleware/auth');

const { query } = require('express');
const paginateThis = require('../middleware/paginateThis')


router.post('/register', auth, async (req,res)=>{
    try{
        let {
            foodName, 
            userDisplayName, 
            userId, 
            price, 
            desc, 
            image,
            category,
            feature,
            
            
        } = req.body;

        if( !foodName || !userDisplayName || !price || !userId || !category ){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        if(parseInt(price) <= 0){
            return res.status(400).json({msg: "Price cannot be 0 or less"});
        }
        if(!desc){
           desc = 'N/a'
        }
        if(!image){
            image = 'https://semantic-ui.com/images/wireframe/image.png'
        }
        if(!feature){
            feature = false
        }

        const featureBool = parseInt(feature)
        if(featureBool === 1){
            feature = true
        }else{
            feature = false
        }
        
        const newFood = new Food({
            foodName,
            userDisplayName,
            userId,
            price,
            desc,
            image,
            category,
            feature
        });
        const savedFood = await newFood.save();
        
        res.json(savedFood);
    
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.delete('/delete/:id', auth, async (req,res)=>{
    try{
        const deletedFood = await Food.findByIdAndDelete(req.params.id)
        res.json(deletedFood)
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/display/user/:id', async(req,res)=>{
    try{
        const displayAll = await Food.find({userId: req.params.id}).sort({feature: -1})
        res.json(displayAll)

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/display/all', paginateThis(Food), async (req, res) => {
    res.json(res.paginateThis)
})

router.patch('/edit/:id', async(req,res)=>{
    try{
        let {newName, newPrice, newDesc, newImage, newFeature, newCategory} = req.body;
        
        
        const food = await Food.findById(req.params.id)
        if(!newName){
            newName = food.foodName
        }
        if(!newPrice){
            newPrice = food.price
        }
        if(!newDesc){
            newDesc = food.desc
        }
        if(!newImage){
            newImage = food.image
        }
        if(!newFeature){
            newFeature = food.feature
        }
        if(!newCategory){
            newCategory = food.category
        }

        if(newFeature === '0'){
            newFeature = false
        }
        if(newFeature === '1'){
            newFeature = true
        }
        await food.updateOne({ 
            foodName: newName,
            price: newPrice,
            desc: newDesc,
            image: newImage,
            category: newCategory,
            feature: newFeature

        })
        res.json(food)
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
    
})

router.get('/find/:item', async(req,res) =>{
    try{
        
        const filtered = await Food.find({
            $text: {
                $search: req.params.item
            }
        })

        let page = parseInt(req.query.page)
        let limit = 9

        const result = {}
        const startIndex = (page - 1) * limit
        const endIndex = (page * limit)

        if (endIndex < filtered.length) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }

        let pagesAhead = []
        let pagesBefore = []

        for (let i = 1; i <= 3; i++) {
            if (startIndex + i * limit < filtered.length) {
                pagesAhead.push(i + page)
            }
            if (startIndex - i * limit >= 0) {
                pagesBefore.unshift(page - i)
            }
        }


        result.possiblePages = {
            ahead: pagesAhead,
            before: pagesBefore,
            current: page,
            maxPage: Math.ceil(filtered.length / limit)
        }


        result.result = filtered.slice(startIndex, endIndex)
        res.json(result)

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/:id', async(req,res)=>{
    try{
        if(!req.params.id){
            return res.status(400).json({msg: "No id"})
        }
        if(req.params.id === 'undefined'){
            return res.json()
        }
        const food = await Food.findById(req.params.id)
        res.json(food)

    }catch(err){
        res.status(500).json({error: err.message});
    }
})


module.exports = router;