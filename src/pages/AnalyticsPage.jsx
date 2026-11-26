
import { useMemo } from "react";
import {
  FolderKanban,
  ListTodo,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import useAuthStore from "../store/authStore";

import {
  getRoleAnalytics,
} from "../services/analyticsService";

import TaskStatusChart from "../components/analytics/TaskStatusChart";
import ProductivityChart from "../components/analytics/ProductivityChart";

const AnalyticsPage = () => {
  const currentUser = useAuthStore((state) => state.user);

  const analytics = useMemo(
    () => getRoleAnalytics(currentUser),
    [currentUser]
  );

  const { summary, taskStatus, productivity, projectProgress } =
    analytics;

  const statCards = [
    {
      label: "Total Projects",
      value: summary.totalProjects,
      icon: FolderKanban,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Total Tasks",
      value: summary.totalTasks,
      icon: ListTodo,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed Tasks",
      value: summary.completedTasks,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Completion Rate",
      value: `${summary.completionRate}%`,
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Insights into projects, tasks and productivity.
        </p>

        {currentUser?.role && (
          <p className="mt-2 text-xs text-indigo-600">
            Analytics view: {currentUser.role}
          </p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <div
                  className={`rounded-xl p-3 ${stat.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatusChart data={taskStatus} />

        <ProductivityChart data={productivity} />
      </div>

      {/* Project Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Project Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Completion percentage across projects
          </p>
        </div>

        {projectProgress.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            No projects available.
          </div>
        ) : (
          <div className="space-y-5">
            {projectProgress.map((project) => (
              <div key={project.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {project.name}
                  </p>

                  <p className="shrink-0 text-sm font-semibold text-indigo-600">
                    {project.progress}%
                  </p>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {project.completedTasks} of {project.totalTasks} tasks completed
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
