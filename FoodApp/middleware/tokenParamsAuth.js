const jwt = require('jsonwebtoken');

const tknParamAuth = (req, res, next) => {
    try{
        var token = req.header('zdevsite.usrtkn');
        if(!token){
            return res.status(401).json({msg: 'No token'});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({msg: 'Token failed'})
        }
        if(verified.id !== req.params.uuid){
            return res.status(401).json({msg: "Action Forbidden"})
        }  
        req.user = verified.id;
        next();

    }catch(err){
        res.status(500).json({error: err.message});
    }   
};

module.exports = tknParamAuth;