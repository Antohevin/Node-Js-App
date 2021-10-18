
const mongoose = require('mongoose');
const Topic = require('../models/topic');
const Utils = require('../utils');





exports.createTopic = async(req,res)=>{
    try {
        console.log(req.body);
        if(!req.body.topicname){
            Utils.sendFailureResponse({ error : "Topic name not present" },req,res);
            return;
        }

        let newTopic = new Topic();
        
        newTopic.topicname = req.body.topicname || '';
        newTopic.createdby = mongoose.Types.ObjectId(req.body.createdby);
        newTopic.createdat = Date.now();;
        newTopic.modifiedby = mongoose.Types.ObjectId(req.body.modifiedby);
        newTopic.modifiedat = Date.now();;
        newTopic.statusflag = req.body.statusflag;

        
        newTopic.save((err,data)=>{
            if (err) {
                Utils.sendFailureResponse({ error : "error while saving Topic" },req,res,err);
                return;
            } else {
                Utils.sendSuccessResponse({topic : data},res);
                return;
            }
        });
    } catch (err) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
}



exports.getTopic = (req,res)=>{
    let limit = parseInt(req.query.pagesize); 
    let page = parseInt(req.query.pageno); 

    Topic.find()
    .skip(limit * (page - 1))
    .limit(limit)
    .sort('createdat')
    .lean()
    .exec((err,topicData)=>{
        if(err || !topicData || !topicData.length){
            Utils.sendFailureResponse({error: "Topics not found"},req,res);
            return;
        }else{
            Utils.sendSuccessResponse({ topics : topicData },res);
            return;
        }
    });
}