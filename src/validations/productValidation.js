import { body } from 'express-validator';

export const registerProductValidationRules = () => {
    return [
        body('link').notEmpty().withMessage("link is required."),
        body('shopName').notEmpty().withMessage("Shop name is required.")
    ]
}