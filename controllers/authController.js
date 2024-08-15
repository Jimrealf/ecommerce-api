const {
    createUser,
    createCustomerDetails,
    findUserByEmail,
    setPasswordResetToken,
} = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { assignRole, getUserRole } = require('../models/roleModel');

// Register a customer
const registerCustomer = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        shippingAddress,
        billingAddress,
        preferredPaymentMethod,
    } = req.body;

    try {
        const user = await createUser(email, password);
        await assignRole(user.id, 'customer');
        const customerDetails = await createCustomerDetails(
            user.id,
            firstName,
            lastName,
            phoneNumber,
            shippingAddress,
            billingAddress,
            preferredPaymentMethod
        );
        res.status(201).json({
            message: 'Customer registered successfully',
            user,
            customerDetails,
        });
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

// Customer login
const loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Wrong username/password' });
        }

        const role = await getUserRole(user.id);
        if (role !== 'customer') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const token = jwt.sign(
            { userId: user.id, role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    registerCustomer,
    loginCustomer,
};
