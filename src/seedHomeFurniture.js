require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [{
  name: 'مكتب زاوية خشب 140 سم - بيج',
  sku: 'MBA22-10014 BEIGE',
  customCode: 'MBA22-10014 BEIGE',

  price: 1000,
  oldPrice: 1333,
  discount: 25,
  currency: 'SAR',

  category: 'furniture',
  stock: 50,

  isFeatured: false,
  isBestSeller: false,

  shortDescription: 'مكتب زاوية خشبي عملي بثلاث وحدات يوفر مساحة عمل منظمة ومريحة للمنزل أو المكتب ✨',

  description: `مكتب زاوية خشبي عملي بتصميم أنيق مكون من 3 قطع متكاملة يوفر لك مساحة عمل منظمة واحترافية 🖥️

يتكون من مكتب رئيسي واسع، ووحدة أدراج متحركة، ووحدة جانبية مزودة برفوف للتخزين، مما يساعدك على ترتيب ملفاتك وأدواتك بسهولة 📁

تصميمه الذكي يوفر مساحة كبيرة للعمل مع الحفاظ على التنظيم وتقليل الفوضى، مع فتحات لإدارة الأسلاك بشكل مرتب ⚡

مناسب للمكاتب المنزلية أو الشركات ويجمع بين العملية والمتانة والشكل العصري الأنيق ✨`,

  specs: {
    desk: {
      length: '140 سم',
      depth: '70 سم',
      height: '76 سم'
    }
  },

  features: [
    'تصميم زاوية عملي مكون من 3 قطع',
    'سطح مكتب واسع ومريح للعمل',
    'وحدة أدراج متحركة على عجلات',
    'وحدة جانبية للتخزين والرفوف',
    'فتحات لتنظيم وتمرير الأسلاك',
    'خامات خشبية متينة وعمر استخدام طويل'
  ],

  reviews: {
    rating: 0,
    count: 0
  },

  images: [
    'https://res.cloudinary.com/dv6fig2ci/image/upload/v1782258693/Screenshot_2026-06-24_024937_fotdzb.png',
  ]
}];


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
