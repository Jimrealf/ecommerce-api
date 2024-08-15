const { check, validationResult } = require('express-validator');

const validateRegistration = [
    check('email').isEmail().withMessage('Must be a valid email'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('firstName').notEmpty().withMessage('First name is required'),

    check('lastName').notEmpty().withMessage('Last name is required'),

    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone()
        .withMessage('Must be a valid phone number'),

    check('shippingAddress')
        .notEmpty()
        .withMessage('Shipping address is required'),

    check('billingAddress')
        .notEmpty()
        .withMessage('Billing address is required'),

    check('preferredPaymentMethod')
        .notEmpty()
        .withMessage('Preferred payment method is required')
        .isIn(['credit_card', 'paypal', 'bank_transfer'])
        .withMessage('Invalid payment method'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateRegistration,
};
