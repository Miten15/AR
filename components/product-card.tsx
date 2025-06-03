"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CuboidIcon as Cube, Scan } from "lucide-react"
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card"
import MiniModelViewer from "@/components/mini-model-viewer"
import { Product } from "@/lib/data/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <CardContainer className="w-full">
      <CardBody className="w-full h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-0">
        <Card className="w-full overflow-hidden border-0 shadow-none flex flex-col">
          <CardHeader className="p-0 relative">
            <CardItem translateZ="100" className="w-full">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover rounded-t-xl" />
              </div>
            </CardItem>
            {/* Optional: Overlay AR button on image if desired for extreme compactness */}
            {/* <CardItem translateZ="120" className="absolute bottom-2 right-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/product/${product.id}/ar`}>
                  <Scan className="mr-1 h-3 w-3" /> AR
                </Link>
              </Button>
            </CardItem> */}
          </CardHeader>          <CardContent className="p-4 flex-grow">
            <CardItem translateZ="50" className="w-full">
              <CardTitle className="text-lg mb-1 truncate" title={product.name}>{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2" title={product.description}>{product.description}</p>
              <p className="font-bold text-lg">{product.price}</p>
            </CardItem>
          </CardContent>          <CardFooter className="flex flex-col gap-2 p-4 pt-0 mt-auto">
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
  )
}
