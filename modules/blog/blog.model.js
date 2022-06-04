var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: {
        type: String,
        require: 'Enter Title',
    },
    backgroundImage: {
        type: String,
        require: 'Enter password'
    },
    content: {
        type: String,
        require: 'Enter content',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: 'Enter User Created'
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {
        type: Date,
    },
    likes: [
        {
            liked_by: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            date: {
                type: Date,
            }
        }
    ],
    comments: [
        {
            commented_by: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String
            },
            date: {
                type: Date,
            }
        },
    ]
});
module.exports = mongoose.model('Blog', BlogSchema);
