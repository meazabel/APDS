const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../modules/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User(
                {
                    username: req.body.username,
                    password: hash,
                    department: req.body.department
                }
            );
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
})

// Authenticate a user (both user and admin)
router.post('/login', (req, res) => {
    let fetchedUser;
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user || !user.isVerified) {
                return res.status(401).json(
                    {
                        message: "Authentication Failure"
                    });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json(
                    {
                        message: "Authentication Failure"
                    });
            }

            const token = jwt.sign({
                    username: fetchedUser.username,
                    userid: fetchedUser._id,
                    isAdmin: fetchedUser.isAdmin
                },
                'secret_this_should_be_longer_than_it_is',
                {expiresIn: '1h'});

            res.status(200).json({token: token});
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication Failure"
            });
        })
})

module.exports = router;