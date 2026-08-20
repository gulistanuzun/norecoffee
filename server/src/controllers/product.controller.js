import { Product } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const SORT_MAP = {
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  newest: { createdAt: -1 },
};

export const getProducts = asyncHandler(async (req, res) => {
  const { roast, origin, minPrice, maxPrice, search, sort, page = 1, limit = 12 } = req.query;

  const filter = {};
  if (roast) filter.roastLevel = roast;
  if (origin) filter.origin = { $regex: origin, $options: 'i' };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) filter.$text = { $search: search };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(SORT_MAP[sort] || { createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    products,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum) || 1,
  });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  res.json({ product });
});
