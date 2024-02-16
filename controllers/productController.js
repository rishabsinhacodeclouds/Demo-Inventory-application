const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, variants } = req.body;
        const product = new Product({ name, variants, status: 'Available' });
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update the product by product id
const updateProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const productId = req.params.id;

        // console.log(productId);

        const product = await Product.findByIdAndUpdate(productId, { name }, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update the variant by variant id
const updateVariant = async (req, res) => {
    try {
        const { name, quantity, status, price} = req.body;
        const productId = req.params.id;
        const variantId = req.params.variantid;

        // console.log(productId, variantId);

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const variant = product.variants.id(variantId);

        if (!variant) {
            return res.status(404).json({ error: 'Variant not found' });
        }

        variant.name = name || variant.name;
        variant.quantity = quantity || variant.quantity;
        variant.status = status || variant.status;
        variant.price = price || variant.price;
        
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });

        res.json({ message: 'Variant updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    updateVariant
};
