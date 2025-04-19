import { Check, Smartphone, Scan, CuboidIcon as Cube } from "lucide-react"
import { WavyBackground } from "@/components/ui/aceternity/wavy-background"
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect"

export default function HowItWorksPage() {
  return (
    <div>
      <WavyBackground className="max-w-4xl mx-auto py-20" colors={["#6366f1", "#8b5cf6", "#d946ef"]}>
        <div className="text-center mb-8">
          <TextGenerateEffect words="How LightAR Works" className="text-4xl font-bold mb-4 text-white" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience products in your space before you buy - no app download required
          </p>
        </div>
      </WavyBackground>

      <div className="container py-12 md:py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Scan className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">1. Scan QR Code</h2>
            <p className="text-muted-foreground">Use your smartphone camera to scan the QR code on the product page</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Smartphone className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">2. Open AR Viewer</h2>
            <p className="text-muted-foreground">
              Your phone will automatically open the AR viewer - no app download needed
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Cube className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">3. View in Your Space</h2>
            <p className="text-muted-foreground">
              See the lighting product in your space at actual size and from all angles
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Do I need to download an app?</h3>
              <p className="text-muted-foreground">
                No, our AR viewer works directly in your phone's browser. No app download required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Which devices are supported?</h3>
              <p className="text-muted-foreground">
                AR View works on most modern smartphones. For iOS, you need iOS 12 or later. For Android, you need
                Android 8.0 or later with ARCore support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I see the product in desktop?</h3>
              <p className="text-muted-foreground">
                Yes, on desktop you can view and interact with the 3D model. For AR viewing, you'll need to scan the QR
                code with your smartphone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate are the product dimensions in AR?</h3>
              <p className="text-muted-foreground">
                Our AR models are created to scale, providing an accurate representation of the product's actual size in
                your space.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Compatible With</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>iOS 12+</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Android 8.0+ with ARCore</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Safari</span>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Chrome</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
