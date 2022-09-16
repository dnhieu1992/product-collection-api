// Call in installed dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//import DB_CONFIG from './config/db.config.js';
import appConfig from './config/app.config.js';
import { verifyToken } from './shared/middleware/VerifyToken.js'

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

import attachmentRoutes from './routes/attachment.routes.js';
import productRoutes from './routes/product.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

global.__basedir = __dirname;
console.log(__basedir);
// set up express app
const app = express();
app.use(express.static(__dirname + '/assets/uploads/'));

//const swaggerDocument = YAML.load('./swagger.yaml');
app.use(cors())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(logger('dev'));

// set up mongoose
const username = encodeURIComponent("thanhho109");
const password = encodeURIComponent("Qaz@123456");
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.uqxw2uv.mongodb.net/products?retryWrites=true&w=majority` 

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database', error);
    });

// set up home route
app.get('/', (request, respond) => {
    respond.status(200).json({
        message: 'Welcome to Project Support',
    });
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || appConfig.PORT, (request, respond) => {
    console.log(`Our server is live on ${appConfig.PORT}. Yay!`);
});

// set up route
app.use('/api/', authRoutes);
app.use('/api/user/', verifyToken, userRoutes);
app.use('/api/attachment/', verifyToken, attachmentRoutes);
app.use('/api/products/', verifyToken, productRoutes);


