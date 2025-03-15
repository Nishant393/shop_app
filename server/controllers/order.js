import { Address } from "../models/address.js";
import { Cart } from "../models/cart.js";


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {  cartId, address, paymentMode, customerNotes } = req.body;
    const userId = req.user;
  
    const cart = await Cart.findById(cartId);

    const userAddress = Address.findById(address);

    
    
    console.log(cart)
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const subtotal = cart.totalPrice;
    const discount = cart.discount || 0;
    const shippingCost = subtotal > 500 ? 0 : 50; 
    const total = subtotal - discount + shippingCost;

    const newOrder = new Order({
      user: userId,
      cart: cartId,
      userAddress,
      status: "Pending",
      paymentMode,
      subtotal,
      discount,
      shippingCost,
      total,
      customerNotes,
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("user cart");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, updatedBy } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    order.updatedBy = updatedBy;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }
    
    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user cart").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
