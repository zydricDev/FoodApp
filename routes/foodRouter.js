const router = require('express').Router();
const Food = require('../models/foodModel');
const auth = require('../middleware/auth');
const paginate = require('../middleware/paginate');

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



router.get('/display', paginate(Food), async(req,res)=>{
    res.json(res.paginate)
})

router.get('/display/:id', async(req,res)=>{
    try{
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        if(!page){
            page = 1
        }
        if(!limit){
            limit = 9
        }
        const result = {}
        const displayFood = await Food.find({userId: req.params.id})
        const startIndex = (page - 1) * limit
        const endIndex = (page * limit)

        if(endIndex < displayFood.length){
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if(startIndex > 0){
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        result.result = displayFood.slice(startIndex, endIndex)
        res.json(result)
            
    }catch(err){
        res.status(500).json({error: err.message});
    }
})



router.patch('/edit/:id', async(req,res)=>{
    try{
        let {newName, newPrice, newDesc, newImage} = req.body;
        
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

        await food.updateOne({ 
            foodName: newName,
            price: newPrice,
            desc: newDesc,
            image: newImage

        })
        res.json(food)
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
    
})

router.get('/:id', async(req,res)=>{
    try{
        const food = await Food.findById(req.params.id)
        res.json({
            foodName: food.foodName,
            userDisplayName: food.userDisplayName,
            userId: food.userId,
            price: food.price,
            desc: food.desc,
            image: food.image
        })

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/testing/:bart/:tart', async (req,res)=>{
    try{
        const hello = req.params.bart
        const domo = req.params.tart
        res.json({
            hello,
            domo
        })
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;