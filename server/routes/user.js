const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        let { full_name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const user = new User({ full_name: full_name, email: email, password: password });
        const savedUser = await user.save()
        return res.status(200).json({
            message: "user saved successfully",
            savedUser
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const verifyuser = await bcrypt.compare(password, user.password);
            if (verifyuser) {
                const payload = {
                    user: {
                        id: user._id
                    }
                }
                const token = jwt.sign(payload, 'siliconMERNCourse', { expiresIn: 36000000 })
                res.status(200).json({
                    message: "Logged in ",
                    user: { user_id: user._id, email: user.email },
                    token
                })
            }
            else {
                res.status(401).json({
                    message: "wrong Useranme/Password "
                })
            }
        } else {
            res.status(401).json({
                message: "wrong Useranme/Password"
            })
        }
    }
    catch (err) {

    }
})
module.exports = router;