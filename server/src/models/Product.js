import mongoose from 'mongoose';

const weightOptionSchema = new mongoose.Schema(
  {
    grams: { type: Number, required: true },
    priceModifier: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    roastLevel: {
      type: String,
      enum: ['light', 'medium', 'medium-dark', 'dark'],
      required: true,
    },
    tastingNotes: [{ type: String }],
    process: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },
    weightOptions: [weightOptionSchema],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ roastLevel: 1 });
productSchema.index({ name: 'text', description: 'text', origin: 'text' });

export const Product = mongoose.model('Product', productSchema);
