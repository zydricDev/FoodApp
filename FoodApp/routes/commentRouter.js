const router = require('express').Router();
const auth = require('../middleware/auth');

const Comment = require('../models/commentModel');


router.post('/post', auth, async (req,res)=>{
    try{
        let{userId, recipientId, userDisplayName, icon, rating, comment} = req.body

        const existingComment = await Comment.findOne({
            userId: userId,
            recipientId: recipientId,
        })
        if(existingComment){
            return res.status(400).json({msg: "user already commented on this item"});
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