const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv")
dotenv.config();
const user = require('../user/user.model');

exports.login = function(req, res) {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    user.findOne({ username }, (err, user) => {
        if (err || !user) {
            res.status(401).json({ message: 'Login fail, username or password is incorrect' });
        } else if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: 'Login fail, username or password is incorrect' });
        } else {
            const payload = { username: username, userId: user._id };
            const secretKey = process.env.SECRET_KEY;
            const options = {
                expiresIn: '720h'
            };
            JWT.sign(payload, secretKey, options, (err, token) => {
                if (err) {
                    res.status(401).json({
                        message: 'Login Fail, try again later.'
                    });
                } else {
                    res.status(201).json({
                        jwtToken: token
                    })
                }
            });
        }
    })
};

exports.getUser = (req, res) => {
    const { userId } = req.user;
    user.findOne({ _id: userId }, (err, user) => {
        if (err || !user) {
            res.status(404).json({
                message: 'User not found.'
            });
        } else {
            res.status(200).json({ user });
        }
    })
}

const validateUserName = (value) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]+$/;
    return regex.test(value);
  }

const validatePassword = (value) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    return regex.test(value);
}

exports.register = (req, res) => {
    const { 
        username,
        password,
        firstName,
        lastName,
    } = req.body;
    if (!username || username.length < 8 || username.length > 24) {
        res.status(400).json({
            message: 'Username must have length beetwen 8 and 24'
        })
    } else if (!validateUserName(username)) {
        res.status(400).json({
            message: 'Username must only contain numbers or letters, and must start with letter'
        })
    } else if (!password || password.length < 8 || password.length > 32) {
        res.status(400).json({
            message: '"Password must have length beetwen 8 and 32'
        })
    } else if (!validatePassword(password)) {
        res.status(400).json({
            message: 'Password must only contain numbers letters, or special characters'
        })
    } else {
        user.findOne({ username: username.toLowerCase() }, (err, item) => {
            if (item) {
                res.status(400).json({
                    message: 'Username existed, please enter another'
                })
            } else {
                const userPayload = new user(req.body);
                userPayload.username = username.toLowerCase();
                const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
                const hashedPassword = bcrypt.hashSync(password, salt);
                userPayload.password = hashedPassword;
                userPayload.save((err, newUser) => {
                    if (err || !newUser) {
                        res.status(400).json({
                            message: 'Create new user fail'
                        });
                    } else {
                        res.status(201).json({
                            ...newUser
                        });
                    }
                });
            }
        });
    }
}

