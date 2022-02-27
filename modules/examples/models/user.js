var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        require: 'Enter username'
    },
    password: {
        type: String,
        require: 'Enter password'
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('User', UserSchema);
