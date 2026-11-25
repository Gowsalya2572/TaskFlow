
import { demoUsers } from "../data/users";

const STORAGE_KEY = "taskflow_team";

const allowedRoles = ["Admin", "Project Manager", "Member", "Viewer"];

export const getTeamMembers = () => {
  try {
    const savedMembers = localStorage.getItem(STORAGE_KEY);

    if (savedMembers) {
      return JSON.parse(savedMembers);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUsers));

    return demoUsers;
  } catch (error) {
    console.error("Failed to load team members:", error);
    return demoUsers;
  }
};

export const saveTeamMembers = (members) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
};

export const updateMemberRole = (memberId, newRole) => {
  if (!allowedRoles.includes(newRole)) {
    throw new Error("Invalid role selected");
  }

  const members = getTeamMembers();

  const updatedMembers = members.map((member) =>
    member.id === memberId
      ? { ...member, role: newRole }
      : member
  );

  saveTeamMembers(updatedMembers);

  return updatedMembers;
};

export const getTeamStats = (members) => {
  return {
    totalMembers: members.length,
    admins: members.filter((member) => member.role === "Admin").length,
    projectManagers: members.filter(
      (member) => member.role === "Project Manager"
    ).length,
    members: members.filter((member) => member.role === "Member").length,
    viewers: members.filter((member) => member.role === "Viewer").length,
  };
};
