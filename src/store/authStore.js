
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

      login: (email, password) => {
        const result = loginDemoUser(email, password);

        if (!result.success) {
          return result;
        }

        set({
          user: result.user,
          isAuthenticated: true,
        });

        return result;
      },

      register: ({ name, email, password }) => {
        const result = registerDemoUser({
          name,
          email,
          password,
        });

        if (!result.success) {
          return result;
        }

        set({
          user: result.user,
          isAuthenticated: true,
        });

        return result;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
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
