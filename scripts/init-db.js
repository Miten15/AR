// This script initializes the Supabase database with product data
require('dotenv').config({ path: '.env.local' });
const { initializeProducts } = require('../lib/init-supabase.js');

console.log('Starting database initialization script...');
console.log('ENV variables loaded:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
});

// Run the initialization
initializeProducts()
  .then(() => {
    console.log('Database initialization complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
  });