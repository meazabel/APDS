const express = require('express');
const router = express.Router();
const User = require('../modules/user');
const checkauth = require('../check-auth');

// Verify user
router.post('/verify-user/:id', checkauth,async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        user.isVerified = true;
        await user.save();
        res.json({message: 'User verified successfully', user});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// Get all non-verified users
router.get('/non-verified-users', checkauth, (req, res) => {

    User.find({isVerified: false})
        .then((users)=>{
        res.json(
            {
                message: 'non verified users found',
                users: users
            }
        )
    })
})

// Get all users
router.get('/all-users', checkauth,(req, res) => {
    User.find().then((users)=>{
        res.json(
            {
                message: 'users found',
                users: users
            }
        )
    })
});

// Delete a user
router.delete('/delete-user/:id', checkauth, (req, res) => {
    if (!req.userData.isAdmin) {
        return res.status(403).json({message: 'Permission denied'});
    } else {
        User.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json({message: "User deleted" + result})
            });
    }
})

module.exports = router;