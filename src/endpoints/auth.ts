// utils/api.js
import axiosInstance from "@/lib/axiosInstance"

export function login(email: string, password: string) {
  return axiosInstance.post("/api/login", { email, password })
}

export function register(email: string, password: string) {
  return axiosInstance.post("/api/register", { email, password })
}
