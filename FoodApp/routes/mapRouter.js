const router = require('express').Router();
const mapApi = require('../mapFunctions/mapApi')
const fetch = require('node-fetch')

router.get('/compare/:startpoint/:endpoint/:routetype', async(req,res)=>{
    const startingPoint = req.params.startpoint.replace(/\s/g, '+')
    const endPoint = req.params.endpoint.replace(/\s/g, '+').replace(/,/g, '%2C')
    const type = req.params.routetype.toLowerCase()
    
    const result = mapApi(startingPoint, endPoint, type)
    const response = await fetch(result)
    const json = await response.json()

    
    res.json(json)
})

module.exports = router;