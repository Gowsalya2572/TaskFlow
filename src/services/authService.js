
import { demoUsers } from "../data/users";

const STORAGE_KEY = "taskflow_registered_users";

// Get existing users and browser-registered demo users
const getAllUsers = () => {
  try {
    const savedUsers = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return [...demoUsers, ...savedUsers];
  } catch {
    return [...demoUsers];
  }
};

// Find demo user by email
export const loginDemoUser = (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getAllUsers().find(
    (item) => item.email.toLowerCase() === normalizedEmail
  );

  if (!user) {
    return {
      success: false,
      message: "No account found with this email.",
    };
  }

  return {
    success: true,
    user,
  };
};

// Register a new demo user
export const registerDemoUser = ({ name, email }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = getAllUsers().find(
    (item) => item.email.toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser = {
    id: `demo-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    role: "Member",
  };

  try {
    const savedUsers = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...savedUsers, newUser])
    );

    return {
      success: true,
      user: newUser,
    };
  } catch {
    return {
      success: false,
      message: "Unable to save your demo account in this browser.",
    };
  }
};

