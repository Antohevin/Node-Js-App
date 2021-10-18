
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const Utils = require('../utils');
const Imageupload = require('../imageupload/imageupload')



exports.createPost = async(req,res)=>{
    try {
        if(!req.body.topicid){
            Utils.sendFailureResponse({ error : "Topic Id not available" },req,res);
            return;
        }

        Imageupload.multiImageUpload(req,function(err,filename) {
            if(err){
                Utils.sendFailureResponse({ error : "Error on image upload" },req,res,err);
                return;
            }

        let newPost = new Post();
        
        newPost.imageurl = "filename" || '';
        newPost.topicid = mongoose.Types.ObjectId(req.body.topicid);
        newPost.caption = req.body.caption || '';
        newPost.createdby = mongoose.Types.ObjectId(req.body.createdby);
        newPost.createdat = Date.now();;
        newPost.modifiedby = mongoose.Types.ObjectId(req.body.modifiedby);
        newPost.modifiedat = Date.now();;
        newPost.statusflag = "A";

        newPost.save((err,data)=>{
            if (err) {
                Utils.sendFailureResponse({ error : "error while saving Topic" },req,res,err);
                return;
            } else {
                Utils.sendSuccessResponse({post : data},res);
                return;
            }
        });
    });
    } catch (err) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
    
}



exports.getPost = (req,res)=>{
    let limit = parseInt(req.query.pagesize); 
    let page = parseInt(req.query.pageno); 
    // let matchCriteria = req.query.topicid'

    Post.aggregate([
    //     {
    //     $match: matchCriteria
    //  },
     {
        $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postid',
            as: 'comment'
        }
    },
    {
            $skip: (limit * (page - 1))
    }
    , {
            $limit: limit
    }
    ])
    .exec((err,postRes)=>{
        if(err || !postRes || !postRes.length){
            Utils.sendFailureResponse({error: "Post not found"},req,res);
            return;
        }else{
            Utils.sendSuccessResponse({ post : postRes },res);
            return;
        }
    });
}