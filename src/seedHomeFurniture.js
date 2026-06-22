require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
 {
  "name": "صالون دورتموند",
  "sku": "Sal-Dortmund",
  "customCode": "Sal-Dortmund",
  "category": "صالون",
  "price": 7399,
  "oldPrice": 10799,
  "discount": 31,
  "currency": "SAR",
  "viewsToday": 2,
  "deliveryTime": "45 - 60 يوم",
  "availability": "متوفر",
  "features": [
    "شامل التركيب",
    "منتج مميز",
    "جديد",
    "أفضل مبيعات"
  ],
  "description": "استمتع بالراحة والأناقة مع صالون دورتموند. يتميز بتصميم بسيط وهادئ بألوان متناسقة وأقمشة عالية الجودة، ليمنح غرفة المعيشة لمسة عصرية راقية ويوفر أقصى درجات الراحة للاستخدام اليومي.",
  "color": "كما هو موضح بالصورة",
  "image": "https://res.cloudinary.com/dv6fig2ci/image/upload/v1782147194/google_drive_z61Qct_pp2lll.jpg"
},{
  "name": "انتريه اليجانس",
  "sku": "LRR-ELEGNC",
  "customCode": "LRR-ELEGNC",
  "category": "انترية",
  "price": 7199,
  "oldPrice": 10599,
  "discount": 32.1,
  "currency": "SAR",
  "viewsToday": 2,
  "quantity": 1,
  "deliveryTime": "45 - 60 يوم",
  "availability": "متوفر",
  "features": [
    "شامل التركيب",
    "منتج مميز",
    "أفضل مبيعات"
  ],
  "description": "يمنح انتريه اليجانس منزلك أجواءً دافئة ومريحة بفضل تصميمه الأنيق والعصري. يجمع بين الراحة والجمال ليضيف لمسة من السحر والرقي إلى كل زاوية، مما يجعله خيارًا مثاليًا لغرف المعيشة الحديثة.",
  "color": "كما هو موضح بالصورة",
  "image": "https://res.cloudinary.com/dv6fig2ci/image/upload/v1782148491/Motivational-Instagram-Post-_1080-x-1080-px_-_10_drcuzy.png"
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
