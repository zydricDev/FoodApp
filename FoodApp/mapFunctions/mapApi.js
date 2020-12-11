const https = require('https')

function mapApi(start, end, type){
    
    const key = process.env.MAP_QUEST
    const url = `https://www.mapquestapi.com/directions/v2/route?key=${key}&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=${type}&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`

    
    return url;
}

module.exports = mapApi;