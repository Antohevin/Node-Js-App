
const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/comment');
const Utils = require('../utils');




exports.createComment = async(req,res)=>{
    try {
        if(!req.body.topicid){
            Utils.sendFailureResponse({ error : "Topic Id not available" },req,res);
            return;
        }

        if(!req.body.postid){
            Utils.sendFailureResponse({ error : "Post Id not available" },req,res);
            return;
        }

        let newComment = new Comment();
        
        newComment.comment =req.body.comment || '';
        newComment.topicid = mongoose.Types.ObjectId(req.body.topicid);
        newComment.postid = mongoose.Types.ObjectId(req.body.postid);
        newComment.createdby = mongoose.Types.ObjectId(req.body.createdby);
        newComment.createdat = Date.now();;
        newComment.modifiedby = mongoose.Types.ObjectId(req.body.modifiedby);
        newComment.modifiedat = Date.now();;
        newComment.statusflag = "A";

        newComment.save((err,data)=>{
            if (err) {
                Utils.sendFailureResponse({ error : "error while saving Comment" },req,res,err);
                return;
            } else {
                Utils.sendSuccessResponse({comment : data},res);
                return;
            }
        });
    } catch (err) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
    
}