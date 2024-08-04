// stores/authStore.js
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  user: any
  error: string | null
  isLoading: boolean
  register: (userData: any) => void
  logout: () => void
}

const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null,
      error: null,
      isLoading: false,

      register: (userData) => {
        set({ user: userData, isLoading: false, error: null })
      },

      logout: () => {
        set({ user: null })
      },
    }),
    {
      name: "auth-storage", // unique name
      getStorage: () => localStorage, // use localStorage
    },
  ),
)

export default useAuthStore
