
import { demoUsers } from "../data/users";
import { getTeamMembers } from "../services/teamService";

const STORAGE_KEY = "taskflow_registered_users";

// Get registered users
const getRegisteredUsers = () => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
};

// Get users with the latest team roles
const getAllUsers = () => {
  const teamMembers = getTeamMembers();
  const registeredUsers = getRegisteredUsers();

  const allUsers = [...demoUsers, ...registeredUsers];

  return allUsers.map((user) => {
    const teamMember = teamMembers.find(
      (member) => member.id === user.id
    );

    return teamMember
      ? { ...user, role: teamMember.role }
      : user;
  });
};

// Login demo user
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

// Register new demo user
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
    const savedUsers = getRegisteredUsers();

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
