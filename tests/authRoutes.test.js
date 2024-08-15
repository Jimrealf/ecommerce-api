const request = require('supertest');
const app = require('../app');
const pool = require('../models/db');

afterAll(() => {
    // Close the database connection after all tests are done
    return pool.end();
});

describe('POST /api/auth/register/customer', () => {
    it('should register a new customer', async () => {
        const response = await request(app)
            .post('/api/auth/register/customer')
            .send({
                email: 'newcustomer@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
                shippingAddress: '123 Main St, Anytown, USA',
                billingAddress: '456 Elm St, Anytown, USA',
                preferredPaymentMethod: 'credit_card',
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty(
            'message',
            'Customer registered successfully'
        );
        expect(response.body.user).toHaveProperty(
            'email',
            'newcustomer@example.com'
        );
    });

    it('should not register a customer with an existing email', async () => {
        const response = await request(app)
            .post('/api/auth/register/customer')
            .send({
                email: 'newcustomer@example.com', // Use the same email to trigger the error
                password: 'password123',
                firstName: 'Jane',
                lastName: 'Doe',
                phoneNumber: '0987654321',
                shippingAddress: '789 Maple St, Anytown, USA',
                billingAddress: '101 Pine St, Anytown, USA',
                preferredPaymentMethod: 'paypal',
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Email already exists');
    });
});

describe('POST /api/auth/login/customer', () => {
    it('should log in an existing customer', async () => {
        const response = await request(app)
            .post('/api/auth/login/customer')
            .send({
                email: 'newcustomer@example.com',
                password: 'password123',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('token'); // Check that a JWT token is returned
    });

    it('should not log in with wrong credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login/customer')
            .send({
                email: 'newcustomer@example.com',
                password: 'wrongpassword',
            });

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty(
            'message',
            'Wrong username/password'
        );
    });
});
