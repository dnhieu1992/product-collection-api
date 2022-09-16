import { body } from 'express-validator';

export const registerUserValidationRules = () => {
    return [
        body('username').notEmpty().withMessage("username is required."),
        body('email').notEmpty().withMessage("Email is required.").isEmail().withMessage("Email invalid."),
        body('password').notEmpty().withMessage("Password is required.")
    ]
}