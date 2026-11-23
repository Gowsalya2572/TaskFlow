
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import useProjectStore from "../store/projectStore";

import {
  getTasksByProject,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";

import KanbanBoard from "../components/project/KanbanBoard";
import TaskForm from "../components/task/TaskForm";

const ProjectBoardPage = () => {
  const { projectId } = useParams();

  const project = useProjectStore((state) =>
    state.projects.find((item) => item.id === projectId)
  );

  const editProject = useProjectStore((state) => state.editProject);

  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("TODO");

  const refreshTasks = useCallback(() => {
    setTasks(getTasksByProject(projectId));
  }, [projectId]);

  const refreshProjectStats = useCallback(() => {
    const projectTasks = getTasksByProject(projectId);

    editProject(projectId, {
      totalTasks: projectTasks.length,
      completedTasks: projectTasks.filter(
        (task) => task.status === "DONE"
      ).length,
    });
  }, [projectId, editProject]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  useEffect(() => {
    if (project) {
      refreshProjectStats();
    }
  }, [projectId, project?.id, refreshProjectStats]);

  if (!project) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <h2 className="text-xl font-bold">Project not found</h2>
        <Link to="/projects" className="mt-3 inline-block text-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const handleAddTask = (status = "TODO") => {
    setSelectedTask(null);
    setDefaultStatus(status);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setDefaultStatus(task.status);
    setIsFormOpen(true);
  };

  const handleSubmitTask = (formData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, formData);
    } else {
      createTask({
        ...formData,
        status: formData.status || defaultStatus,
      });
    }

    refreshTasks();
    refreshProjectStats();
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm("Delete this task?");

    if (!confirmed) return;

    deleteTask(taskId);
    refreshTasks();
    refreshProjectStats();
  };

  const handleDropTask = (taskId, status) => {
    updateTaskStatus(taskId, status);
    refreshTasks();
    refreshProjectStats();
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/projects"
            className="mb-3 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <h1 className="text-2xl font-bold text-text-main">
            {project.name}
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            {project.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleAddTask()}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
        <span>{tasks.length} Total Tasks</span>
        <span>
          {tasks.filter((task) => task.status === "DONE").length} Completed
        </span>
      </div>

      <KanbanBoard
        tasks={tasks}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onDropTask={handleDropTask}
      />

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-form-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="task-form-title"
              className="mb-5 text-xl font-bold text-text-main"
            >
              {selectedTask ? "Edit Task" : "Create Task"}
            </h2>
   
           <TaskForm
  task={selectedTask}
  initialStatus={defaultStatus}
  projectId={projectId}
  onSubmit={handleSubmitTask}
  onCancel={() => setIsFormOpen(false)}
/>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectBoardPage;
