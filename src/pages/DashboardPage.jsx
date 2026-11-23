
import { useMemo } from "react";

import useAuthStore from "../store/authStore";

import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";

import {
  getDashboardStats,
  getRecentProjects,
  getMyTasks,
} from "../services/dashboardService";

import StatsGrid from "../components/StatsGrid";
import RecentProjects from "../components/RecentProject";
import MyTasksWidget from "../components/MyTaskWidget";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);
  const projects = getProjects();
  const tasks = getTasks();

  const stats = useMemo(
    () => getDashboardStats(tasks),
    []
  );

  const recentProjects = useMemo(
    () => getRecentProjects(projects, 3),
    []
  );

  const myTasks = useMemo(
    () => getMyTasks(tasks, user?.id),
    [user?.id]
  );

  return (
    <div className="space-y-6">

      {/* Page introduction */}
      <div>
        <h1 className="text-2xl font-bold text-text-main">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Statistics */}
      <StatsGrid stats={stats} />

      {/* Projects and tasks */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">

        <div className="xl:col-span-3">
          <RecentProjects projects={recentProjects} />
        </div>

        <div className="xl:col-span-2">
          <MyTasksWidget tasks={myTasks} />
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
