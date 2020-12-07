const router = require('express').Router();
const auth = require('../middleware/auth');

const Comment = require('../models/commentModel');


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