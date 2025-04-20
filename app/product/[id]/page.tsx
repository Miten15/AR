import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CuboidIcon as Cube, Scan, ShoppingCart } from "lucide-react"
import { Spotlight } from "@/components/ui/aceternity/spotlight"
import { Product, getProductById } from "@/data/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

// This function will be executed on the server
async function getProduct(id: string): Promise<Product> {
  // When running on the server, we can directly use the getProductById function
  // In a real app with a database, you'd make a database query here
  const product = getProductById(id)
  
  if (!product) {
    notFound()
  }
  
  return product
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to products
      </Link>
      <Spotlight className="rounded-md">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image 
              src={product.images[0] || "/placeholder.svg"} 
              alt={product.name} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="grid gap-4 mb-6">
              <h3 className="font-semibold">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href={`/product/${product.id}/ar`}>
                  <Scan className="mr-2 h-4 w-4" /> View in AR
                </Link>
              </Button>
              <Button variant="secondary" asChild className="flex-1">
                <Link href={`/product/${product.id}/3d`}>
                  <Cube className="mr-2 h-4 w-4" /> View 3D Model
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Spotlight>
    </div>
  )
}
