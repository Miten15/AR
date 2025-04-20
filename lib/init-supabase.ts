import { supabase } from './supabase';
import { products } from '@/data/products';

/**
 * This script initializes your Supabase database with your product data.
 * Run this script once to populate your Supabase database after you've created
 * the products table in your Supabase project.
 */
async function initializeProducts() {
  console.log('Starting Supabase initialization...');
  
  try {
    // First check if products table exists and create it if not
    const { error: tableError } = await supabase.rpc('check_table_exists', { table_name: 'products' });
    
    if (tableError) {
      console.log('Creating products table...');
      const { error: createError } = await supabase.rpc('create_products_table');
      
      if (createError) {
        console.error('Error creating products table:', createError);
        return;
      }
    }
    
    console.log('Inserting products data...');
    
    // Insert products from our data file
    const { error: insertError } = await supabase
      .from('products')
      .upsert(
        products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          modelPath: product.modelPath,
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

// Uncomment to run initialization
// initializeProducts();

export { initializeProducts };