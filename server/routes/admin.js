const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Users = require('../models/User');

const adminLayout = '../views/layouts/admin';

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
        
        if(req.body.username === 'admin' && req.body.password === 'password'){
            res.send('You are logged in');
        }else{
            res.send('Not logged in');
        }

    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Admin - Register
 */

router.post('/admin', async (req, res) => {

    try {
        
        const {username, password} = req.body;
        
        if(req.body.username === 'admin' && req.body.password === 'password'){
            res.send('You are logged in');
        }else{
            res.send('Not logged in');
        }

    } catch (error) {
        console.log(error);
    }
});



module.exports = router;