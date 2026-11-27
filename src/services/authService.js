
import { demoUsers } from "../data/users";
import { getTeamMembers } from "../services/teamService";

const STORAGE_KEY = "taskflow_registered_users";

// Get registered users from localStorage
const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

// Get all users and their latest team roles
const getAllUsers = () => {
  const teamMembers = getTeamMembers();
  const registeredUsers = getRegisteredUsers();

  return [...demoUsers, ...registeredUsers].map((user) => {
    const teamMember = teamMembers.find(
      (member) => member.id === user.id
    );

    return teamMember
      ? { ...user, role: teamMember.role }
      : user;
  });
};

// Login: check both email and password
export const loginDemoUser = (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getAllUsers().find(
    (item) => item.email.toLowerCase() === normalizedEmail
  );

  if (!user) {
    return {
      success: false,
      message: "No account found with this email. Please sign up.",
    };
  }

  if (!user.password || user.password !== password) {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
    };
  }

  // Do not expose the password in the authenticated user object
  const { password: savedPassword, ...safeUser } = user;

  return {
    success: true,
    user: safeUser,
  };
};

// Register: save the new user's password too
export const registerDemoUser = ({
  name,
  email,
  password,
}) => {
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
    password,
    role: "Member",
  };

  try {
    const savedUsers = getRegisteredUsers();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...savedUsers, newUser])
    );

    const { password: savedPassword, ...safeUser } = newUser;

    return {
      success: true,
      user: safeUser,
    };
  } catch {
    return {
      success: false,
      message: "Unable to save your account. Please try again.",
    };
  }
};

