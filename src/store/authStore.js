
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  loginDemoUser,
  registerDemoUser,
} from "../services/authService";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Login action
      login: (email) => {
        const result = loginDemoUser(email);

        if (!result.success) {
          return result;
        }

        set({
          user: result.user,
          isAuthenticated: true,
        });

        return result;
      },

      // Registration action
      register: ({ name, email }) => {
        const result = registerDemoUser({ name, email });

        if (!result.success) {
          return result;
        }

        set({
          user: result.user,
          isAuthenticated: true,
        });

        return result;
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "taskflow-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
