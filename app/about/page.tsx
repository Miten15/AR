import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lightbulb, Target, Zap, Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div>
      {/* Navigation */}
      <Navbar variant="default" />
      
      {/* Breadcrumb Navigation */}
      <div className="container py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <WavyBackground className="max-w-4xl mx-auto py-20" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            About LightAR
          </Badge>
          <TextGenerateEffect words="Illuminating the Future of Shopping" className="text-4xl md:text-5xl font-bold mb-4 text-white" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing how you shop for lighting with cutting-edge augmented reality technology
          </p>
        </div>
      </WavyBackground>      <div className="container py-12 md:py-24">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-6 w-6 text-blue-600" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              At LightAR, we're on a mission to transform the way people shop for lighting fixtures. We believe that
              seeing is believing, and our augmented reality technology allows you to visualize exactly how our products
              will look in your space before making a purchase.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              By eliminating the guesswork from home decor shopping, we help our customers make confident decisions,
              reduce returns, and create spaces they truly love.
            </p>
            <div className="flex space-x-4 pt-4">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="h-4 w-4 mr-1" />
                Customer-Focused
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Lightbulb className="h-4 w-4 mr-1" />
                Innovation-Driven
              </Badge>
            </div>
          </div>
          <Card className="overflow-hidden shadow-xl border-0">
            <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-purple-50">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our mission" fill className="object-cover" />
            </div>
          </Card>
        </div>

        {/* Technology Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <Card className="order-2 md:order-1 overflow-hidden shadow-xl border-0">
            <div className="relative h-[400px] bg-gradient-to-br from-purple-50 to-blue-50">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our technology" fill className="object-cover" />
            </div>
          </Card>
          <div className="order-1 md:order-2 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-purple-600" />
              <h2 className="text-3xl font-bold">Our Technology</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We've developed a seamless AR experience that works directly in your web browser - no app download
              required. Our technology supports both iOS and Android devices, using Apple's AR Quick Look and Google's
              Scene Viewer respectively.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each of our products is carefully modeled in 3D with precise dimensions and realistic materials, ensuring
              that what you see in AR is exactly what you'll get when your product arrives.
            </p>
            <div className="flex space-x-4 pt-4">
              <Badge variant="outline" className="px-3 py-1">
                <Globe className="h-4 w-4 mr-1" />
                Cross-Platform
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Award className="h-4 w-4 mr-1" />
                Precision Modeling
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Customer Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">50K+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">AR Views Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-indigo-600">75%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Reduction in Returns</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-violet-500 border-0 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience AR Shopping?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Browse our collection of premium lighting fixtures and see them in your space with our cutting-edge AR
              technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Link href="/#products">View Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}
