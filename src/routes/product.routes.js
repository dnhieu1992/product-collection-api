import express from 'express';
import {
    getAll,
    search,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *         - shopName
 *         - link
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         link:
 *           type: string
 *           description: The link of product
 *         shopName:
 *           type: string
 *           description: The shop name
 *         keyword: 
 *           type: string
 *           description: The keyword
 *         productType1:
 *           type: string
 *           description: product type 1
 *         productType2:
 *           type: string
 *           description: The product type 2
 *         price:
 *           type: Number
 *           description: price of product
 *         reviewContent: 
 *           type: string
 *           description: The content of revew
 *         reviewImages:
 *           type: string
 *           description: The images review
 *         orderId:
 *           type: string
 *           description: The order id
 *         shippingCode: 
 *           type: string
 *           description: The shipping code
 *         totalPrice:
 *           type: Number
 *           description: The total price
 *         isReceived:
 *           type: Boolean
 *           description: True or False
 *         isReviewed:
 *           type: string
 *           description: True or False
 *         reasonNoReview: 
 *           type: string
 *           description: The reason no review
 *         reviewer: 
 *           type: string
 *           description: The reviewer
 *         customer: 
 *           type: string
 *           description: The customer
 */

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: The Countries managing API
 */

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */
router.post('/create', createProduct);

/**
 * @swagger
 * /api/product/update:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 */
router.put('/update', updateProduct);

/**
 * @swagger
 * /api/country/search:
 *   get:
 *     summary: Returns the list of all the country
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: shopName
 *         schema:
 *           type: string
 *         required: false
 *         description: The shop name.
 *       - in: query
 *         name: isReceived
 *         schema:
 *           type: Boolean
 *         required: false
 *         description: The product received.
 *       - in: query
 *         name: isReviewed
 *         schema:
 *           type: Boolean
 *         required: false
 *         description: The product status review
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: Number
 *         required: false
 *         default: 1
 *         description: The Page Number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: Number
 *         required: false
 *         default: 50
 *         description: The Page Size
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: String
 *         required: false
 *         default: asc
 *         description: The Sort Direction(asc/desc)
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: String
 *         required: false
 *         default: name
 *         description: The Sort Field
 *     responses:
 *       200:
 *         description: The list of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/search', search);

/**
 * @swagger
 * /api/product/getAll:
 *   get:
 *     summary: Returns the list of all the product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/getAll', getAll);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 * 
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
router.delete('/delete/:id', deleteProduct);

export default router;