
import { Bell, Search } from "lucide-react";
import useAuthStore from "../store/authStore";

const DashboardHeader = ({
  title = "Dashboard",
  onSearch,
  onNotifications,
}) => {
  const user = useAuthStore((state) => state.user);

  const userName = user?.name || "User";
  const role = user?.role || "Member";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-white px-5 py-4 md:px-8">

      {/* Greeting */}
      <div>
        <h2 className="text-xl font-semibold text-text-main">
          {title}
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          Good morning, {userName} 👋
        </p>
      </div>

      {/* Header actions */}
      <div className="flex items-center gap-3">

        {onSearch && (
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search"
            className="rounded-lg p-2 text-text-secondary hover:bg-slate-100"
          >
            <Search size={20} />
          </button>
        )}

        {onNotifications && (
          <button
            type="button"
            onClick={onNotifications}
            aria-label="Notifications"
            className="rounded-lg p-2 text-text-secondary hover:bg-slate-100"
          >
            <Bell size={20} />
          </button>
        )}

        {/* User profile */}
        <div className="flex items-center gap-3 border-l border-border pl-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-text-main">
              {userName}
            </p>

            <p className="text-xs text-text-secondary">
              {role}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;
