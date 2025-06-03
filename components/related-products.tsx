"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scan, CuboidIcon as Cube } from "lucide-react"
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card"
import { Product } from "@/lib/data/products"
import { ProductService } from "@/lib/services/product-service"
import { useEffect, useState } from "react"

interface RelatedProductsProps {
  currentProductId: string
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {      try {
        const products = await ProductService.getRelatedProducts(currentProductId, 3)
        setRelatedProducts(products)
        setError(null)
      } catch (error) {
        console.error('Error fetching related products:', error)
        setError('Failed to load related products')
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
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl border">
              <div className="bg-gray-300 dark:bg-gray-700 aspect-square rounded-t-xl"></div>
              <div className="space-y-2 p-4">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-3"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No related products found.</p>
        </div>
      </div>
    )
  }

  return (    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <CardContainer key={product.id} className="w-full">
            <CardBody className="w-full h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-0 hover:shadow-lg transition-shadow duration-300">
              <Card className="w-full overflow-hidden border-0 shadow-none">                <CardContent className="p-0">                  <CardItem translateZ="100" className="w-full">
                    <div className="relative aspect-square overflow-hidden group">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  </CardItem>
                </CardContent>                <CardContent className="p-4">
                  <CardItem translateZ="50" className="w-full">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{product.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xl text-blue-600">{product.price}</p>
                      <div className="text-xs text-green-600 font-medium">Free Ship</div>
                    </div>
                  </CardItem>
                </CardContent>                <CardFooter className="flex flex-col gap-2 p-4 pt-0">
                  <CardItem translateZ="100" className="w-full">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 font-medium"
                    >
                      <Link href={`/product/${product.id}`}>View Details</Link>
                    </Button>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full flex gap-2">
                    <Button variant="outline" asChild className="w-1/2 text-sm">
                      <Link href={`/product/${product.id}/ar`}>
                        <Scan className="mr-1 h-4 w-4" /> AR View
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-1/2 text-sm">
                      <Link href={`/product/${product.id}/3d`}>
                        <Cube className="mr-1 h-4 w-4" /> 3D View
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
