const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

let ChannelSchema = new Schema({
    category_id:{type:ObjectId},
    name: {type: String},
    twitter_url: {type: String},
    description:{type: String},
    translation_data:{type: Array},
    image:{type: String},   
    since_id:{type: Number},
    max_id:{type: Number},
    oldsince_id:{type: Number},
    status:{type: Boolean},
    deleted_at:{type: Number},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }         
});

// Export the model
module.exports = mongoose.model('Channel', ChannelSchema);