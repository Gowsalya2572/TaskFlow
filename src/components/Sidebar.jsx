
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  ChartNoAxesCombined,
  Settings,
  LogOut,
} from "lucide-react";



const Sidebar = ({ onLogout }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path:  "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "My Tasks",
      path: "/my-tasks",
      icon: CheckSquare,
    },
    {
      name: "Team",
      path: "/team",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <aside className="flex min-h-screen w-16 shrink-0 flex-col bg-sidebar px-2 py-5 text-white md:w-64 md:px-4">

      {/* Logo */}
      <div className="mb-10 px-2 text-center text-xl font-bold md:text-left">
        <span className="hidden md:inline">TaskFlow</span>
        <span className="md:hidden">TF</span>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              title={item.name}
              className={({ isActive }) =>
                `flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm transition md:justify-start ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span className="hidden md:inline">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <div className="space-y-2 border-t border-slate-700 pt-5">
        <NavLink
          to="/settings"
          title="Settings"
          className={({ isActive }) =>
            `flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm md:justify-start ${
              isActive
                ? "bg-primary text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          <Settings size={19} />
          <span className="hidden md:inline">Settings</span>
        </NavLink>

        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white md:justify-start"
        >
          <LogOut size={19} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
