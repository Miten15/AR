"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scan, CuboidIcon as Cube } from "lucide-react"
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card"
import ModelViewer from "@/components/model-viewer"
import { Product } from "@/lib/data/products"
import { ProductService } from "@/lib/services/product-service"
import { useEffect, useState } from "react"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const products = await ProductService.getRelatedProducts(currentProductId, 3)
        setRelatedProducts(products)
      } catch (error) {
        console.error('Error fetching related products:', error)
        setRelatedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId])

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <CardContainer key={product.id} className="w-full">
            <CardBody className="w-full h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-0">
              <Card className="w-full overflow-hidden border-0 shadow-none">
                <CardContent className="p-0">
                  <CardItem translateZ="100" className="w-full">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardItem>                  <CardItem translateZ="50" className="w-full">
                    <div className="h-[200px] w-full">
                      <ModelViewer modelPath={product.modelPath} className="h-full" zoom={4} autoRotate />
                    </div>
                  </CardItem>
                </CardContent>
                <CardContent className="p-6">
                  <CardItem translateZ="50" className="w-full">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                    <p className="font-bold text-lg mt-2">{product.price}</p>
                  </CardItem>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                  <CardItem translateZ="100" className="w-full">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600"
                    >
                      <Link href={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full flex gap-2">
                    <Button variant="outline" asChild className="w-1/2">
                      <Link href={`/product/${product.id}/ar`}>
                        <Scan className="mr-2 h-4 w-4" /> AR
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-1/2">
                      <Link href={`/product/${product.id}/3d`}>
                        <Cube className="mr-2 h-4 w-4" /> 3D
                      </Link>
                    </Button>
                  </CardItem>
                </CardFooter>
              </Card>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}
