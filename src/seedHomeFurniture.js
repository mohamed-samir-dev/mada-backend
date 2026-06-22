require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
  name: 'خدادية إس بي 4 لاتكس - وسائد غرف شباب وبنات',
  sku: 'P-B-G-Sb4',
  price: 3202,
  oldPrice: 4640,
  discount: 31,
  category: 'pillows_bedding',
  brand: 'SB4',
  stock: 15,

  images: [
    'https://res.cloudinary.com/dv6fig2ci/image/upload/v1782147043/google_drive_pYFUE3_i44kb0.jpg'
  ],

  badges: ['منتج مميز', 'جديد', 'أفضل مبيعات'],

  delivery: '7 - 14 يوم',
  warranty: 'ضمان ضد عيوب الصناعة',

  shortDescription:
    'خدادية لاتكس طبيعية من إس بي 4 توفر دعماً مثالياً للرقبة وتخفف آلامها، مع تهوية ممتازة وغطاء قطني مصري قابل للغسيل.',

  overview:
    'خدادية إس بي 4 لاتكس مصممة لتوفير راحة عالية ودعم صحي للرقبة والعمود الفقري، مع تقليل التعرق بفضل فتحات التهوية ومادة اللاتكس الطبيعية.',

  features: [
    'لاتكس طبيعي لدعم الرقبة وتقليل الألم',
    'فتحات تهوية لتقليل التعرق',
    'غطاء قطني مصري ناعم وقابل للإزالة والغسيل',
    'مضادة للحساسية',
    'عمر افتراضي طويل'
  ],

  specs: {
    style: 'مودرن',
    type: 'Latex Pillow',
    size: '45 × 70 سم',
    thickness: '23 (حسب المواصفات المذكورة)',
    quantity: 1
  },

  careInstructions: [
    'استخدم غطاء واقي للحفاظ على النظافة',
    'تهوية الوسادة بشكل منتظم',
    'غسل الغطاء حسب التعليمات',
    'تجنب التعرض المباشر للشمس لفترات طويلة',
    'تخزينها في مكان جاف ونظيف'
  ],

  reviews: {
    rating: 0,
    count: 0
  }
}
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const product of products) {
      await Product.deleteOne({ name: product.name });
      await Product.create(product);
      console.log('✅ Added:', product.name);
    }

    console.log(`\nDone! Added ${products.length} home furniture products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

run();
