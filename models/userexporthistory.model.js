const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserexporthistorySchema = new Schema({
    userid: {type: String, required: true},
    csvname:{type: String},
    exportquantity:{type: Number},
    export_ids:{type: Array},   
    filesize:{type: Number},   
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
module.exports = mongoose.model('Userexporthistory', UserexporthistorySchema);