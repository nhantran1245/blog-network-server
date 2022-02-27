var mongoose = require('mongoose');
var task = require('../models/taskModel');

exports.get_all = function(req, res) {
    task.find({}, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

exports.create = function(req, res) {
    var new_task = new task(req.body);
    new_task.save(function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};