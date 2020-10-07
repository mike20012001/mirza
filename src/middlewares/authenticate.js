import jwt from 'jsonwebtoken';
import config from '../../config'
const User = require('../models/User')

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    console.log(authorizationHeader)
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
//            console.log(decoded)   detail included
            if (err) {
                res.status(401).json({ error: "Failed to authenticate"});
            } else {
//                const user = new User ({ id: decoded });
//                console.log(user)
                try {
                    (user => {
                        if (!user) {
                            res.status(404).json({ error: 'no such user' });
                        }
                    })
                    req.currentUser = decoded;
                    next();
                } catch (err) { 
                }
            }
        });
    } else {
        res.status(403).json({
            error: 'No token provided'
        })
    }
}
