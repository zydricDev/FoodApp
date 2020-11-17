const router = require('express').Router();
const Food = require('../models/foodModel');
const auth = require('../middleware/auth');

router.post('/register', auth, async (req,res)=>{
    console.log(req)
    try{
        let {foodName, userDisplayName, userId, price, desc, image} = req.body;
        if(!foodName || !userDisplayName || !price || !userId){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        if(!desc){
           desc = 'N/a'
        }
        if(!image){
            image = 'https://semantic-ui.com/images/wireframe/image.png'
        }
        
        const newFood = new Food({
            foodName,
            userDisplayName,
            userId,
            price,
            desc,
            image
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

router.get('/display', async(req,res)=>{
    try{
        const displayFood = await Food.find({}, 
            function(err, result) {res.json(result) 
            }).limit(9);
            
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



module.exports = router;