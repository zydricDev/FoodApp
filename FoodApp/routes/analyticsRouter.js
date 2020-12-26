const router = require('express').Router()
const UserAnalytics = require('../models/userAnalyticModel')
const ListedBundle = require('../models/listedBundleModel')
const tknParamAuth = require('../middleware/tokenParamsAuth')


router.get('/popular/:uuid', async (req,res)=>{
    const inventoryList = await ListedBundle.findOne({
        owner: req.params.uuid
    })
    
    
    if(inventoryList.items.length === 0){
        return res.status(400).json({msg: "No items listed"})
    }

    const purchasedItems = await UserAnalytics.find({
        seller_id: req.params.uuid
    })
 
    
    if(purchasedItems.length === 0){
        return res.status(400).json({msg: "No items were sold"})
    }
   
    const xAxis = []
    const yAxis = []
    

    let totalQty = 0
   
    for(let i=0; i<inventoryList.items.length; i++){
        
        results = purchasedItems.filter(item => JSON.stringify(item.item_id) === JSON.stringify(inventoryList.items[i]._id))
        
        
        if(results.length > 0){
            xAxis.push(`${inventoryList.items[i]._id}%${inventoryList.items[i].foodName}`)
            
            for(let n=0; n<results.length; n++){
                totalQty += parseInt(results[n].quantity)
            }
            yAxis.push(totalQty)
            totalQty = 0
        }
        
        
        
    }

    res.json({
        x: xAxis,
        y: yAxis
    })
   
})

module.exports = router;