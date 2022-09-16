import { successResponse, errorResponse } from './response.js'

//Create Item
function create(model, res) {
    if (model) {
        return model
            .save()
            .then((result) => {
                return successResponse(res, result);
            })
            .catch((error) => {
                console.log(error);
                errorResponse(res, error);
            });
    }
}

// Get all Items
function getAll(model, res) {
    model.find()
        .select('_id title description')
        .then((result) => {
            return successResponse(res, result);
        })
        .catch((error) => {
            console.log(error);
            errorResponse(res, error);
        });
}
// get single item by id
function getById(model, id, res) {
    model.findById(id)
        .then((result) => {
            return successResponse(res, result);
        })
        .catch((error) => {
            console.log(error);
            errorResponse(res, error);
        });
}
// update item
function update(model, id, params, res) {
    model.update({ _id: id }, { $set: params })
        .exec()
        .then((result) => {
            return successResponse(res, result);
        })
        .catch((error) => {
            console.log(error);
            errorResponse(res, error);
        });
}
// delete item
function deleteById(model, id, res) {
    model.findByIdAndRemove(id)
        .exec()
        .then((result) => {
            return successResponse(res, result);
        })
        .catch((error) => {
            console.log(error);
            errorResponse(res, error);
        });
}

export {
    create,
    getAll,
    getById,
    update,
    deleteById
}