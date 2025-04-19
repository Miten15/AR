import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CuboidIcon as Cube, Scan, ShoppingCart } from "lucide-react"
import { Spotlight } from "@/components/ui/aceternity/spotlight"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, you would fetch this data from an API or database
  const product = {
    id: params.id,
    name: "Track Spot Light",
    description:
      "Experience premium lighting with our Track Spot Light. Designed for versatility and style, this adjustable light fixture adds a modern touch to any space while providing focused illumination exactly where you need it.",
    longDescription:
      "Our Track Spot Light is crafted from high-quality materials, ensuring durability and longevity. The sleek design complements any interior style, from contemporary to industrial. The adjustable head allows you to direct light precisely where needed, making it perfect for highlighting artwork, architectural features, or work areas. Available in multiple finishes to match your existing decor and fixtures.",
    image: "/placeholder.svg?height=600&width=600",
    price: "$129",
    features: [
      "Adjustable head for directional lighting",
      "Energy-efficient LED bulb included",
      "Easy installation on standard track systems",
      "Dimmable with compatible switches",
      "2-year warranty",
    ],
  }

  return (
    <div className="container py-8">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to products
      </Link>
      <Spotlight className="rounded-md">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2 mb-4">{product.price}</p>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="grid gap-4 mb-6">
              <h3 className="font-semibold">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <p className="text-muted-foreground mb-6">{product.longDescription}</p>
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
