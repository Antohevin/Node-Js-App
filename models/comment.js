const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CommentSchema = new Schema({

    comment : {
        type :  String,
        required : true
    },
    topicid : {
        type: Schema.ObjectId, 
        ref: 'Topic', 
        required: false 
    },
    postid : {
        type: Schema.ObjectId, 
        ref: 'Post', 
        required: false 
    },
    createdby: { 
        type: Schema.ObjectId, 
        ref: 'User', 
        required: false 
    },
    createdat: { 
        type: Date, 
        required: false 
    },
    modifiedby: { 
        type: Schema.ObjectId, 
        ref: 'User', 
        required: false 
    },
    modifiedat: { 
        type: Date, 
        required: false 
    },
    statusflag: { 
        type: String, 
        required: false
    }
});


module.exports = mongoose.model('Comment', CommentSchema);