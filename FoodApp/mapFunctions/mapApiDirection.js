const https = require('https')

function mapApiDirection(starting_point, end_point){
    
    const key = process.env.MAP_QUEST
    const url = `https://www.mapquestapi.com/directions/v2/route?key=${key}&from=${starting_point}&to=${end_point}Format=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`
    return url;
}



module.exports = mapApiDirection;