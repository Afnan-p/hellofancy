import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
console.log('xss-clean:', typeof xss);
console.log('express-mongo-sanitize:', typeof mongoSanitize);
