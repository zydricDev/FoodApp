const router = require('express').Router();
const Comment = require('../models/commentModel');
const auth = require('../middleware/auth');
const tknParamAuth = require('../middleware/tokenParamsAuth');



router.post('/post', auth, async (req,res)=>{
    try{
        let{userId, recipientId, userDisplayName, icon, rating, comment} = req.body
        
        if( !userId || !recipientId || !userDisplayName || !icon || !rating ){
            return res.status(400).json({msg: "Not all fields are filled"});
        }
        if(userId === recipientId){
            return res.status(400).json({msg: "Cannot comment on own shop"});
        }
        if(comment.length > 280){
            return res.status(400).json({msg: "Comment exceeded character limit 250"});
        }
        if(!comment){
            comment = 'No comment'
        }
        const existingComment = await Comment.findOne({
            userId: userId,
            recipientId: recipientId,
        })
        if(existingComment){
            return res.status(400).json({msg: "User already posted a commented on this shop"});
        }
        
        const newComment = new Comment({
            userId,
            recipientId, 
            userDisplayName,
            icon, 
            rating, 
            comment
        })

        const savedComment = await newComment.save();
        res.json(savedComment);

    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.patch('/user/update/:uuid', tknParamAuth, async (req,res)=>{
    try{
        let {displayName, icon} = req.body
        if(!displayName && !icon){
            return res.json({msg: "No need to update"});
        }
        const sampleUser = await Comment.findOne({
            userId: req.params.uuid
        })
        if(!sampleUser){
            return res.json({msg: "No comment made by user"});
        }
        if(!displayName){
            displayName = sampleUser.userDisplayName
        }
        if(!icon){
            icon = sampleUser.icon
        }

        const allComments = Comment.find({
            userId: req.params.uuid
        })
        
        await allComments.updateMany({
            userDisplayName: displayName,
            icon: icon
        })
        
        res.json({msg: "Successfully updated all comments"})
        

    }catch(err){
        
        res.status(500).json({error: err.message});
    }
})

router.get('/user/rating/:id', async (req,res)=>{
    const allComments = await Comment.find({
        recipientId: req.params.id
    })
    if(!allComments){
        return res.json({rating: "No ratings"});
    }
    let ratings = allComments.map((item)=>{
        return item.rating
    })
    let sum = 0;
    ratings.map((item)=>{
        sum += parseInt(item)
    })

    sum = sum / ratings.length
    
    res.json({
        rating: sum,
        total: ratings.length
    })
})

router.get('/user/:id', async (req,res)=>{
    const allComments = await Comment.find({
        recipientId: req.params.id
    })
    res.json(allComments)
})


router.get('/display', async (req,res)=>{
    const allComments = await Comment.find()
    res.json(allComments)
})



module.exports = router;