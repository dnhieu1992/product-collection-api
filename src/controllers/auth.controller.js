import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import AUTH_CONFIG from '../config/auth.config.js';
import { ERROR_MSG } from '../constants/messages.js';
import { successResponse, errorResponse, duplicatedResponse, badRequestResponse } from '../shared/response.js'

async function login(req, res) {
    try {
        const {
            username,
            password
        } = req.body;

        const user = await db.User.findOne({ username: username });
        console.log("user", username, password, user)

        if (!user) {
            return badRequestResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID);
        }
        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return badRequestResponse(res, ERROR_MSG.USERNAME_OR_PASSWORD_INVALID);
        }

        const currentUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles
        }

        const token = jwt.sign(currentUser, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

        return successResponse(res, { ...currentUser, token });
        // const tokens = [...user.tokens, token]

        // db.User.findOneAndUpdate({ _id: id }, { ...currentUser, tokens }).then(() => {
        //     return successResponse(res, { ...currentUser, token });
        // }).catch((error) => {
        //     return errorResponse(res, error);
        // })

        // db.User.findOneAndUpdate({ _id: user.id }, { ...currentUser, tokens }, {}, function (err) {
        //     if (err)
        //         return errorResponse(res, error);

        //     return successResponse(res, { ...currentUser, token });
        // });
    } catch (exp) {
        console.log(exp);
        return errorResponse(res, exp);
    }
}

async function register(req, res) {
    try {
        const {
            username,
            email,
            password
        } = req.body;


        const userByUsername = await db.User.findOne({ username: username });
        
        if (userByUsername) {
            return duplicatedResponse(res, ERROR_MSG.USERNAME_EXISTS);
        }

        const userByEmail = await db.User.findOne({ email: email });
        if (userByEmail) {
            return duplicatedResponse(res, ERROR_MSG.EMAIL_EXISTS);
        }

        const hashPassword = bcrypt.hashSync(password, AUTH_CONFIG.SALT);

        const token = jwt.sign({ username: username, email: email }, AUTH_CONFIG.SECRET_KEY, { expiresIn: 30 * 60 });

        const newUser = new db.User({
            _id: mongoose.Types.ObjectId(),
            username: username,
            email: email,
            password: hashPassword,
            //tokens: [{ token }]
            roles: ["user"]
        });

        await newUser.save();
        return successResponse(res, { id: newUser._id, username, email, token: token });
    } catch (exp) {
        return errorResponse(res, exp)
    }
}

export {
    login,
    register
}