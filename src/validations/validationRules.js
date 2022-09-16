import { validationResult } from 'express-validator';
import { registerUserValidationRules } from './registerValidation.js';
import { loginUserValidationRules } from './loginValidation.js';

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

export {
    loginUserValidationRules,
    registerUserValidationRules,
    validate,
}