const Order = require('../models/Order');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/orders - guest checkout
exports.createOrder = asyncHandler(async (req, res) => {
  const { customerName, phone, address, notes, items } = req.body;

  if (!items || items.length === 0) throw new AppError('يرجى إضافة منتجات للطلب', 400);

  // Validate stock and calculate total server-side
  let totalPrice = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new AppError(`المنتج غير موجود: ${item.productId}`, 404);
    if (product.stock < item.quantity) {
      throw new AppError(`المنتج "${product.name}" غير متوفر بالكمية المطلوبة. المتاح: ${product.stock}`, 400);
    }

    orderItems.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    });
    totalPrice += product.price * item.quantity;

    // Decrease stock
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    customerName,
    phone,
    address,
    notes,
    items: orderItems,
    totalPrice,
    paymentMethod: 'cash_on_delivery'
  });

  res.status(201).json({ success: true, message: 'تم إنشاء الطلب بنجاح', data: order });
});

// GET /api/orders (admin)
exports.getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    Order.countDocuments(filter)
  ]);

  res.json({
    success: true,
    message: 'تم جلب الطلبات',
    data: orders,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) }
  });
});

// GET /api/orders/:id (admin)
exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).lean();
  if (!order) throw new AppError('الطلب غير موجود', 404);
  res.json({ success: true, message: 'تم جلب الطلب', data: order });
});

// PUT /api/orders/:id/status (admin)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) throw new AppError('حالة غير صالحة', 400);

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) throw new AppError('الطلب غير موجود', 404);
  res.json({ success: true, message: 'تم تحديث حالة الطلب', data: order });
});
