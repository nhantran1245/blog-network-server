var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        require: 'Enter username',
        unique: true
    },
    password: {
        type: String,
        require: 'Enter password'
    },
    firstName: {
        type: String,
        require: 'Enter first name',
    }, 
    lastName: {
        type: String,
        require: 'Enter last name',
    },
    birthDate: {
        type: Date,
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {
        type: Date,
    },
    fullName: {
        type: String,
        require: 'Enter full name',
    },
    gender: {
        type: String,
        require: "Enter gender"
    }, 
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
    }
});
module.exports = mongoose.model('User', UserSchema);
