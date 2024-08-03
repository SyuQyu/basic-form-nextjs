import { create } from "zustand"
import { login, register } from "@/endpoints/auth"

interface AuthState {
  user: any
  error: string | null
  isLoading: boolean
  login: (email: string, password: string) => void
  register: (email: string, password: string, confirmPassword: string) => void
  logout: () => void
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  error: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await login(email, password)
      set({ user: response.data.user, isLoading: false })
    }
    catch (error: any) {
      set({ error: error.response?.data?.message || "Login failed", isLoading: false })
    }
  },

  register: async (email, password, confirmPassword) => {
    set({ isLoading: true, error: null })
    if (password !== confirmPassword) {
      set({ error: "Passwords do not match", isLoading: false })
      return
    }
    try {
      const response = await register(email, password)
      set({ user: response.data.user, isLoading: false })
    }
    catch (error: any) {
      set({ error: error.response?.data?.message || "Registration failed", isLoading: false })
    }
  },

  logout: () => {
    set({ user: null })
    // Optionally, you can also clear any other state related to the user
  },
}))

export default useAuthStore
