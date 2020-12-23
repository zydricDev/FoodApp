const router = require('express').Router();
const Food = require('../models/foodModel');
const auth = require('../middleware/auth');
const tknParamAuth = require('../middleware/tokenParamsAuth')

const paginateThis = require('../middleware/paginateThis')


router.post('/register/:uuid', tknParamAuth, async (req,res)=>{
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
        if(foodName.length > 50){
            return res.status(400).json({msg: "Name must not exceed 50 characters"});
        }
        if(parseInt(price) <= 0){
            return res.status(400).json({msg: "Price cannot be 0 or less"});
        }else{
            price = parseFloat(price).toFixed(2)
        }
        

        if(!desc){
            let random = Math.random();
            if(random >= 0.5){
                desc = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
            }else{
                desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
            
        }
        if(desc.length > 500){
            return res.status(400).json({msg: "Must not exceed 500 characters"});
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

router.get('/display/test', async (req, res)=>{
    const displayData = await Food.find().sort({feature: -1})
    res.json(displayData)
})


router.patch('/edit/:id/:uuid', tknParamAuth, async(req,res)=>{
    try{
        
        let {newName, newPrice, newDesc, newImage, newFeature, newCategory} = req.body;
        
        const food = await Food.findById(req.params.id)
        if(!food){
            return res.json({msg: "No items user possesses"});
        }
        if(!newName){
            newName = food.foodName
        }
        if(newName.length > 50){
            return res.status(400).json({msg: "Name must be under 50 characters"});
        }
        if(!newPrice){
            newPrice = food.price
        }else{
            newPrice = parseFloat(newPrice).toFixed(2)
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

router.patch('/edit/user/:uuid', tknParamAuth, async(req,res)=>{
    try{
        let {displayName} = req.body;
        const food = Food.find({userId: req.params.uuid})
      
        await food.updateMany({ 
            userDisplayName: displayName
        })
        res.json({msg: "Updated All Items"})
    }catch(err){
        res.status(500).json({error: err.message});  
    }
})

router.get('/find/:item', async(req,res) =>{
    try{
        
        const items = await Food.find({
            $text: {
                $search: req.params.item
            }
        }).sort({feature: -1})

        
        res.json(items)

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