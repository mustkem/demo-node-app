const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MenuSchema = new Schema({
    name: {type: String, required: true},
    slug:{type: String},
    order:{type: String},
    class:{type: String},
    status:{type: Boolean},
    submenu:{type: Array},  
    menu_id: {type: String},  
});

// Export the model
module.exports = mongoose.model('Menu', MenuSchema);