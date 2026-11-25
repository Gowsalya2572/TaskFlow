
import { useEffect, useState } from "react";
import {
  getTeamMembers,
  updateMemberRole,
  getTeamStats,
} from "../services/teamService";
import MemberCard from "../components/team/MemberCard";
import useAuthStore from "../store/authStore";

const TeamPage = () => {
  const currentUser = useAuthStore((state) => state.user);

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMembers(getTeamMembers());
  }, []);

  const isAdmin = currentUser?.role === "Admin";

  const stats = getTeamStats(members);

  const filteredMembers = members.filter((member) => {
    const searchValue = search.toLowerCase();

    return (
      member.name.toLowerCase().includes(searchValue) ||
      member.email.toLowerCase().includes(searchValue) ||
      member.role.toLowerCase().includes(searchValue)
    );
  });

  const handleRoleChange = (memberId, newRole) => {
    if (!isAdmin) return;

    if (memberId === currentUser?.id) {
      return;
    }

    try {
      const updatedMembers = updateMemberRole(memberId, newRole);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Role update failed:", error);
    }
  };

  const statCards = [
    {
      label: "Total Members",
      value: stats.totalMembers,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Admins",
      value: stats.admins,
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "Project Managers",
      value: stats.projectManagers,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Members",
      value: stats.members,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Viewers",
      value: stats.viewers,
      color: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Team Members
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage team members and their roles.
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {isAdmin ? "Admin Access" : "View Only"}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div
              className={`mb-3 inline-flex rounded-lg px-3 py-2 text-sm font-semibold ${card.color}`}
            >
              {card.value}
            </div>

            <p className="text-sm text-slate-500">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email or role..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Members */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            All Members
          </h2>

          <span className="text-sm text-slate-500">
            {filteredMembers.length} members
          </span>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-medium text-slate-700">
              No team members found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with another name or email.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                currentUserId={currentUser?.id}
                isAdmin={isAdmin}
                onRoleChange={handleRoleChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
