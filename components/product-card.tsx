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
      <CardBody className="w-full h-auto relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] bg-slate-800 border-slate-700 border rounded-xl p-0">
        <Card className="w-full overflow-hidden border-0 shadow-none bg-transparent text-slate-200">
          <CardHeader className="p-0">
            <CardItem translateZ="100" className="w-full">
              <div className="relative aspect-square overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover/card:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </CardItem>
          </CardHeader>
          <CardContent className="p-6">
            <CardItem translateZ="50" className="w-full">
              <CardTitle className="text-xl mb-2 text-white">{product.name}</CardTitle>
              <p className="text-slate-300 line-clamp-2">{product.description}</p>
              <p className="font-bold text-lg mt-2 text-green-400">{product.price}</p>
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
              <Button variant="outline" asChild className="w-full border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-blue-950">
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
