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

    const qtySold = {
        dataset: [],
    }

    const uniqueYears = [...new Set(purchasedItems.map(e => new Date(e.entry_date).getFullYear()))]
   
    
    let totalQty = 0
    
    for(let p=0; p<uniqueYears.length; p++){
    
        xSub = []
        ySub = []

        byYear = purchasedItems.filter(e => new Date(e.entry_date).getFullYear() === uniqueYears[p])
        for(let i=0; i<inventoryList.items.length; i++){
            results = byYear.filter(item => JSON.stringify(item.item_id) === JSON.stringify(inventoryList.items[i]._id))
            if(results.length > 0){
                xSub.push(inventoryList.items[i].foodName)
                
                for(let n=0; n<results.length; n++){
                    totalQty += parseInt(results[n].quantity)
                }
                ySub.push(totalQty)
                totalQty = 0
            }
        }
        qtySold.dataset.push({
            year: `Items sold in ${uniqueYears[p]}`,
            x: xSub, 
            y: ySub
        })
        
    
        
    }
 
  

    res.json({
        qtySold,
    })
   
})

module.exports = router;