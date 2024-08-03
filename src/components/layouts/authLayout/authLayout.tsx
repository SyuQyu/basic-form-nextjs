import dynamic from "next/dynamic"

const Header = dynamic(() => import("@/components/layouts/authLayout/header"))
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div id="authLayouts">
      <Header />
      <main id="mainAuthLayouts">
        {children}
      </main>
    </div>
  )
}
