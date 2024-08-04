"use client"
import React from "react"
import { useRouter } from "next/navigation"
import useAuthStore from "@/context/auth"
import { Card } from "@/components/common"

function Profile() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  if (user === null) {
    router.push("/")
  }

  const handleLogOut = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Card
        title="User Profile"
        description="Here are your details:"
        footer={(
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogOut}
          >
            Logout
          </button>
        )}
        styleTitle="text-2xl"
        styleFooter="text-[#A7A7A7] flex justify-center items-center !p-0"
        styleCard="max-w-[700px] w-full flex flex-col gap-12 !p-[40px]"
        styleContent="!p-0"
        styleDescription="text-base text-black"
      >
        <ul className="list-none">
          <li>
            <strong>Name:</strong>
            {" "}
            {user?.name}
          </li>
          <li>
            <strong>Phone Number:</strong>
            {" "}
            {user?.phoneNumber}
          </li>
          <li>
            <strong>Email:</strong>
            {" "}
            {user?.email}
          </li>
          <li>
            <strong>Address:</strong>
            {" "}
            {user?.address}
          </li>
          <li>
            <strong>Date of birth:</strong>
            {" "}
            {user?.dateOfBirth}
          </li>
          <li>
            <strong>Occupation:</strong>
            {" "}
            {user?.occupation}
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default Profile
