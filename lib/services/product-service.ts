import { Product, PRODUCTS, getProductById, getAllProducts, getRelatedProducts } from '../data/products'

// Data service layer - this abstraction will make it easy to switch to database later
export class ProductService {
  
  // Get all products
  static async getProducts(): Promise<Product[]> {
    // In the future, this will be: return await db.products.findMany()
    return Promise.resolve(getAllProducts())
  }

  // Get product by ID
  static async getProduct(id: string): Promise<Product | null> {
    // In the future, this will be: return await db.products.findUnique({ where: { id } })
    const product = getProductById(id)
    return Promise.resolve(product || null)
  }

  // Get related products
  static async getRelatedProducts(currentProductId: string, limit: number = 3): Promise<Product[]> {
    // In the future, this will be a more sophisticated query with categories, tags, etc.
    return Promise.resolve(getRelatedProducts(currentProductId, limit))
  }

  // Search products by name or description
  static async searchProducts(query: string): Promise<Product[]> {
    // In the future, this will be: return await db.products.findMany({ where: { OR: [{ name: { contains: query } }, { description: { contains: query } }] } })
    const lowercaseQuery = query.toLowerCase()
    const filteredProducts = PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    )
    return Promise.resolve(filteredProducts)
  }

  // Get products by category
  static async getProductsByCategory(category: string): Promise<Product[]> {
    // In the future, this will be: return await db.products.findMany({ where: { category } })
    const filteredProducts = PRODUCTS.filter(product => product.category === category)
    return Promise.resolve(filteredProducts)
  }

  // Get featured products (first 3 for now)
  static async getFeaturedProducts(limit: number = 3): Promise<Product[]> {
    // In the future, this will be: return await db.products.findMany({ where: { featured: true }, take: limit })
    return Promise.resolve(PRODUCTS.slice(0, limit))
  }
}
