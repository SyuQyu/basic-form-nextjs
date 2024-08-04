import Link from "next/link"
import { ImageWithFallback } from "@/components/common"

export default function Header() {
  return (
    <header id="authHeader">
      <Link href="/" className="flex flex-row justify-start items-center gap-2">
        <ImageWithFallback
          width={0}
          height={0}
          sizes="10vw"
          className="w-6 object-contain"
          priority={true}
          src="/images/logo.jpg"
          // fallbackSrc="/images/Logo.png"
          alt="Logo"
        />
        <p className="font-normal text-base">Basic Form</p>
      </Link>
    </header>
  )
}
