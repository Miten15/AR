import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CuboidIcon as Cube, Scan, ShoppingCart } from "lucide-react"
import { Spotlight } from "@/components/ui/aceternity/spotlight"
import { Product, getProductById } from "@/data/products"
import { notFound } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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
    <div className="container py-8 text-slate-200">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to products
      </Link>
      <Spotlight className="rounded-md bg-slate-900 border border-slate-800">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-700">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square overflow-hidden rounded-md">
                        <Image 
                          src={image || "/placeholder.svg"} 
                          alt={`${product.name} - View ${index + 1}`} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover" 
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-2xl font-bold mt-2 mb-4 text-green-400">${product.price.toFixed(2)}</p>
            <p className="text-slate-300 mb-4">{product.description}</p>
            <div className="grid gap-4 mb-6">
              <h3 className="font-semibold text-white">Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 grid gap-4">
              <h3 className="font-semibold text-white">Specifications:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm border rounded-md p-4 border-slate-700 bg-slate-800/50">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="contents">
                    <span className="text-slate-400">{key}</span>
                    <span className="text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" asChild className="flex-1 border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-blue-950">
                <Link href={`/product/${product.id}/ar`}>
                  <Scan className="mr-2 h-4 w-4" /> View in AR
                </Link>
              </Button>
              <Button variant="secondary" asChild className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200">
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
