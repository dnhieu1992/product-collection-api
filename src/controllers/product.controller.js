import mongoose from 'mongoose';
import db from '../models/index.js';
import { searchQuery, cleanObject } from '../shared/ultils.js';
import {
    errorResponse,
    successResponse,
    badRequestResponse,
    notFoundResponse
} from '../shared/response.js';
import { SORT_DIRECTION } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import AUTH_CONFIG from '../config/auth.config.js'

function createProduct(req, res) {
    console.log("req", req.body)
    const newProduct = new db.Product({
        _id: mongoose.Types.ObjectId(),
        ...req.body
    });

    newProduct.save().then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function getAll(req, res) {
    db.Product.find({ isDeleted: false })
        .exec((err, products) => {
            if (err) {
                return errorResponse(res, err);
            }
            return successResponse(res, products);
        });
}

function search(req, res) {
    const queryObject = cleanObject(req.query);

    const query = searchQuery(queryObject);

    const {
        pageNumber,
        pageSize,
        sortDirection,
        sortField = "shopName"
    } = queryObject;

    const sortObject = {};
    sortObject[sortField] = sortDirection === SORT_DIRECTION.ASC ? 1 : -1;

    const tokenInfo = jwt.decode(req.header('authorization').split(' ')[1], AUTH_CONFIG.SECRET_KEY)
    if (!tokenInfo?.roles?.includes("manager") && !tokenInfo?.roles?.includes("staff")) {
        query["createdBy"] = mongoose.Types.ObjectId(tokenInfo.id);
    }

    db.Product.find(query)
        .sort(sortObject)
        .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate('createdBy')
        .populate('updatedBy')
        .exec((err, products) => {
            if (err) {
                return errorResponse(res, err);
            }
            db.Product.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return errorResponse(res, count_error);
                }
                return successResponse(res, {
                    total: count,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    products: products
                });
            });
        });
}

function getById(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The product not found");
    }
    db.Product.findOne({ _id: req.params.id }).then(product => {
        return successResponse(res, product);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function updateProduct(req, res) {
    const {
        id
    } = req.body;

    if (!id) {
        return badRequestResponse(res, '');
    }

    const productUpdate = cleanObject(req.body);

    db.Product.findOneAndUpdate({ _id: id }, productUpdate).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    })
}

function deleteProduct(req, res) {
    if (!req.params.id) {
        return badRequestResponse(res, '');
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return notFoundResponse(res, "The product not found");
    }

    db.Product.findByIdAndRemove({ _id: req.params.id }).then((result) => {
        return successResponse(res, result);
    }).catch((error) => {
        return errorResponse(res, error);
    });
}

export {
    getAll,
    search,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}