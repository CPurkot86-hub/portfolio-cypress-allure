// test-env.js
import * as dotenv from 'dotenv';
dotenv.config();

console.log('IA_API_KEY:', process.env.IA_API_KEY);
console.log('IA_API_URL:', process.env.IA_API_URL);
console.log('IA_MODEL:', process.env.IA_MODEL);
