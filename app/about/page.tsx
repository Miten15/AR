import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto py-20" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
        <div className="text-center mb-8">
          <TextGenerateEffect words="About LightAR" className="text-4xl font-bold mb-4 text-white" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Revolutionizing how you shop for lighting with augmented reality
          </p>
        </div>
      </WavyBackground>

      <div className="container py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At LightAR, we're on a mission to transform the way people shop for lighting fixtures. We believe that
              seeing is believing, and our augmented reality technology allows you to visualize exactly how our products
              will look in your space before making a purchase.
            </p>
            <p className="text-lg text-gray-600">
              By eliminating the guesswork from home decor shopping, we help our customers make confident decisions,
              reduce returns, and create spaces they truly love.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our mission" fill className="object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our technology" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <p className="text-lg text-gray-600 mb-6">
              We've developed a seamless AR experience that works directly in your web browser - no app download
              required. Our technology supports both iOS and Android devices, using Apple's AR Quick Look and Google's
              Scene Viewer respectively.
            </p>
            <p className="text-lg text-gray-600">
              Each of our products is carefully modeled in 3D with precise dimensions and realistic materials, ensuring
              that what you see in AR is exactly what you'll get when your product arrives.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience AR Shopping?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Browse our collection of premium lighting fixtures and see them in your space with our cutting-edge AR
            technology.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600"
          >
            <Link href="/#products">View Products</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
