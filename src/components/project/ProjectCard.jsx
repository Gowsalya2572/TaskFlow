
import { FolderKanban, Pencil, Trash2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const progress =
    project.totalTasks > 0
      ? Math.round(
          (project.completedTasks / project.totalTasks) * 100
        )
      : 0;

  return (
    <article className="rounded-xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-primary">
          <FolderKanban size={22} />
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name}`}
            className="rounded-lg p-2 text-text-secondary hover:bg-slate-100 hover:text-primary"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(project.id)}
            aria-label={`Delete ${project.name}`}
            className="rounded-lg p-2 text-text-secondary hover:bg-red-50 hover:text-danger"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-text-main">
        {project.name}
      </h3>

      <p className="mt-1 min-h-10 text-sm text-text-secondary">
        {project.description || "No description provided."}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-text-secondary">
          {project.completedTasks} of {project.totalTasks} tasks completed
        </span>

        <span className="font-semibold text-text-main">
          {progress}%
        </span>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`${project.name} progress`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary hover:text-primary-hover"
      >
        Open project
        <ArrowUpRight size={17} />
      </Link>

    </article>
  );
};

export default ProjectCard;
