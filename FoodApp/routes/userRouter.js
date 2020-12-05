const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const validFormat = require('../checkEmail/validFormat');

router.post('/register', async (req,res)=>{
    try{
        let {email, password, passwordCheck, displayName, icon, address, zipcode, phone} = req.body;
        if(!email || !password || !passwordCheck){
            return res.status(400).json({msg: "Not all field have been entered"});
        }
        if(password.length < 5){
            return res.status(400).json({msg: "Password must be more than 5 characters"});
        }
        if(password !== passwordCheck){
            return res.status(400).json({msg: "Passwords needs to match"});
        }
        if(address > 50){
            return res.status(400).json({msg: "Address has reached character limit"});
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
        if(zipcode.length !== 5){
            return res.status(400).json({msg: "Zip code must be 5-digits"});
        }
        
        if(!displayName){
            displayName = email;
        }
        if(!icon){
            icon = 'https://semantic-ui.com/images/wireframe/image.png'
        }
        if(!address){
            address = 'Address was not set'
        }
        if(!zipcode){
            zipcode = 'Zip was not set'
        }
        if(!phone){
            phone = '0000000000'
        }
        


        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPass,
            displayName,
            icon, 
            address, 
            zipcode, 
            phone
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
        let {displayName, icon, address, zipcode, phone, email} = req.body;
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
        if(zipcode && zipcode.length !== 5){
            return res.status(400).json({msg: "Zip code must have 5-digits"});
        }

        if(phone && phone.length !== 10){
            return res.status(400).json({msg: "Phone must have 10-digits"});
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
            
        })
        res.json({
            email: user.email,
            displayName: user.displayName,
            icon: user.icon,
            address: user.address,
            zipcode: user.zipcode,
            phone: user.phone 
        })

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/', auth, async (req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id
    });
})


router.get('/find/:id', async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.json({
        email: user.email,
        displayName: user.displayName,
        address: user.address,
        icon: user.icon,
        zipcode: user.zipcode,
        phone: user.phone

    })
})
module.exports = router;