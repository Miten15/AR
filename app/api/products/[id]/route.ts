import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from params - no need to await params.id in this case
    const { id } = params;
    
    // Query a specific product from Supabase
    const { data: dbProduct, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Convert snake_case to camelCase for frontend
    const product = {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price,
      modelPath: dbProduct.model_path, // Convert snake_case to camelCase
      images: dbProduct.images,
      features: dbProduct.features,
      specs: dbProduct.specs
    };
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}