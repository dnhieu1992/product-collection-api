import mongoose from 'mongoose';
import AUTH_CONFIG from '../config/auth.config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { duplicatedResponse, errorResponse, successResponse, badRequestResponse } from '../shared/response.js';
import { ERROR_MSG } from '../constants/messages.js';
import { SORT_DIRECTION } from '../constants/constants.js';
import { searchQuery, cleanObject } from '../shared/ultils.js';

export async function createUser(req, res) {
    try {
        const {
            username,
            email,
            password,
            roles,
            firstName,
            lastName
        } = req.body;
        console.log("create user called.")

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
            roles: roles,
            firstName: firstName,
            lastName: lastName
        });

        await newUser.save();
        return successResponse(res, { id: newUser._id, username, email, token: token });
    } catch (exp) {
        console.log("exp", exp)
        return errorResponse(res, exp)
    }
}

export async function updateUser(req, res) {
    const {
        id
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const userUpdateModel = cleanObject(req.body);

    db.User.findOneAndUpdate({ _id: id }, userUpdateModel).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

export async function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "username"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

    db.User.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .exec((err, users) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.User.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    users: users
                });
            });
        });
}

export async function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The user not found");
    }
    db.User.findOne({ _id: req.params.id }).then(user => {
        return successResponse(res, user);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

export async function deleteUser(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The user not found");
    }

    db.User.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    });
}