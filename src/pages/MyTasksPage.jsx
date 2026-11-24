import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ClipboardList,
  CalendarDays,
  ArrowUpRight,
  Filter,
} from "lucide-react";

import { getTasks } from "../services/taskService";
import useAuthStore from "../store/authStore";

const statusStyles = {
  TODO: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-emerald-100 text-emerald-700",
};

const priorityStyles = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

const formatStatus = (status) => {
  const labels = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Completed",
  };

  return labels[status] || status;
};

const formatDate = (date) => {
  if (!date) return "No due date";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const MyTasksPage = () => {
  const currentUser = useAuthStore((state) => state.user);

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const role = currentUser?.role;

  // Filter tasks according to the logged-in user's role.
  const visibleTasks = useMemo(() => {
    if (!currentUser) return [];

    if (role === "Admin" || role === "Viewer") {
      return tasks;
    }

    if (role === "Member") {
      return tasks.filter(
        (task) => task.assigneeId === currentUser.id
      );
    }

    if (role === "Project Manager") {
      // Replace this with managed-project filtering
      // when project ownership is added.
      return tasks;
    }

    return [];
  }, [tasks, currentUser, role]);

  // Search and filters.
  const filteredTasks = visibleTasks.filter((task) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      task.title?.toLowerCase().includes(searchValue) ||
      task.description?.toLowerCase().includes(searchValue) ||
      task.assigneeName?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = visibleTasks.length;

  const todoTasks = visibleTasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = visibleTasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = visibleTasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "To Do",
      value: todoTasks,
      color: "bg-slate-100 text-slate-600",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: completedTasks,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track tasks, monitor progress and manage your work.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`mb-3 inline-flex rounded-lg px-3 py-2 text-lg font-bold ${stat.color}`}
            >
              {stat.value}
            </div>

            <p className="text-sm text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm outline-none sm:w-40"
            >
              <option value="ALL">All Status</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>
          </div>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Task List
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredTasks.length} tasks found
            </p>
          </div>

          <ClipboardList
            size={22}
            className="text-indigo-500"
          />
        </div>

        {filteredTasks.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <ClipboardList
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No tasks found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status] || statusStyles.TODO}`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {task.description || "No description available"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {formatDate(task.dueDate)}
                    </span>

                    <span>
                      Assigned to: {task.assigneeName || "Unassigned"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${priorityStyles[task.priority] || priorityStyles.Medium}`}
                  >
                    {task.priority || "Medium"}
                  </span>

                  <Link
                    to={`/tasks/${task.id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
                  >
                    View
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasksPage;
