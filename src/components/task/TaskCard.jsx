
import { CalendarDays, Pencil, Trash2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-green-50 text-green-600",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (date) => {
    if (!date) return "No due date";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      { day: "numeric", month: "short" }
    );
  };

  return (
    <article className="rounded-xl border border-border bg-white p-4 shadow-sm">

      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/tasks/${task.id}`}
          className="min-w-0 flex-1 text-sm font-semibold text-text-main hover:text-primary"
        >
          {task.title}
        </Link>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded p-1.5 text-text-secondary hover:bg-slate-100"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            className="rounded p-1.5 text-text-secondary hover:bg-red-50 hover:text-danger"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 line-clamp-2 text-xs text-text-secondary">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority}
        </span>

        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <CalendarDays size={13} />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs text-text-secondary">
        <UserRound size={14} />
        {task.assigneeName || "Unassigned"}
      </div>

    </article>
  );
};

export default TaskCard;
