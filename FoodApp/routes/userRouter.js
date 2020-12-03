const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

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
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(400).json({msg: "This E-mail is already taken"});
        }
        


        if(!displayName){
            displayName = email;
        }
        if(!icon){
            icon = 'https://semantic-ui.com/images/wireframe/image.png'
        }
        if(!address){
            address = 'n/a'
        }
        if(!zipcode){
            zipcode = 'n/a'
        }
        if(!phone){
            phone = 'n/a'
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

router.get('/', auth, async (req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id
    });
})

module.exports = router;