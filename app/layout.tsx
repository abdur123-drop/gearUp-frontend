import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const robotoHeading = Roboto({ subsets: ["latin"], variable: "--font-heading" })

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "GearUp — Rent outdoor gear",
    template: "%s | GearUp",
  },
  description:
    "Discover and rent quality outdoor equipment from trusted local providers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", spaceGrotesk.variable, robotoHeading.variable)}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
