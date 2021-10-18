const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PostSchema = new Schema({

    imageurl : {
        type :  String,
        required : false
    },
    topicid : {
        type: Schema.ObjectId, 
        ref: 'Topic', 
        required: false 
    },
    caption : {
        type :  String,
        required : false
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


module.exports = mongoose.model('Post', PostSchema);