const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.jwtSecret;


/**
 * GET /
 * Admin - login page
 */

router.get('/admin', async (req, res) => {

    try {
        const locals = {
            title: "Admin",
            description: "Simple Blog created with NodeJs, Express, and MongoDb"
        }

        const data = await Post.find();
        res.render('admin/index', {locals, layout: adminLayout});
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Admin - check login
 */

router.post('/admin', async (req, res) => {

    try {
        
        const {username, password} = req.body;
        
        const user = await User.findOne({username});

        if (!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id}, jwtSecret);
        console.log(token);
        res.cookie('token', token);
        res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Admin - check login
 */

router.get('/dashboard', async (req, res) => {

    res.render('admin/dashboard');

});

// router.post('/admin', async (req, res) => {

//     try {
        
//         const {username, password} = req.body;
        
//         if(req.body.username === 'admin' && req.body.password === 'password'){
//             res.send('You are logged in');
//         }else{
//             res.send('Not logged in');
//         }

//     } catch (error) {
//         console.log(error);
//     }
// });


/**
 * POST /
 * Admin - Register
 */

router.post('/register', async (req, res) => {

    try {
        
        const {username, password} = req.body;
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            //create new user in database
            const user = await User.create({username, password: hashedPassword});
            res.status(201).json({ message: 'User Created', user});
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({message: 'User already in use'});
            }
            res.status(500).json({message: 'Internal server error'});
        }

    } catch (error) {
        console.log(error);
    }
});



module.exports = router;