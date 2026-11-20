
import { FolderKanban, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentProject = ({ projects = [] }) => {
  return (
    <section className="rounded-xl border border-border bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-main">
          Recent Projects
        </h2>

        <Link
          to="/projects"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-secondary">
          No projects available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const progress =
              project.totalTasks > 0
                ? Math.round(
                    (project.completedTasks / project.totalTasks) * 100
                  )
                : 0;

            return (
              <article
                key={project.id}
                className="rounded-xl border border-border p-4 transition hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-indigo-50 p-2 text-primary">
                    <FolderKanban size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-text-main">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-text-secondary">
                      {project.totalTasks} Tasks
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="font-medium text-text-main">
                    {project.completedTasks} completed
                  </span>

                  <span className="text-text-secondary">
                    {progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="mt-4 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  Open Project →
                </Link>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
};

export default RecentProject;
