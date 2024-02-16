const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const Refund = require('../models/refundModel');

const placeOrder = async (req, res) => {
  try {
    const { productId, variant, quantity, customerId } = req.body;
    // console.log(customerId);
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const selectedVariant = product.variants.find((v) => v.name === variant);

    if (!selectedVariant || selectedVariant.quantity < quantity) {
      return res.status(200).json({ message: 'Insufficient stock' });
    }

    // Calculate totalprice
    const totalprice = selectedVariant.price * quantity;

    // Decrease the quantity
    selectedVariant.quantity -= quantity;

    // Update the variant status
    product.variants.forEach((v) => {
      v.status = v.quantity === 0 ? 'Out-of-Stock' : 'Available';
    });

    // Save changes to the product
    await product.save();

    // Create a new order
    const order = new Order({ product: productId, variant, quantity, totalprice, customer: customerId });
    await order.save();

    // Add order details to order history
    // product.orderHistory.push({
    //   orderId: order._id,
    //   customerInfo,
    //   quantity,
    // });

    // Save changes to the product
    await product.save();

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const processReturn = async (req, res) => {
  try {
    const { orderId, returnedQuantity } = req.body;

    // Find the order
    const order = await Order.findById(orderId).populate('customer');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Find the corresponding product and variant
    const product = await Product.findById(order.product);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const variant = product.variants.find((v) => v.name === order.variant);

    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    // Calculate refund amount
    const refundAmount = variant.price * returnedQuantity;

    // Increase the quantity of the returned variant
    variant.quantity += returnedQuantity;

    // Update variant status based on quantity
    variant.status = variant.quantity === 0 ? 'Out-of-Stock' : 'Available';

    // Save changes to the product
    await product.save();

    const refund = new Refund({
      order: orderId,
      customer: order.customer,
      refundedQuantity: returnedQuantity,
      refundAmount,
    });

    await refund.save();

    res.json({ message: 'Return processed successfully', refundAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getOrderHistory = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     const orderHistory = product.orderHistory;
//     res.json(orderHistory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  placeOrder,
  processReturn
};
