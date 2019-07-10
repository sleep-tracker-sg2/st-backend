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
        
        // hash user
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash;
        
        const hashPwd  = await userDB.add(user)
        res.status(201).json(hashPwd)

    } catch (error) {
        res.status(500).json({
            message: "Registration error", error
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
   } catch (error) {
       res.status(500).json(error)
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