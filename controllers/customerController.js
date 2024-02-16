const Customer = require('../models/customerModel');

const createCustomer = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer already exists with this email' });
        }

        const customer = new Customer({ name, email, address });
        await customer.save();

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
};