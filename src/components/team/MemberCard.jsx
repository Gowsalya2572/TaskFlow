
import RoleSelector from "./RoleSelector";

const MemberCard = ({
  member,
  currentUserId,
  isAdmin,
  onRoleChange,
})  => {
  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-lg font-semibold text-indigo-600">
          {initials}
        </div>

        {member.id === currentUserId && (
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
            You
          </span>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-slate-900">
          {member.name}
        </h3>

        <p className="mt-1 break-all text-sm text-slate-500">
          {member.email}
        </p>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Role
        </p>

        <RoleSelector
          role={member.role}
          memberId={member.id}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          onRoleChange={onRoleChange}
        />
      </div>
    </div>
  );
};

export default MemberCard;

