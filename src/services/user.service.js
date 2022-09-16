import db from "../models/index.js";
import AUTH_CONFIG from '../config/auth.config.js';

async function createUser(userModel, currentUser) {
    try {
        let user = await db.User.findOne({ email: userModel.email });
        if (user) {
            return { isValid: false, code: 409, errorMesage: 'The email already exists.' };
        }

        if (userModel.username) {
            user = await db.User.findOne({ username: userModel.username });
            if (user) {
                return { isValid: false, code: 409, errorMesage: 'The username already exists.' };
            }
        }

        const hashedPassword = bcrypt.hashSync(userModel.password, AUTH_CONFIG.SALT);
        const username = userModel.username ? user.username : userModel.email.split('@')[0];

        const newUser = new db.User({
            userName: username,
            password: hashedPassword,
            email: userModel.email,
            firstName: userModel.firstName,
            lastName: userModel.lastName,
            phoneNumber: userModel.phoneNumber,
            roles: userModel.roles,
            createdBy: currentUser.id,
            updatedBy: currentUser.id
        });

        const result = await newUser.save();

        return { isValid: true, user: result }
    } catch (exp) {
        return { isValid: false, code: 500, errorMesage: "Some errors occurd." }
    }
}

export {
    createUser
}