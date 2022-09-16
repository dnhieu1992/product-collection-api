import { body } from 'express-validator';

export const loginUserValidationRules = () => {
    return [
        body('username').notEmpty().withMessage("Username is required."),
        body('password').notEmpty().withMessage("Password is required.")
    ]
}