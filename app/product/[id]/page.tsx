import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CuboidIcon as Cube, Scan, ShoppingCart, Star, Share2, Heart } from "lucide-react"
import { Spotlight } from "@/components/ui/aceternity/spotlight"
import ModelViewer from "@/components/model-viewer"
import RelatedProducts from "@/components/related-products"
import { ProductService } from "@/lib/services/product-service"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params before using its properties (Next.js 15 requirement)
  const { id } = await params
  
  // Fetch product data from our service
  const product = await ProductService.getProduct(id)
  
  if (!product) {
    notFound()
  }

  // Generate star rating display
  const rating = product.rating || 0
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white border shadow-sm">
              <Image 
                src={product.image || "/placeholder.svg"} 
                alt={product.name} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
            
            {/* 3D Model Viewer */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cube className="h-5 w-5 text-blue-600" />
                  Interactive 3D Preview
                </CardTitle>
              </CardHeader>              <CardContent className="p-0">
                <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100">                  {product.modelPath ? (
                    <ModelViewer 
                      modelPath={product.modelPath} 
                      className="h-full w-full" 
                      zoom={9} 
                      autoRotate 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">3D model not available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {product.category}
                    </Badge>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < fullStars
                                  ? "fill-yellow-400 text-yellow-400"
                                  : i === fullStars && hasHalfStar
                                  ? "fill-yellow-200 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                <span className="text-lg text-green-600 font-medium">Free shipping</span>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              {product.longDescription && (
                <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
              )}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={`/product/${product.id}/ar`}>
                    <Scan className="mr-2 h-5 w-5" /> View in AR
                  </Link>
                </Button>
              </div>
              <Button variant="secondary" size="lg" asChild className="w-full">
                <Link href={`/product/${product.id}/3d`}>
                  <Cube className="mr-2 h-5 w-5" /> View Full 3D Model
                </Link>
              </Button>
            </div>

            <Separator />

            {/* Included Formats */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Included formats</h3>
              <div className="flex gap-2">
                {product.formats.map((format, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100">
                    {format.toLowerCase()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Technical Specifications</h3>
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product Details</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Category</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">File Formats</span>
                    <span className="text-gray-600">{product.formats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">AR Compatible</span>
                    <span className="text-green-600 font-medium">Yes</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-900">3D Viewing</span>
                    <span className="text-green-600 font-medium">Available</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>        {/* Related Products */}
        <RelatedProducts currentProductId={id} />
      </div>
    </div>
  )
}
