const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');


const auth = require('../middleware/auth');
const validFormat = require('../checkEmail/validFormat');
const mapApi = require('../mapFunctions/mapApi');

router.post('/register', async (req,res)=>{
    try{
        let {email, password, passwordCheck, displayName, icon, address, zipcode, phone, country} = req.body;
        if(!email || !password || !passwordCheck || !address || !zipcode || !country){
            return res.status(400).json({msg: "Not all field have been entered"});
        }
        if(password.length < 5){
            return res.status(400).json({msg: "Password must be more than 5 characters"});
        }
        if(password !== passwordCheck){
            return res.status(400).json({msg: "Passwords needs to match"});
        }
        if(address.length > 50){
            return res.status(400).json({msg: "Address has reached character limit"});
        }
        if(displayName.length > 50){
            return res.status(400).json({msg: "Display name has reached character limit"});
        }
        if(country.length != 3 || /[^a-zA-Z]+$/.test(country)){
            return res.status(400).json({msg: "Country Postal Abbreviations must be 3 letters"});
        }
        if(zipcode.length !== 5){
            return res.status(400).json({msg: "Zip code must be 5-digits"});
        }
        if(email){
            const valid = validFormat(email)
            if(!valid){
                return res.status(400).json({msg: "This E-mail is not valid"});
            }
        }
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({msg: "This E-mail has already been taken"});
        }
        if(!displayName){
            displayName = email;
        }
        if(!icon){
            icon = 'https://semantic-ui.com/images/wireframe/image.png'
        }
        if(!phone){
            phone = '0000000000'
        }

        if(country){
            country = country.toUpperCase()
        }
   
        const fullAddress = (`${address} ${zipcode}`).replace(/\s/g, '+').replace(/,/g, '%2C').replace(/&/g, '%26')
        const result = mapApi(fullAddress)
        const response = await fetch(result)
        const json = await response.json()
        if(json.info.statuscode !== 0 || json.results[0].locations.length !== 1){
            return res.status(400).json({msg: `${address} ${zipcode} is not a valid address`});
        }
        lat = json.results[0].locations[0].displayLatLng.lat
        lng = json.results[0].locations[0].displayLatLng.lng
        
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPass,
            displayName,
            icon, 
            address, 
            zipcode, 
            phone,
            country,
            lat,
            lng
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

        
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/login', async (req,res)=>{
    try{
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "Not all fields have been entered"});
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: "Unable to find user or user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Please log in with your correct password"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                
            }
        })
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.delete('/delete', auth, async (req,res) =>{
    
    try{
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post('/tokenIsValid', async (req,res)=>{
    try{
        const token = req.header('auth-token');
        if(!token){
            return res.json(false);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }
        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


router.patch('/edit/:id', auth, async (req,res)=>{
    try{
        let {displayName, icon, address, zipcode, phone, email, country} = req.body;
        if(email){
            const valid = validFormat(email)
            if(!valid){
                return res.status(400).json({msg: "This E-mail is not valid"});
            }
        }
        
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({msg: "This E-mail has already been taken"});
        }
        if(address && address.length > 50){
            return res.status(400).json({msg: "Address has reached character limit"});
        }
        if(displayName && displayName.length > 50){
            return res.status(400).json({msg: "Display name has reached character limit"});
        }
        if(zipcode && zipcode.length !== 5){
            return res.status(400).json({msg: "Zip code must have 5-digits"});
        }

        if(phone && phone.length !== 10){
            return res.status(400).json({msg: "Phone must have 10-digits"});
        }
        if(country){
            country = country.toUpperCase()
        }

        const user = await User.findById(req.params.id)
        if(!displayName){
            displayName = user.displayName
        }
        if(!icon){
            icon = user.icon
        }
        if(!address){
            address = user.address
        }
        if(!zipcode){
            zipcode = user.zipcode
        }
        if(!country){
            country = user.country
        }

        const fullAddress = (`${address} ${zipcode}`).replace(/\s/g, '+').replace(/,/g, '%2C').replace(/&/g, '%26')
        const result = mapApi(fullAddress)
        const response = await fetch(result)
        const json = await response.json()
        if(json.info.statuscode !== 0 || json.results[0].locations.length !== 1){
            return res.status(400).json({msg: `${address} ${zipcode} is not a valid address`});
        }
        const lat = json.results[0].locations[0].displayLatLng.lat
        const lng = json.results[0].locations[0].displayLatLng.lng
        
        if(!phone){
            phone = user.phone
        }
        if(!email){
            email = user.email
        }
        
        await user.updateOne({
            email: email, 
            displayName: displayName,
            icon: icon,
            address: address,
            zipcode: zipcode,
            phone: phone,
            country: country,
            lat: lat,
            lng: lng
            
        })
        res.json({
            email: user.email,
            displayName: user.displayName,
            icon: user.icon,
            address: user.address,
            zipcode: user.zipcode,
            phone: user.phone,
            country: user.country 
        })

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.post('/map', async (req, res)=>{
    let {query, country, miles} = req.body;
    if(!query && !country){
        return res.status(400).json({msg: "Enter an address and country"})
    }
    if(country.length != 3 || /[^a-zA-Z]+$/.test(country)){
        return res.status(400).json({msg: "Country Abbreviations must be 3 letters (ISO-3166-1 ALPHA-3 code)"});
    }
    if(!miles || miles <= 0){
        return res.status(400).json({msg: "Miles field is empty"});
    }
    country = country.toUpperCase()

    const fullAddress = (`${query}`).replace(/\s/g, '+').replace(/,/g, '%2C').replace(/&/g, '%26')
    const result = mapApi(fullAddress)
    const response = await fetch(result)
    const json = await response.json()
    if(json.info.statuscode !== 0 || json.results[0].locations.length !== 1){
        return res.status(400).json({msg: `${query} is not a valid address`});
    }
    const lat = json.results[0].locations[0].displayLatLng.lat
    const lng = json.results[0].locations[0].displayLatLng.lng


    const range = 0.006*parseInt(miles)
    const users = await User.find({
        country: country
    })

    let results = []
    users.filter(function (item){
        if(
            parseFloat(item.lat) <= parseFloat(lat)+range &&
            parseFloat(item.lat) >= parseFloat(lat)-range && 
            parseFloat(item.lng) <= parseFloat(lng)+range &&
            parseFloat(item.lng) >= parseFloat(lng)-range)
            {
                return results.push({
                    'id': item._id,
                    'name': item.displayName,
                    'icon': item.icon,
                    'address': item.address,
                    'zipcode': item.zipcode,
                    'phone': item.phone,
                    'lat': item.lat,
                    'lng': item.lng
                })
            }
        return
    })
    let all = {}
    all.origin = {
        latitude: lat,
        longitude: lng
    }
    all.areaSearch = results
    
    res.json(all)
})

router.get('/find/:id', async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.json({
        email: user.email,
        displayName: user.displayName,
        address: user.address,
        icon: user.icon,
        zipcode: user.zipcode,
        phone: user.phone,
        country: user.country,
        lat: user.lat,
        lng: user.lng
    })
})

router.get('/', auth, async (req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id
    });
})


module.exports = router;