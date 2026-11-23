
import { useEffect, useState } from "react";

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(project?.name || "");
    setDescription(project?.description || "");
    setError("");
  }, [project]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    onSubmit({
      name,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="mb-1 block text-sm font-medium text-text-main">
          Project name
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter project name"
          className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-text-main">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe this project"
          rows={4}
          className="w-full resize-none rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
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
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-main hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
        >
          {project ? "Save Changes" : "Create Project"}
        </button>
      </div>

    </form>
  );
};

export default ProjectForm;
