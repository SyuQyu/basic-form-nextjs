import dynamic from "next/dynamic"

const Button = dynamic(() => import("@/components/common/button/buttonCustom"))
const ImageWithFallback = dynamic(() => import("@/components/common/imageWithFallback/imageWithFallback"))
const Card = dynamic(() => import("@/components/common/card/cardCustom"))
const Input = dynamic(() => import("@/components/common/input/inputCustom"))
const OTPInput = dynamic(() => import("@/components/common/otpInput/otpInput"))
const StrengthBarPassword = dynamic(() => import("@/components/common/strengthBarPassword/strengthBarPassword"))

export {
  Button,
  ImageWithFallback,
  Card,
  Input,
  OTPInput,
  StrengthBarPassword,
}
