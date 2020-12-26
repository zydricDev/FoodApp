const schedule = require('node-schedule')
const ListedBundle = require('../models/listedBundleModel')
const User = require('../models/userModel')
const Food = require('../models/foodModel')

function bundleStoreItems(){
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(0, 0)];
    rule.hour = 13;
    rule.minute = 0;

    schedule.scheduleJob(rule, async function (){
        const users = await User.find()
        console.log('Updating Bundled Store Items Scheduled at 1pm Sunday')
        for(let i=0; i<users.length; i++){
            await ListedBundle.findOneAndDelete({
                owner: users[i]._id
            })

            let inventory = await Food.find({
                userId: users[i]._id
            })
            
            if(inventory.length > 0){
                await new ListedBundle({
                    items: inventory,
                    owner: users[i]._id,
   

                }).save()
            }
                
        }
    })
}

module.exports = bundleStoreItems