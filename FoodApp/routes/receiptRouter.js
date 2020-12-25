const router = require('express').Router()
const PurchasedBundle = require('../models/ServerOnly/purchaseBundleModel')

const tknParamAuth = require('../middleware/tokenParamsAuth')

router.get('/ofStore/:uuid', tknParamAuth, async (req, res)=>{
    try{
        const report = await PurchasedBundle.find({
            owner: req.params.uuid
        })
        
        return res.json(report)
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;