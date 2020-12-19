const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        var token = req.header('zdevsite.usrtkn');
        
        if(!token){
            
            return res.status(401).json({msg: 'No token'});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            
            return res.status(401).json({msg: 'Token failed'})
        }  
        req.user = verified.id;
        next();

    }catch(err){
        res.status(500).json({error: err.message});
    }   
};

module.exports = auth;