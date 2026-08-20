import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const SHIPPING_COST = 0;

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((p) => [p.id, p]));

  const orderItems = items.map(({ product: productId, quantity }) => {
    const product = productMap.get(productId);
    if (!product) {
      throw new ApiError(400, `Product ${productId} not found`);
    }
    return {
      product: product.id,
      name: product.name,
      image: product.images?.[0],
      price: product.price,
      quantity,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingCost: SHIPPING_COST,
    total,
    paymentMethod: 'mock',
    paymentStatus: 'paid',
  });

  res.status(201).json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ orders });
});

export const getMyOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  if (order.user.toString() !== req.user.id) {
    throw new ApiError(403, 'Not authorized to view this order');
  }
  res.json({ order });
});
