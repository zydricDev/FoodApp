const router = require('express').Router()
const Precheckout = require('../models/precheckModel')
const auth = require('../middleware/auth')
const tknParamAuth = require('../middleware/tokenParamsAuth')


router.post('/store', auth, async (req, res)=>{
    try{
        let {itemId, itemName, itemPrice, buyerName, buyerId, buyerAddress, sellerName, sellerId, sellerAddress, icon, estDeliver, quantity} = req.body;

        if(!itemId || !itemName || !itemPrice || !buyerName || !buyerId || !buyerAddress || !sellerName || !sellerId || !sellerAddress || !icon || !estDeliver || !quantity){
            return res.status(400).json({msg: "Not all fields are filled"})
        }
        if(quantity < 0 || quantity > 20){
            return res.status(400).json({msg: "Quantity must be within 1-20"})
        }
        if(buyerId === sellerId){
            return res.status(400).json({msg: "You cannot add your own items"}) 
        }
        const checkDupe = await Precheckout.findOne({
            itemId: itemId,
            buyerId: buyerId,
            sellerId: sellerId
        })
        if(checkDupe){
            return res.status(400).json({msg: "Item already exist in the user's cart"})
        }
        const precheck = new Precheckout({
            itemId,
            itemName,
            itemPrice,
            buyerName,
            buyerId,
            buyerAddress,
            sellerName,
            sellerId,
            sellerAddress,
            icon,
            estDeliver,
            quantity
        })

        await precheck.save();
        res.json({msg: "Item had been added"})
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/display/:uuid', tknParamAuth, async (req,res)=>{
    try{
        const userId = req.params.uuid
        const user_precheckout = await Precheckout.find({
            buyerId: userId
        })
        
        res.json(user_precheckout)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }


})

router.patch('/edit/:uuid/:id', tknParamAuth, async (req,res)=>{
    try{
        let {quantity, buyerAddress} = req.body;
        const editItem = await Precheckout.findOne({
            _id: req.params.id,
            buyerId: req.params.uuid
        })
        if(editItem.length === 0){
            return res.status(400).json({msg: "Item no longer exist"});
        }
        await editItem.updateOne({
            buyerAddress: buyerAddress,
            quantity: quantity,
        })
        res.json({msg: "Item had been updated"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})

router.delete('/deleteAll/:uuid', tknParamAuth, async (req, res)=>{
    try{
        const destroyItems = await Precheckout.find({
            buyerId: req.params.uuid
        })
       
        if(destroyItems.length === 0){
            return res.status(400).json({msg: "No items to remove"});
        }
        await Precheckout.deleteMany({
            buyerId: req.params.uuid
        })
    
        res.json({msg: "All items were removed"});

    }catch(err){
        res.status(500).json({error: err.message})
    }
})


router.delete('/delete/:uuid/:id', tknParamAuth, async (req, res)=>{
    try{
        const destroyedItem = await Precheckout.findOneAndDelete({
            _id: req.params.id,
            buyerId: req.params.uuid
        })
        if(!destroyedItem){
            return res.status(400).json({msg: "Item no longer exist"});
        }
    
        res.json({msg: "Item had been removed"});

    }catch(err){
        res.status(500).json({error: err.message})
    }
})



module.exports = router;