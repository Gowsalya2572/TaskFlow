import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

import useAuthStore from "../store/authStore";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useAuthStore((state) => state.logout);

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getPageTitle = () => {
    const titles = {
      "/dashboard": "Dashboard",
      "/projects": "Projects",
      "/tasks": "My Tasks",
      "/team": "Team",
      "/analytics": "Analytics",
      "/settings": "Settings",
    };

    return titles[location.pathname] || "Dashboard";
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-app-bg">

      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main dashboard area */}
      <div className="min-w-0 flex-1">

        <DashboardHeader
          title={getPageTitle()}
          onSearch={() => setSearchOpen((previous) => !previous)}
          onNotifications={() =>
            setNotificationsOpen((previous) => !previous)
          }
        />

        {/* Page content */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>

        {/* Temporary action panels */}
        {searchOpen && (
          <div className="fixed right-5 top-20 z-50 rounded-lg border border-border bg-white p-4 shadow-lg">
            <p className="text-sm font-medium">Search</p>
            <p className="mt-1 text-xs text-text-secondary">
              Search functionality will be added later.
            </p>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="mt-3 text-sm text-primary"
            >
              Close
            </button>
          </div>
        )}

        {notificationsOpen && (
          <div className="fixed right-5 top-20 z-50 rounded-lg border border-border bg-white p-4 shadow-lg">
            <p className="text-sm font-medium">Notifications</p>
            <p className="mt-1 text-xs text-text-secondary">
              No new notifications.
            </p>
            <button
              type="button"
              onClick={() => setNotificationsOpen(false)}
              className="mt-3 text-sm text-primary"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardLayout;
