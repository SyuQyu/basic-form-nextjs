"use client"
import React, { useState } from "react"
import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, Card, Input, StrengthBarPassword } from "@/components/common"
import { getPasswordStrength } from "@/lib/utils"
import useRegisterStep from "@/context/registerStep"

interface FormValues {
  email: string
  password: string
  confirmPassword: string
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}
  if (!values.email) {
    errors.email = "Required"
  }
  else if (!/^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  if (!values.password) {
    errors.password = "Required"
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required"
  }
  else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match"
  }
  return errors
}

export default function Form() {
  const router = useRouter()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false)
        router.push("/register/verification-account")
        // alert(JSON.stringify(values, null, 2))
      }, 400)
    },
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e)
    const strength = getPasswordStrength(e.target.value)
    setPasswordStrength(strength)
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <Card
        title="Create an account"
        description="Create an account to read and post childhood trauma episodes."
        footer={(
          <p className="text-[#A7A7A7]">
            By signing in you agree to our
            {" "}
            {" "}
            <span className="underline">Terms of Service</span>
            {" "}
            and
            {" "}
            {" "}
            <span className="underline">Privacy Policy</span>
          </p>
        )}
        styleTitle="text-2xl"
        styleFooter="text-[#A7A7A7] flex justify-center items-center !p-0"
        styleCard="max-w-[700px] w-full flex flex-col gap-12 !p-[40px]"
        styleContent="!p-0"
        styleDescription="text-base text-black"
      >
        <form onSubmit={formik.handleSubmit} className="gap-8 flex flex-col">
          <Input
            label="Email"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          />
          {
            formik.values.password && (
              <StrengthBarPassword strength={passwordStrength} />
            )
          }
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
          />
          <div className="flex flex-col w-full gap-4 justify-center items-center">
            <Button
              type="submit"
              className="w-full bg-[#0469DE] text-white hover:bg-[#043ede] rounded-[10px] hover:text-white py-4"
              size="lg"
              disabled={formik.isSubmitting}
            >
              Create account
            </Button>
            <p>
              Already have an account?
              <Link href="/login" className="text-[#0469DE]"> Sign In</Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  )
}
