import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { ArrowRight, Scan, CuboidIcon as Cube, Smartphone } from "lucide-react"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"
import { MovingCards } from "@/components/ui/aceternity/moving-cards"

export default function Home() {
  const products = [
    {
      id: "1",
      name: "Track Spot Light",
      description: "Modern track lighting with adjustable head",
      image: "/placeholder.svg?height=300&width=300",
      price: "$129",
    },
    {
      id: "2",
      name: "Pendant Light",
      description: "Elegant pendant light for dining areas",
      image: "/placeholder.svg?height=300&width=300",
      price: "$149",
    },
    {
      id: "3",
      name: "Wall Sconce",
      description: "Contemporary wall sconce with LED lighting",
      image: "/placeholder.svg?height=300&width=300",
      price: "$89",
    },
  ]

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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-violet-500 text-transparent bg-clip-text">
                LightAR
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Products
            </Link>
            <Link href="/how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">
              How It Works
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="default">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <WavyBackground
          className="max-w-4xl mx-auto pb-40"
          containerClassName="w-full min-h-screen relative"
          colors={["#6366f1", "#8b5cf6", "#d946ef"]}
        >
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <TextGenerateEffect
                      words="Experience Lighting in Your Space Before You Buy"
                      className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    />
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Scan the QR code with your phone to see our lighting products in your space with augmented
                      reality. No app required.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600"
                    >
                      <Link href="#products">
                        View Products <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/how-it-works">Learn More</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-[300px] h-[600px] overflow-hidden rounded-xl border-8 border-black bg-black">
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-xl shadow-lg">
                          <div className="w-48 h-48 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                                AR
                              </div>
                            </div>
                            <div className="w-full h-full border-8 border-black grid grid-cols-4 grid-rows-4 gap-1">
                              {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className="bg-black" />
                              ))}
                            </div>
                          </div>
                          <div className="text-center mt-2 text-sm font-medium">Scan to view in AR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </WavyBackground>

        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See Before You Buy</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AR technology lets you visualize our lighting products in your space with just a smartphone
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Scan className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Scan QR Code</h3>
                <p className="text-gray-500">Use your smartphone camera to scan the QR code on the product page</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Open AR Viewer</h3>
                <p className="text-gray-500">
                  Your phone will automatically open the AR viewer - no app download needed
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Cube className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. View in Your Space</h3>
                <p className="text-gray-500">
                  See the lighting product in your space at actual size and from all angles
                </p>
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
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
              </div>
            </div>
            <MovingCards items={testimonials} direction="right" speed="slow" />
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 LightAR. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
