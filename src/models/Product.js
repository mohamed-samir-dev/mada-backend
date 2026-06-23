const mongoose = require('mongoose');
const slugify = require('slugify');

const ALLOWED_CATEGORIES = ['laptops', 'tvs', 'printers', 'cameras', 'accessories', 'home_devices', 'air_conditioners', 'pillows', 'furniture', 'pillows_bedding', 'صالون', 'انترية', 'بكجات'];

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'اسم المنتج مطلوب'], trim: true },
  slug: { type: String, unique: true, index: true },
  description: { type: String, trim: true },
  price: { type: Number, required: [true, 'السعر مطلوب'], min: 0 },
  oldPrice: { type: Number, min: 0 },
  category: {
    type: String,
    required: [true, 'التصنيف مطلوب'],
    enum: { values: ALLOWED_CATEGORIES, message: 'تصنيف غير مسموح. الموبايلات غير متاحة' }
  },
  brand: { type: String, trim: true },
  sku: { type: String, trim: true },
  discount: { type: Number, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  images: [String],
  badges: [String],
  delivery: { type: String, trim: true },
  deliveryTime: { type: String, trim: true },
  availability: { type: String, trim: true },
  warranty: { type: String, trim: true },
  customCode: { type: String, trim: true },
  currency: { type: String, trim: true },
  viewsToday: { type: Number, default: 0 },
  color: { type: String, trim: true },
  image: { type: String, trim: true },
  quantity: { type: Number, min: 0 },
  shortDescription: { type: String, trim: true },
  overview: { type: String, trim: true },
  features: [String],
  specs: { type: mongoose.Schema.Types.Mixed },
  careInstructions: [String],
  reviews: {
    rating: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false }
}, { timestamps: true });

// Auto-generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const base = slugify(this.name, { lower: true, strict: true }) || Date.now().toString();
    this.slug = base + '-' + Date.now();
  }
  next();
});

// Prevent "mobiles" category
productSchema.pre('validate', function (next) {
  if (this.category && this.category.toLowerCase().includes('mobile')) {
    return next(new Error('الموبايلات غير متاحة في هذا المتجر'));
  }
  next();
});

// Indexes for performance
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
