// Product data structure - designed to easily migrate to database later
export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: string
  image: string
  modelPath: string
  category: string
  features: string[]
  specifications: {
    [key: string]: string
  }
  tags?: string[]
  formats: string[]
  rating?: number
  reviewCount?: number
}

// Local product data - this will be replaced with database calls later
export const PRODUCTS: Product[] = [  {
    id: "anoli-3-pendant-lamp",
    name: "Anoli 3 Pendant Lamp",
    description: "Modern three-light pendant lamp with sleek design, perfect for dining areas and kitchen islands. Features adjustable height and contemporary styling.",
    longDescription: "Transform your dining space with this stunning three-light pendant lamp that combines modern aesthetics with functional lighting. The Anoli 3 features adjustable hanging heights, making it perfect for kitchen islands, dining tables, or any space requiring focused illumination. Each light can be positioned independently, creating a dynamic and customizable lighting arrangement.",
    price: "₹2999",
    image: "/images/anoli_3_pendant_lamp_3ds.jpg",
    modelPath: "/models/anoli_3_pendant_lamp_3ds_max_file_drcg.glb",
    category: "Pendant Lights",
    features: [
      "Adjustable height",
      "Three-light configuration", 
      "Modern design",
      "Energy efficient LED compatible"
    ],
    specifications: {
      "Material": "Metal and Glass",
      "Finish": "Matte Black",
      "Dimensions": "L: 24\" x W: 8\" x H: 12\"",
      "Bulb Type": "E26 (not included)",
      "Max Wattage": "60W per bulb",
      "Cord Length": "6 feet"
    },
    tags: ["Pendant", "Modern", "Three-Light", "Adjustable", "Kitchen", "Dining"],
    formats: ["GLB", "USDZ", "3DS Max"],
    rating: 4.5,
    reviewCount: 12
  },  {
    id: "tiffany-lamp",
    name: "Classic Tiffany Table Lamp",
    description: "Elegant stained glass table lamp with intricate patterns and warm ambient lighting. A timeless piece that adds character to any room.",
    longDescription: "This exquisite Tiffany-style table lamp brings the beauty of stained glass art into your home. Handcrafted with intricate patterns and warm colors, it creates a cozy ambiance perfect for reading nooks, bedside tables, or living room accent lighting. The solid bronze base provides stability while complementing the vintage aesthetic.",
    price: "₹1899",
    image: "/images/tiffany_lamp.jpg", 
    modelPath: "/models/tiffany_lamp.glb",
    category: "Table Lamps",
    features: [
      "Hand-crafted stained glass",
      "Vintage-inspired design",
      "Warm ambient lighting",
      "Solid bronze base"
    ],
    specifications: {
      "Material": "Stained Glass and Bronze",
      "Finish": "Antique Bronze",
      "Dimensions": "W: 16\" x H: 22\"",
      "Bulb Type": "E26 (included)",
      "Max Wattage": "75W",
      "Shade Diameter": "16 inches"
    },
    tags: ["Tiffany", "Stained Glass", "Vintage", "Table Lamp", "Bronze", "Decorative"],
    formats: ["GLB", "USDZ"],
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: "triple-ceiling-hanging-lamp",
    name: "Triple Ceiling Hanging Lamp",
    description: "Contemporary triple hanging light fixture with geometric design. Perfect for modern spaces requiring focused task lighting.",
    price: "₹3499",
    image: "/images/Triple ceiling hanging lamp.jpg",
    modelPath: "/models/triple_ceiling_hanging_lamp.glb",
    category: "Ceiling Lights",
    features: [
      "Triple light configuration",
      "Geometric modern design",
      "Adjustable hanging height",
      "Directional lighting"
    ],
    specifications: {
      "Material": "Aluminum and Steel",
      "Finish": "Brushed Steel",
      "Dimensions": "L: 36\" x W: 12\" x H: 18\"",
      "Bulb Type": "GU10 (included)",
      "Max Wattage": "50W per bulb",
      "Installation": "Ceiling mount"
    },
    formats: []
  }
]

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id)
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return PRODUCTS
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(product => product.category === category)
}

// Helper function to get related products (excluding current product)
export function getRelatedProducts(currentProductId: string, limit: number = 3): Product[] {
  return PRODUCTS.filter(product => product.id !== currentProductId).slice(0, limit)
}
