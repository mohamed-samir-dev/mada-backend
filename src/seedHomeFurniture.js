require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');


const products = [
  {
    name: 'خزانة متعدد الاستخدام مقاس 105×110 سم - خشبي بيج',
    sku: 'MBA10-BF-08 WOOD 110*105',
    customCode: 'MBA10-BF-08 WOOD 110*105',

    price: 645,
    oldPrice: 860,
    discount: 25,
    currency: 'SAR',

    category: 'furniture',
    stock: 50,

    isFeatured: true,
    isBestSeller: false,

    shortDescription: 'خزانة أنيقة متعددة الاستخدام بتصميم مودرن تجمع بين الخشب والبيج لتنظيم مثالي لمساحتك ✨',

    description: `خزانة مودرن متعددة الاستخدام بتصميم أنيق يجمع بين اللون البيج الدافئ والسطح الخشبي الطبيعي 🪵✨

تتميز بثلاثة أبواب زجاجية مضلعة طويلة تمنحها شكل راقٍ وتخفي المحتويات بشكل مرتب ومنظم، لتناسب مختلف الاستخدامات في المنزل 🏡

يمكن استخدامها كمخزن للأواني في المطبخ، أو بوفيه لغرفة الطعام، أو خزانة تنظيم للأغراض العامة أو ركن قهوة أنيق ☕

تصميم عملي يجمع بين المتانة والجمال مع مساحة تخزين كبيرة تناسب الاستخدام اليومي`,

    specs: {
      cabinet: {
        width: '105 سم',
        depth: '35 سم',
        height: '110 سم'
      }
    },

    features: [
      'تصميم مودرن أنيق يجمع بين الخشب والبيج',
      '3 أبواب زجاجية مضلعة طويلة',
      'استخدامات متعددة (مطبخ - غرفة طعام - تخزين)',
      'سطح خشبي قوي يتحمل الأغراض الثقيلة',
      'سهل التنظيف ومتين للاستخدام اليومي'
    ],

    reviews: {
      rating: 0,
      count: 0
    },

    images: [
      'https://res.cloudinary.com/dv6fig2ci/image/upload/v1782259250/Screenshot_2026-06-24_025931_dtcm1y.png'
    ]
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
