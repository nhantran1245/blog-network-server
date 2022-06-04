var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        require: 'Enter name of task'
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false,
    }
});
module.exports = mongoose.model('Task', TaskSchema);
