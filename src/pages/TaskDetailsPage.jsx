
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MessageSquare, UserRound } from "lucide-react";

import {
  getTaskById,
  addTaskComment,
} from "../services/taskService";

const TaskDetailsPage = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const refreshTask = () => {
    setTask(getTaskById(taskId));
  };

  useEffect(() => {
    refreshTask();
  }, [taskId]);

  const handleAddComment = (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }

    addTaskComment(taskId, comment);
    setComment("");
    setError("");
    refreshTask();
  };

  if (!task) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-text-main">
          Task not found
        </h2>

        <Link to="/projects" className="mt-3 inline-block text-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const statusLabels = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <Link
        to={`/projects/${task.projectId}`}
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to Project Board
      </Link>

      <section className="rounded-xl border border-border bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Task Details
            </p>

            <h1 className="mt-2 text-2xl font-bold text-text-main">
              {task.title}
            </h1>
          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-primary">
            {statusLabels[task.status] || task.status}
          </span>
        </div>

        <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
          {task.description || "No description provided."}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-text-secondary">Priority</p>
            <p className="mt-1 text-sm font-semibold text-text-main">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Assigned to</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-text-main">
              <UserRound size={15} />
              {task.assigneeName || "Unassigned"}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-secondary">Due date</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-text-main">
              <CalendarDays size={15} />
              {task.dueDate || "Not set"}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-6">
        <div className="mb-5 flex items-center gap-2">
          <MessageSquare size={19} className="text-primary" />
          <h2 className="text-lg font-semibold text-text-main">
            Comments ({task.comments?.length || 0})
          </h2>
        </div>

        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full rounded-lg border border-border p-3 text-sm outline-none focus:border-primary"
          />

          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Add Comment
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          {task.comments?.length ? (
            task.comments.map((item) => (
              <article
                key={item.id}
                className="rounded-lg bg-slate-50 p-4"
              >
                <p className="text-sm text-text-main">
                  {item.text}
                </p>

                <p className="mt-2 text-xs text-text-secondary">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </p>
              </article>
            ))
          ) : (
            <p className="text-center text-sm text-text-secondary">
              No comments yet.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};

export default TaskDetailsPage;
