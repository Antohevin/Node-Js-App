const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TopicSchema = new Schema({

    topicname: {
        type :  String,
        required : true
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


module.exports = mongoose.model('Topic', TopicSchema);