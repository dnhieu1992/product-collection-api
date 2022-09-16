import jwt from 'jsonwebtoken';
import AUTH_CONFIG from '../../config/auth.config.js';
import { ERROR_MSG } from '../../constants/messages.js';
import db from '../../models/index.js';

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];

    if (!token) return res.status(401).send({ error: ERROR_MSG.AUTH_INVALID });

    jwt.verify(token.split(' ')[1], AUTH_CONFIG.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: ERROR_MSG.AUTH_INVALID });
        }
        //const user = db.User.findOne({ username: decoded.username, 'tokens.token': token });
        const user = db.User.findOne({ username: decoded.username });
        // if (!user) {
        //     return res.status(401).send({ error: ERROR_MSG.AUTH_INVALID });
        // }
        req.user = user;
        req.token = token;
        next();
    })
}
export {
    verifyToken
}