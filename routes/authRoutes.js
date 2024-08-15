const express = require('express');
const {
    registerCustomer,
    loginCustomer,
} = require('../controllers/authController');
const { validateRegistration } = require('../middlewares/validationMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - phoneNumber
 *         - shippingAddress
 *         - billingAddress
 *         - preferredPaymentMethod
 *       properties:
 *         email:
 *           type: string
 *           description: Customer's email
 *         password:
 *           type: string
 *           description: Customer's password
 *         firstName:
 *           type: string
 *           description: Customer's first name
 *         lastName:
 *           type: string
 *           description: Customer's last name
 *         phoneNumber:
 *           type: string
 *           description: Customer's phone number
 *         shippingAddress:
 *           type: string
 *           description: Customer's shipping address
 *         billingAddress:
 *           type: string
 *           description: Customer's billing address
 *         preferredPaymentMethod:
 *           type: string
 *           description: Customer's preferred payment method
 *       example:
 *         email: newcustomer@example.com
 *         password: password123
 *         firstName: John
 *         lastName: Doe
 *         phoneNumber: 1234567890
 *         shippingAddress: 123 Main St, Anytown, USA
 *         billingAddress: 456 Elm St, Anytown, USA
 *         preferredPaymentMethod: credit_card
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/register/customer:
 *   post:
 *     summary: Register a new customer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Customer registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request, possibly due to email already existing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Email already exists
 */

router.post('/register/customer', validateRegistration, registerCustomer);
/**
 * @swagger
 * /api/auth/register/customer:
 *   post:
 *     summary: Register a new customer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Customer registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Bad request, possibly due to email already existing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Email already exists
 */

router.post('/login/customer', loginCustomer);
/**
 * @swagger
 * /api/auth/login/customer:
 *   post:
 *     summary: Log in as a customer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Customer's email
 *               password:
 *                 type: string
 *                 description: Customer's password
 *             example:
 *               email: newcustomer@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Wrong username/password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Wrong username/password
 */

module.exports = router;
