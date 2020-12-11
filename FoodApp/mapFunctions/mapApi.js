const https = require('https')

function mapApi(location){
    
    const key = process.env.MAP_QUEST
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false`
    return url;
}

module.exports = mapApi;