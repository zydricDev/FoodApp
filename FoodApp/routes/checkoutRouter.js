const router = require('express').Router()
const Checkout = require('../models/checkoutModel')
const Precheckout = require('../models/precheckModel')

const tknParamAuth = require('../middleware/tokenParamsAuth')

router.post('/store/:uuid', tknParamAuth, async (req, res)=>{
    try{
        
        const precheck = await Precheckout.find({
            buyerId: req.params.uuid
        })
        if(!precheck || precheck.length <= 0){
            return res.status(400).json({msg: "There are no items in the cart"})
        }
        let total = 0
        let sellerGeoSet = []
        for(let i=0; i<precheck.length; i++){
            total += parseFloat(precheck[i].itemPrice) * parseInt(precheck[i].quantity)
            sellerGeoSet.push(`${precheck[i].sellerCoor[0]}, ${precheck[i].sellerCoor[1]}`)
        }
        let sellerUniqueGeoSet = [...new Set(sellerGeoSet)]
        
        const check = new Checkout({
            items: precheck,
            totalPrice: total,
            userId: precheck[0].buyerId,
            userGeoLocation: [precheck[0].buyerCoor[0], precheck[0].buyerCoor[1]],
            sellerGeoLocationSet: sellerUniqueGeoSet
        })

        await check.save();

        await Precheckout.deleteMany({
            buyerId: req.params.uuid
        })
        res.json({msg: "Items are being processed"})
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;