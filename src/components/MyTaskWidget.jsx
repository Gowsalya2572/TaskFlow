
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

const statusStyles = {
  TODO: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-orange-50 text-orange-600",
  DONE: "bg-green-50 text-green-600",
};

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-green-50 text-green-600",
};

const formatDate = (date) => {
  if (!date) return "No due date";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );
};

const MyTaskWidget = ({ tasks = [] }) => {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-main">
          My Tasks
        </h2>

        <Link
          to="/tasks"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          No tasks assigned to you yet.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <article
              key={task.id}
              className="flex flex-col gap-3 border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                    task.status === "DONE"
                      ? "bg-green-500"
                      : task.status === "IN_PROGRESS"
                        ? "bg-orange-500"
                        : "bg-slate-400"
                  }`}
                />

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-text-main">
                    {task.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusStyles[task.status] || statusStyles.TODO
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <CalendarDays size={13} />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  priorityStyles[task.priority] || priorityStyles.Low
                }`}
              >
                {task.priority}
              </span>
            </article>
          ))}
        </div>
      )}

    </section>
  );
};

export default MyTaskWidget;
