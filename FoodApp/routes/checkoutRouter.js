const router = require('express').Router()
const Checkout = require('../models/checkoutModel')
const Precheckout = require('../models/precheckModel')
const UserAnalytics = require('../models/userAnalyticModel')

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
            totalPrice: total.toFixed(2),
            userId: precheck[0].buyerId,
            userGeoLocation: [precheck[0].buyerCoor[0], precheck[0].buyerCoor[1]],
            sellerGeoLocationSet: sellerUniqueGeoSet
        })
        await check.save();

    
      
        for(i=0; i<precheck.length; i++){
            await new UserAnalytics({
                item_id: precheck[i].itemId,
                item_name: precheck[i].itemName,
                item_price: precheck[i].itemPrice,
                client_id: precheck[i].buyerName,
                client_geo_lat: precheck[i].buyerCoor[0],
                client_geo_lng: precheck[i].buyerCoor[1],
                seller_id: precheck[i].sellerId,
                seller_name: precheck[i].sellerName,
                quantity: precheck[i].quantity,
            }).save();
        }
    
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

