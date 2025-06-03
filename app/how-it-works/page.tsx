import { Check, Smartphone, Scan, CuboidIcon as Cube, ArrowLeft, Zap, Shield, Clock, HelpCircle } from "lucide-react"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import Link from "next/link"

export default function HowItWorksPage() {
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
              <BreadcrumbPage>How It Works</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <WavyBackground className="max-w-4xl mx-auto py-20" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            How It Works
          </Badge>
          <TextGenerateEffect words="AR Shopping Made Simple" className="text-4xl md:text-5xl font-bold mb-4 text-white" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Experience products in your space before you buy - no app download required
          </p>
        </div>
      </WavyBackground>      <div className="container py-12 md:py-24">
        {/* Steps Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Three Simple Steps</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with AR viewing in seconds - no downloads, no complicated setup
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Scan className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                1
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-xl mb-3">Scan QR Code</CardTitle>
              <p className="text-muted-foreground leading-relaxed">
                Use your smartphone camera to scan the QR code on the product page. Works with any modern phone camera.
              </p>
            </CardContent>
          </Card>

          <Card className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                2
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-xl mb-3">Open AR Viewer</CardTitle>
              <p className="text-muted-foreground leading-relaxed">
                Your phone will automatically open the AR viewer using built-in technology - no app download needed.
              </p>
            </CardContent>
          </Card>

          <Card className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Cube className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                3
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-xl mb-3">View in Your Space</CardTitle>
              <p className="text-muted-foreground leading-relaxed">
                See the lighting product in your space at actual size. Move around, zoom in, and view from all angles.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our AR Technology?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced features that make AR shopping effortless and accurate
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Loading</h3>
              <p className="text-sm text-gray-600">Lightning-fast AR experience with optimized 3D models</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">No data collection, everything runs locally on your device</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Always Available</h3>
              <p className="text-sm text-gray-600">Works 24/7 without app updates or maintenance</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </div>
            <p className="text-muted-foreground">
              Everything you need to know about our AR technology
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Do I need to download an app?</AccordionTrigger>
                <AccordionContent>
                  No, our AR viewer works directly in your phone's browser using built-in AR capabilities. 
                  No app download required - just scan and view instantly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Which devices are supported?</AccordionTrigger>
                <AccordionContent>
                  AR View works on most modern smartphones. For iOS, you need iOS 12 or later with ARKit support. 
                  For Android, you need Android 8.0 or later with ARCore support. Most phones from 2018 onwards are compatible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Can I view products on desktop?</AccordionTrigger>
                <AccordionContent>
                  Yes! On desktop you can view and interact with detailed 3D models. For the full AR experience 
                  where you see products in your actual space, you'll need to scan the QR code with your smartphone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">How accurate are the product dimensions in AR?</AccordionTrigger>
                <AccordionContent>
                  Our AR models are created to precise scale using the exact product specifications. 
                  The AR viewer uses your phone's sensors to accurately place and size the product in your space, 
                  providing a true-to-life representation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">What if my phone doesn't support AR?</AccordionTrigger>
                <AccordionContent>
                  If your device doesn't support AR, you can still view detailed 3D models that you can rotate, 
                  zoom, and examine from all angles. We also provide detailed product photos and specifications.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>        {/* Compatibility Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8">Compatible Platforms & Browsers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">iOS 12+</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">Android 8.0+</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">Safari</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium">Chrome</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-20 bg-gradient-to-r from-blue-600 to-violet-500 border-0 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Try AR Shopping?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of online shopping. Browse our products and see them in your space instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90"
              >
                <Link href="/#products">Browse Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}
