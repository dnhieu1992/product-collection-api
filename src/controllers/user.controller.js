import mongoose from 'mongoose';
import AUTH_CONFIG from '../config/auth.config.js';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { duplicatedResponse, errorResponse, successResponse, badRequestResponse } from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';

export function createUser(req, res) {
    if (!req.body.email || req.body.password) {
        return badRequestResponse(res, '');
    }
    db.User.findOne({ email: req.email }).then((user) => {
        if (user) return duplicatedResponse(res, ERROR_MSG.USER_EXISTS);

        var hashedPassword = bcrypt.hashSync(req.body.password, AUTH_CONFIG.SALT);
        const username = req.body.email.split('@')[0];

        const newUser = new db.User({
            _id: mongoose.Types.ObjectId(),
            userName: username,
            email: req.body.email,
            password: hashedPassword,
        });

        newUser.save().then((result) => {
            return successResponse(res, result);
        }).catch((error) => {
            return errorResponse(res, error);
        })

    })
}