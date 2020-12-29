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
            year: uniqueYears[p],
            label: `Items sold in ${uniqueYears[p]}`,
            x: xSub, 
            y: ySub
        })
        
    
        
    }
    

    const totalRevenue = {
        dataset: [],
    }


    let revenueForTheMonth = 0
    let totalPrice = 0
    let xSub_Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ]
    
    
    for(let p=0; p<uniqueYears.length; p++){
        ySub = []
        byYear = purchasedItems.filter(e => new Date(e.entry_date).getFullYear() === uniqueYears[p])

        for(let i=0; i<xSub_Months.length; i++){
            byMonth = byYear.filter(e => new Date(e.entry_date).getMonth() === i)

            if(byMonth.length > 0){
                for(let j=0; j<byMonth.length; j++){
                    revenueForTheMonth += parseFloat(byMonth[j].item_price) * parseInt(byMonth[j].quantity)
                    totalPrice += parseFloat(byMonth[j].item_price) * parseInt(byMonth[j].quantity)
                }
                
            }
            ySub.push(revenueForTheMonth)
            revenueForTheMonth = 0
            
            
        }
        totalRevenue.dataset.push({
            year: uniqueYears[p],
            label: `Revenue made in ${uniqueYears[p]}`,
            x: xSub_Months,
            y: ySub,
            totalRevenue: totalPrice
        })
        totalPrice = 0
    }
    
  
    
    res.json({
        qtySold,
        totalRevenue
    })
   
})

router.get('/comparison/available/:uuid', async (req,res)=>{
    

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

    const uniqueYears = [...new Set(purchasedItems.map(e => new Date(e.entry_date).getFullYear()))]
    
    res.json(uniqueYears)
})
router.get('/comparison/:uuid', async (req,res)=>{
    
    if(!req.query.year1 || !req.query.year2){
        return res.status(400).json({msg: "Missing years to compare"})
    }

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

    const uniqueYears = [...new Set(purchasedItems.map(e => new Date(e.entry_date).getFullYear()))]

   
    if(!uniqueYears.includes(parseInt(req.query.year1)) || !uniqueYears.includes(parseInt(req.query.year2))){
        return res.status(400).json({msg: "Cannot compare these two years"})
    }
    
    const comparingYears = [parseInt(req.query.year1), parseInt(req.query.year2)]
    
    const comparisonSet = {
        dataset: [],
    }


    let revenueForTheMonth = 0
    let totalPrice = 0
    let xSub_Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ]
    
    let avgList = undefined
    let averageComparisonList = []
    
    for(let p=0; p<comparingYears.length; p++){
        ySub = []
        byYear = purchasedItems.filter(e => new Date(e.entry_date).getFullYear() === comparingYears[p])

        for(let i=0; i<xSub_Months.length; i++){
            byMonth = byYear.filter(e => new Date(e.entry_date).getMonth() === i)

            if(byMonth.length > 0){
                for(let j=0; j<byMonth.length; j++){
                    revenueForTheMonth += parseFloat(byMonth[j].item_price) * parseInt(byMonth[j].quantity)
                    totalPrice += parseFloat(byMonth[j].item_price) * parseInt(byMonth[j].quantity)
                }
                
            }
            ySub.push(revenueForTheMonth)
            revenueForTheMonth = 0
            
            
        }
        comparisonSet.dataset.push({
            year: comparingYears[p],
            label: `Revenue in ${comparingYears[p]}`,
            x: xSub_Months,
            y: ySub,    
            totalRevenue: totalPrice
        })

        totalPrice = 0
        
        if(avgList === undefined){
            avgList = ySub
        }else{
            for(let y=0; y<avgList.length; y++){
                averageComparisonList.push((avgList[y]+ySub[y])/2)
            } 
        }
        
        
    }
    
  
    
    res.json({
        label: `Comparison between ${comparingYears[0]} & ${comparingYears[1]}`,
        comparisonSet,
        averageSet: averageComparisonList,
        averageLabel: `Average revenue between ${comparingYears[0]} & ${comparingYears[1]}`
    })
})

module.exports = router;