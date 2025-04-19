"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CuboidIcon as Cube, Scan } from "lucide-react"
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card"

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <CardContainer className="w-full">
      <CardBody className="w-full h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-0">
        <Card className="w-full overflow-hidden border-0 shadow-none">
          <CardHeader className="p-0">
            <CardItem translateZ="100" className="w-full">
              <div className="relative aspect-square">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </CardItem>
          </CardHeader>
          <CardContent className="p-6">
            <CardItem translateZ="50" className="w-full">
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
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
                <Link href={`/product/${product.id}`}>
                  <Cube className="mr-2 h-4 w-4" /> View Product
                </Link>
              </Button>
            </CardItem>
            <CardItem translateZ="100" className="w-full">
              <Button variant="outline" asChild className="w-full">
                <Link href={`/product/${product.id}/ar`}>
                  <Scan className="mr-2 h-4 w-4" /> View in AR
                </Link>
              </Button>
            </CardItem>
          </CardFooter>
        </Card>
      </CardBody>
    </CardContainer>
  )
}
