import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { ArrowRight, Scan, CuboidIcon as Cube, Smartphone } from "lucide-react"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"
import { MovingCards } from "@/components/ui/aceternity/moving-cards"
import { ProductService } from "@/lib/services/product-service"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import Image from "next/image"

export default async function Home() {
  // Fetch featured products from our service
  const products = await ProductService.getFeaturedProducts(3)

  const testimonials = [
    {
      title: "Sarah J.",
      description:
        "The AR feature helped me visualize exactly how the light would look in my living room. Saved me from making a costly mistake!",
    },
    {
      title: "Michael T.",
      description:
        "Being able to see the product in my space before buying was a game-changer. The 3D model was detailed and accurate.",
    },
    {
      title: "Emma L.",
      description:
        "I was skeptical about AR shopping, but this made it so easy! No app download required and it worked perfectly on my phone.",
    },
    {
      title: "David R.",
      description:
        "The lighting looked exactly as it did in the AR preview when it arrived. Great technology that actually delivers.",
    },
  ]
  return (    <div className="flex flex-col min-h-screen">
      <Navbar variant="transparent" />
      <main className="flex-1">
        <WavyBackground
          className="max-w-7xl mx-auto pb-20 sm:pb-32 lg:pb-40"
          containerClassName="w-full min-h-[100vh] sm:min-h-screen relative"
          colors={["#6366f1", "#8b5cf6", "#d946ef"]}
        >          <Section containerSize="lg" className="pt-8 sm:pt-16 lg:pt-24">
            <Container size="lg">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
                  <div className="space-y-4 text-center lg:text-left">
                    <TextGenerateEffect
                      words="Experience Lighting in Your Space Before You Buy"
                      className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
                    />
                    <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                      Scan the QR code with your phone to see our lighting products in your space with augmented
                      reality. No app required.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-center lg:items-start">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                    >
                      <Link href="#products">
                        View Products <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                      <Link href="/how-it-works">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center order-1 lg:order-2">
                  <div className="relative w-[250px] h-[500px] sm:w-[280px] sm:h-[560px] lg:w-[300px] lg:h-[600px] overflow-hidden rounded-xl border-4 sm:border-8 border-black bg-black shadow-2xl">
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4 sm:p-6">
                        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-[200px] sm:max-w-[220px]">
                          <div className="w-full aspect-square relative mb-3">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base">
                                AR
                              </div>
                            </div>
                            <div className="w-full h-full border-4 sm:border-8 border-black grid grid-cols-4 grid-rows-4 gap-1">
                              {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className="bg-black" />
                              ))}
                            </div>
                          </div>
                          <div className="text-center text-xs sm:text-sm font-medium">Scan to view in AR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>        </WavyBackground>        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  How It Works
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">See Before You Buy</h2>
                <p className="max-w-[900px] text-gray-500 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AR technology lets you visualize our lighting products in your space with just a smartphone
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg border bg-white shadow-sm">
                <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                  <Scan className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">1. Scan QR Code</h3>
                <p className="text-gray-500 text-sm sm:text-base">Use your smartphone camera to scan the QR code on the product page</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg border bg-white shadow-sm">
                <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                  <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">2. Open AR Viewer</h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Your phone will automatically open the AR viewer - no app download needed
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg border bg-white shadow-sm sm:col-span-2 lg:col-span-1">
                <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                  <Cube className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">3. View in Your Space</h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  See the lighting product in your space at actual size and from all angles
                </p>
              </div>
            </div>
          </div>
        </section>        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image src="/placeholder.svg?height=400&width=600" alt="AR Demo" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Visualize in Your Space</h3>
                      <p className="text-sm sm:text-base">See exactly how our lighting products will look in your home</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="space-y-4 sm:space-y-6">
                  <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">
                    AR Technology
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">The Future of Shopping is Here</h2>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Our augmented reality technology allows you to place virtual products in your real environment,
                    giving you a true sense of size, scale, and appearance before you buy.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full flex-shrink-0">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base">No app download required</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full flex-shrink-0">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base">Works on most modern smartphones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full flex-shrink-0">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm sm:text-base">Accurate size and appearance</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 w-full sm:w-auto"
                  >
                    <Link href="/how-it-works">Learn More About AR</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Products</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Lighting Collection</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Browse our collection and view them in your space with AR technology
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
              </div>
            </div>
            <MovingCards items={testimonials} direction="right" speed="slow" />          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
