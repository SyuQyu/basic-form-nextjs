"use client"
import React, { useState } from "react"
import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoMailSharp } from "react-icons/io5"
import { Button, Card, Input, StrengthBarPassword } from "@/components/common"
import { getPasswordStrength } from "@/lib/utils"
import useAuthStore from "@/context/auth"
import { toast } from "@/components/ui/use-toast"

interface FormValues {
  name: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword: string
  address: string
  dateOfBirth: string
  occupation: string
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {}

  // Name validation
  if (!values.name) {
    errors.name = "Required"
  }
  else if (!/^[A-Z\s]+$/i.test(values.name)) {
    errors.name = "Name should contain only letters and spaces"
  }

  // Phone Number validation
  if (!values.phoneNumber) {
    errors.phoneNumber = "Required"
  }
  else if (!/^\d{10,12}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Phone number must be between 10 and 12 digits"
  }

  // Email validation
  if (!values.email) {
    errors.email = "Required"
  }
  else if (!/^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  // Password validation
  if (!values.password) {
    errors.password = "Required"
  }
  else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long"
  }

  // Confirm Password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required"
  }
  else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match"
  }

  // Address validation
  if (!values.address) {
    errors.address = "Required"
  }
  else if (values.address.length < 10) {
    errors.address = "Address must be at least 10 characters long"
  }

  // Date of Birth validation
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Required"
  }

  // Occupation validation
  if (!values.occupation) {
    errors.occupation = "Required"
  }

  return errors
}

export default function Form() {
  const router = useRouter()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { register, isLoading, error } = useAuthStore()

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      dateOfBirth: "",
      occupation: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      register(values)
      setSubmitting(false)
      toast({
        icon: (<IoMailSharp className="size-6" />),
        title: "Submit Success.",
      })
      router.push("/results")
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
        title="Basic Form"
        description="Fill in the form below to create an account"
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
            label="Name"
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : null}
          />
          <Input
            label="Phone Number"
            type="text"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : null}
          />
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
          {formik.values.password && (
            <StrengthBarPassword strength={passwordStrength} />
          )}
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
          />
          <Input
            label="Address"
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            error={formik.touched.address && formik.errors.address ? formik.errors.address : null}
          />
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : null}
          />
          <Input
            label="Occupation"
            type="text"
            name="occupation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.occupation}
            error={formik.touched.occupation && formik.errors.occupation ? formik.errors.occupation : null}
          />
          <div className="flex flex-col w-full gap-4 justify-center items-center">
            <Button
              type="submit"
              className="w-full bg-[#0469DE] text-white hover:bg-[#043ede] rounded-[10px] hover:text-white py-4"
              size="lg"
              disabled={formik.isSubmitting || isLoading}
            >
              Create account
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </Card>
    </div>
  )
}
