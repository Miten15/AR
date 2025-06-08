import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ModelViewerLoader from "@/components/model-viewer-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LightAR - View Lighting Products in AR",
  description: "Experience lighting products in your space with augmented reality before you buy. No app required.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ModelViewerLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
