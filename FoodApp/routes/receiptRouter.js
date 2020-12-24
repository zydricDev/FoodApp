const router = require('express').Router()
const PurchasedBundle = require('../models/ServerOnly/purchaseBundleModel')

const tknParamAuth = require('../middleware/tokenParamsAuth')

router.get('/ofStore/:uuid', tknParamAuth, async (req, res)=>{
    try{
        const report = PurchasedBundle.find({
            owner: req.params.uuid
        })
        if(report){
            return res.status(400).json({msg: "Couldn't find any items sold."})
        }
        res.json(report)
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;