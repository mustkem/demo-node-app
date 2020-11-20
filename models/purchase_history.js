const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PurchaseHistorySchema = new Schema({
    user_id: {type: String, required: true},
    plan_id: {type: String, required: true},
    type: {type: String, required: true},
    expiredate: {
        type: Date,
        default: Date.now
    },
    purchasedate: {
        type: Date,
        default: Date.now
    },
    user_download_count: {type: Number},
    user_remaining_download: {type: Number},
    user_download_complete: {type: Number},
    businesses_download_count: {type: Number},
    businesses_remaining_download: {type: Number},
    businesses_download_complete: {type: Number},  
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
module.exports = mongoose.model('purchase_history', PurchaseHistorySchema);