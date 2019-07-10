const jwt = require('jsonwebtoken')

const jwtKey = require('./secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, jwtKey.jwtSecret, (err, decoded) => {
            if(err){
                return res.status(401).json(err) 
            } else {
                req.decoded = decoded;
                // checks params id with token user id if not equal then wrong user
                if(req.params.id == req.decoded.subject || req.params.id === undefined) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Restricted path'
                    })
                }
                // next();
            }
        })
    } else {
        return res.status(401).json({
            message: "No token provided"
        })
    }
}