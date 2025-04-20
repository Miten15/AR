const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read products from data file
const productsFilePath = path.join(__dirname, '../data/products.ts');
const productsFileContent = fs.readFileSync(productsFilePath, 'utf8');
const productsTsContent = productsFileContent.split('export const products: Product[] = ')[1];
const productsArrayString = productsTsContent.split('];')[0] + ']';
const products = eval('(' + productsArrayString + ')');

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * This script initializes your Supabase database with your product data.
 * Run this script once to populate your Supabase database after you've created
 * the products table in your Supabase project.
 */
async function initializeProducts() {
  console.log('Starting Supabase initialization...');
  console.log('Supabase URL:', supabaseUrl);
  console.log('Products found:', products.length);
  
  try {
    // Insert products from our data file
    console.log('Inserting products data...');
    const { error: insertError } = await supabase
      .from('products')
      .upsert(
        products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          model_path: product.modelPath, // Convert camelCase to snake_case for PostgreSQL
          images: product.images,
          features: product.features,
          specs: product.specs
        })),
        { onConflict: 'id' }
      );
    
    if (insertError) {
      console.error('Error inserting products:', insertError);
      return;
    }
    
    console.log('Successfully initialized Supabase with product data!');
  } catch (error) {
    console.error('Unexpected error during initialization:', error);
  }
}

module.exports = { initializeProducts };