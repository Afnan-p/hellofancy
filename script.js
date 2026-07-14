const fs = require('fs');

let shop = fs.readFileSync('frontend/src/pages/Shop.jsx', 'utf8');
shop = shop.replace(/<motion\.div layout className=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8\">/g, '<div className=\"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8\">');
shop = shop.replace(/<AnimatePresence>/g, '');
shop = shop.replace(/<\/AnimatePresence>/g, '');
shop = shop.replace(/<\/motion\.div>\s*\}\)\}\s*<\/div>/g, '</div>\n                ))}\n            </div>');
shop = shop.replace(/<motion\.div[\s\S]*?layout[\s\S]*?initial=\{[\s\S]*?transition=\{[\s\S]*?key=\{product\.id\}/g, '<div key={product.id}');
shop = shop.replace(/transition-all duration-500 relative/g, 'active:scale-[0.98] transition-all duration-300 relative');
shop = shop.replace(/<\/motion\.div>/g, '</div>');
fs.writeFileSync('frontend/src/pages/Shop.jsx', shop);

let offers = fs.readFileSync('frontend/src/pages/Offers.jsx', 'utf8');
offers = offers.replace(/<AnimatePresence>/g, '');
offers = offers.replace(/<\/AnimatePresence>/g, '');
offers = offers.replace(/<motion\.div[\s\S]*?layout[\s\S]*?initial=\{[\s\S]*?transition=\{[\s\S]*?key=\{product\.id\}/g, '<div key={product.id}');
offers = offers.replace(/transition-all duration-500 relative/g, 'active:scale-[0.98] transition-all duration-300 relative');
offers = offers.replace(/<\/motion\.div>/g, '</div>');
fs.writeFileSync('frontend/src/pages/Offers.jsx', offers);

let cats = fs.readFileSync('frontend/src/pages/Categories.jsx', 'utf8');
cats = cats.replace(/<motion\.div[\s\S]*?variants=\{staggerContainer\}[\s\S]*?className=\"grid/g, '<div className=\"grid');
cats = cats.replace(/<motion\.div variants=\{fadeInUp\} key=\{cat\.id \|\| cat\.name\}>/g, '<div key={cat.id || cat.name}>');
cats = cats.replace(/hover:-translate-y-1 transition-all/g, 'active:scale-[0.98] transition-all');
cats = cats.replace(/<\/motion\.div>/g, '</div>');
fs.writeFileSync('frontend/src/pages/Categories.jsx', cats);

console.log('Optimized successfully!');
