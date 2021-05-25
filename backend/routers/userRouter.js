const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const User  = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils');

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.remove({}); // Will remove all before creating users in data
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send ({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });

            return;
        }
    } 
    res.status(401).send({message: 'Invalid email or password'});
    })
);

module.exports = userRouter;