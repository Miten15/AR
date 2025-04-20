export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  modelPath: string;
  images: string[];
  features: string[];
  specs: {
    [key: string]: string;
  };
}

export const products: Product[] = [
  {
    id: "track-spot-light",
    name: "Track Spot Light",
    description: "Adjustable LED track lighting with modern design for home or office use.",
    price: 79.99,
    modelPath: "/models/track-spot.glb",
    images: ["/images/track-spot-1.jpg", "/images/track-spot-2.jpg"],
    features: [
      "Adjustable direction",
      "Dimmable LED",
      "Energy efficient",
      "Easy installation"
    ],
    specs: {
      "Wattage": "15W",
      "Color Temperature": "3000K-5000K",
      "Lumens": "1200lm",
      "Dimensions": "5.5\" x 3.2\" x 7.8\""
    }
  },
  {
    id: "pendant-light",
    name: "Modern Pendant Light",
    description: "Elegant hanging pendant light with minimalist design for dining areas and entryways.",
    price: 129.99,
    modelPath: "/models/pendant-light.glb",
    images: ["/images/pendant-1.jpg", "/images/pendant-2.jpg"],
    features: [
      "Adjustable height",
      "Dimmable",
      "Contemporary design",
      "Warm light output"
    ],
    specs: {
      "Wattage": "12W",
      "Color Temperature": "2700K",
      "Lumens": "950lm",
      "Dimensions": "12\" diameter x 15\" height"
    }
  },
  {
    id: "floor-lamp",
    name: "Arc Floor Lamp",
    description: "Curved architectural floor lamp with marble base, perfect for living room corners.",
    price: 189.99,
    modelPath: "/models/floor-lamp.glb",
    images: ["/images/floor-lamp-1.jpg", "/images/floor-lamp-2.jpg"],
    features: [
      "Marble base",
      "Stainless steel arc",
      "Fabric shade",
      "Foot switch"
    ],
    specs: {
      "Wattage": "18W",
      "Color Temperature": "3000K",
      "Lumens": "1500lm",
      "Dimensions": "68\" height x 45\" reach"
    }
  },
  {
    id: "table-lamp",
    name: "Space Explorer Table Lamp",
    description: "Unique astronaut-themed table lamp for a futuristic accent to any room.",
    price: 149.99,
    modelPath: "/models/table-lamp.glb",
    images: ["/images/placeholder.jpg", "/images/placeholder.jpg"],
    features: [
      "Novelty design",
      "Touch-sensitive controls",
      "Multiple lighting modes",
      "USB charging port"
    ],
    specs: {
      "Wattage": "10W",
      "Color Temperature": "3000K-6000K (adjustable)",
      "Lumens": "800lm",
      "Dimensions": "10\" x 8\" x 15\""
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
