import type { Metadata } from "next"
import clsx from "clsx"
import { POPPINS, ROBOTO_MONO } from "@/constants/fonts"
import "@/styles/index.scss"
import { Toaster } from "@/components/ui/toaster"
import AuthLayout from "@/components/layouts/authLayout/authLayout"

export const metadata: Metadata = {
  title: "Trauma & Empathy",
  description: "Trauma & Empathy is a platform for sharing stories of trauma and healing.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={clsx("scroll-smooth", POPPINS.variable, ROBOTO_MONO.variable)}>
      <body>
        <AuthLayout>
          {children}
          <Toaster />
        </AuthLayout>
      </body>
    </html>
  )
}
