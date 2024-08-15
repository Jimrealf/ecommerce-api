const express = require('express');
const {
    registerCustomer,
    loginCustomer,
} = require('../controllers/authController');
const { validateRegistration } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.post('/register/customer', validateRegistration, registerCustomer);
router.post('/login/customer', loginCustomer);

module.exports = router;
