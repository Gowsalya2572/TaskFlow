
import { useEffect, useState } from "react";
import { demoUsers } from "../../data/users";

const TaskForm = ({ task, projectId,  initialStatus = "TODO", onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: task?.status || initialStatus,
    assigneeId: "",
    dueDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      title: task?.title || "",
      description: task?.description || "",
      priority: task?.priority || "Medium",
      status: task?.status || "TODO",
      assigneeId: task?.assigneeId || "",
      dueDate: task?.dueDate || "",
    });

    setError("");
  }, [task,initialStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    const assignedUser = demoUsers.find(
      (user) => user.id === form.assigneeId
    );

    onSubmit({
      ...form,
      title: form.title.trim(),
      projectId,
      assigneeName: assignedUser?.name || "Unassigned",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="mb-1 block text-sm font-medium">
          Task title
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter task description"
          className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-border px-3 py-3 text-sm"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-border px-3 py-3 text-sm"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Assign to
        </label>

        <select
          name="assigneeId"
          value={form.assigneeId}
          onChange={handleChange}
          className="w-full rounded-lg border border-border px-3 py-3 text-sm"
        >
          <option value="">Unassigned</option>

          {demoUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Due date
        </label>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-border px-4 py-3 text-sm"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2.5 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          {task ? "Save Changes" : "Create Task"}
        </button>
      </div>

    </form>
  );
};

export default TaskForm;
