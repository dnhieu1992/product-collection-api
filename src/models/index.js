import mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';
import Product from './product.model.js';

const db = {}
// set up mongoose
db.mongoose = mongoose;
db.User = User;
db.Role = Role;
db.Product = Product;
db.ROLES = ["user", "manager", "staff"];

export default db;