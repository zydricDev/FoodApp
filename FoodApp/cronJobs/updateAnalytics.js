var schedule = require('node-schedule')
const UserAnalytics = require('../models/userAnalyticModel')

function updateAnalytics(){
    var rule = new schedule.RecurrenceRule();
    //rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    //rule.hour = 20;
    rule.minute = 13;

    schedule.scheduleJob(rule, async function (){
        console.log('this runs every 2 mins')
    });
}
    

module.exports = updateAnalytics 