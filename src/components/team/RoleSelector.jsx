
const roles = ["Admin", "Project Manager", "Member", "Viewer"];

const roleStyles = {
  Admin: "bg-violet-100 text-violet-700",
  "Project Manager": "bg-blue-100 text-blue-700",
  Member: "bg-emerald-100 text-emerald-700",
  Viewer: "bg-slate-100 text-slate-600",
};

const RoleSelector = ({
  role,
  memberId,
  currentUserId,
  isAdmin,
  onRoleChange,
}) => {
  const canEdit = isAdmin && memberId !== currentUserId;

  if (!canEdit) {
    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleStyles[role] || roleStyles.Member}`}
      >
        {role}
      </span>
    );
  }

  return (
    <select
      value={role}
      onChange={(event) => onRoleChange(memberId, event.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    >
      {roles.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default RoleSelector;
