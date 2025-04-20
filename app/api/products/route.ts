import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error('Supabase client not initialized - missing environment variables');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    // Query products from Supabase
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    // Convert snake_case to camelCase for frontend
    const products = dbProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      modelPath: product.model_path, // Convert snake_case to camelCase
      images: product.images,
      features: product.features,
      specs: product.specs
    }));
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}