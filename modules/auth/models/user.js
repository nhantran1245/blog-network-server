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
    updatedDate: {
        type: Date,
    },
    profileImg: {
        type: String,
    },
    email: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('User', UserSchema);
