const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        console.log(req)
        const token = req.header('auth-token');
        console.log(token)
        if(!token){
        return res.status(401).json({msg: 'No auth'});
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