const express = require('express');
const route = express.Router();
const userDB = require('../models/user_models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../auth/secrets');

route.post('/registration', async (req, res) => {
    try {
        // get the user from the form
        let user = req.body;
        const checkUser = await userDB.findByUsername(user.username)
        if(checkUser.length > 0) {
            res.status(400).json({
                message: 'Username already exists'
            })
        } else {
            const hash = bcrypt.hashSync(user.password, 10)
            user.password = hash;
            const hashPwd  = await userDB.add(user)
            res.status(201).json({hashPwd})
        }

    } catch ({message}) {
        res.status(500).json({
            message
        })
    }
})

route.post('/login', async (req, res) => {
   try {
    let { username, password } = req.body
      await userDB.findBy({username})
        .first()
        .then(user => {
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)
                res.status(200).json({
                    message: `Hello ${user.username}`,
                    token
                })
                }
            }else{
                res.status(401).json({
                    message: "The credentials are not valid"
            })
            }
        })
   } catch ({message}) {
       res.status(500).json({
           message
       })
   }
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };
   const options = {
       expiresIn: '12h'
   }
   return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = route;