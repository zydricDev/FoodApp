const router = require('express').Router();
const mapApi = require('../mapFunctions/mapApi')
const fetch = require('node-fetch')

router.get('/display/:location', async(req,res)=>{
    const location = req.params.location.replace(/\s/g, '+').replace(/,/g, '%2C').replace(/&/g, '%26')
    const result = mapApi(location)
    
    const response = await fetch(result)
    const json = await response.json()
    if(json.info.statuscode !== 0 || json.results[0].locations.length !== 1){
        return res.json({msg: `${location} is not a valid address`});
    }
    
    res.json({
        coordinates: json.results[0].locations[0].displayLatLng
    })
    
})

module.exports = router;