import type { Metadata } from "next"
import clsx from "clsx"
import { POPPINS, ROBOTO_MONO } from "@/constants/fonts"
import "@/styles/index.scss"
import AuthLayout from "@/components/layouts/authLayout/authLayout"

export const metadata: Metadata = {
  title: "Basic Form",
  description: "Form with basic fields",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={clsx("scroll-smooth", POPPINS.variable, ROBOTO_MONO.variable)}>
      <AuthLayout>
        {children}
      </AuthLayout>
    </html>
  )
}
