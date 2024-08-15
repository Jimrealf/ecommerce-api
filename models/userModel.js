const pool = require('./db');
const bcrypt = require('bcryptjs');

//Create a user
const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;`;
    const values = [email, hashedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Create customer details
const createCustomerDetails = async (
    userId,
    firstName,
    lastName,
    phoneNumber,
    shippingAddress,
    billingAddress,
    preferredPaymentMethod
) => {
    const query = `INSERT INTO CustomerDetails (user_id, first_name, last_name, phone_number, shipping_address, billing_address, preferred_payment_method)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const values = [
        userId,
        firstName,
        lastName,
        phoneNumber,
        shippingAddress,
        billingAddress,
        preferredPaymentMethod,
    ];
    await pool.query(query, values);
};

//Find user by email
const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

// Set password reset token and expiration
const setPasswordResetToken = async (userId, token, expires) => {
    const query = `UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3`;
    const values = [token, expires, userId];
    await pool.query(query, values);
};

// Reset user password
const resetPassword = async (token, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE password_reset_token = $2 AND password_reset_expires > CURRENT_TIMESTAMP RETURNING *`;
    const values = [hashedPassword, token];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

module.exports = {
    createUser,
    createCustomerDetails,
    findUserByEmail,
    setPasswordResetToken,
    resetPassword,
};
