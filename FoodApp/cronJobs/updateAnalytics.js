var schedule = require('node-schedule')
const UserAnalytics = require('../models/userAnalyticModel')
const User = require('../models/userModel')
const PurchasedBundle = require('../models/ServerOnly/purchaseBundleModel')

function updateAnalytics(){
    var rule = new schedule.RecurrenceRule();
    //rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    //rule.hour = 12;
    rule.minute = 31;

    schedule.scheduleJob(rule, async function (){
        const users = await User.find()
        let bundled = undefined
        let totalSum = 0
        let totalQuantity = 0
        let clone = undefined
        let allClients = []
        let uniqueClients = []
        
        console.log('Database: Updating bundles scheduled every 12PM')
       
        for(let i=0; i<users.length; i++){
            client = await UserAnalytics.find({
                seller_id: users[i]._id
            })
            for(let j=0; j<client.length; j++){
                allClients.push(client[j].client_id)
            }
            uniqueClients = [...new Set(allClients)]
         
            if(uniqueClients.length > 0){
                for(let n=0; n<uniqueClients.length; n++){
                    clone = await PurchasedBundle.findOneAndDelete({
                        client_id: uniqueClients[n],
                        owner: users[i]._id,
                    })
                    
                    bundled = await UserAnalytics.find({
                        client_id: uniqueClients[n],
                        seller_id: users[i]._id
                    })
        
                    if(bundled.length > 0){
                        for(let a=0; a<bundled.length; a++){
                            totalSum += parseFloat(bundled[a].item_price)
                            totalQuantity += parseInt(bundled[a].quantity)
                        }
                        await new PurchasedBundle({
                            items: bundled,
                            total_price: totalSum.toFixed(2),
                            client_id: bundled[0].client_id,
                            client_geo_lat: bundled[0].client_geo_lat,
                            client_geo_lng: bundled[0].client_geo_lng,
                            owner: bundled[0].seller_id,
                            distance: bundled[0].distance,
                            quantity: totalQuantity,
                        }).save()
                        totalSum = 0
                        totalQuantity = 0
                        
                    }
                }
            
                
        
                
            }
            
            allClients = []
            uniqueClients = []
            
         

        }
    });
}

module.exports = updateAnalytics 
