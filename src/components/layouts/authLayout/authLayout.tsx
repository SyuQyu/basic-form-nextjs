import dynamic from "next/dynamic"
import { Toaster } from "@/components/ui/toaster"

const Header = dynamic(() => import("@/components/layouts/authLayout/header"))
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body id="authLayouts">
      <Header />
      <main id="mainAuthLayouts">
        {children}
      </main>
      <Toaster />
    </body>
  )
}
