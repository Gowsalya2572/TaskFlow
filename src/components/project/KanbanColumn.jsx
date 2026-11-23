
import { Plus } from "lucide-react";
import TaskCard from "../task/TaskCard";

const columnStyles = {
  TODO: "border-t-slate-400",
  IN_PROGRESS: "border-t-orange-400",
  DONE: "border-t-green-500",
};

const KanbanColumn = ({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) => {
  const handleDrop = (event) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("taskId");

    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  return (
    <section
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={`min-h-96 rounded-xl border border-border border-t-4 bg-slate-50/80 p-3 ${columnStyles[status]}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-text-main">
            {title}
          </h3>

          <span className="rounded-full bg-white px-2 py-0.5 text-xs text-text-secondary">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onAddTask}
          aria-label={`Add task to ${title}`}
          className="rounded-lg p-1.5 text-text-secondary hover:bg-white hover:text-primary"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("taskId", task.id);
              event.dataTransfer.effectAllowed = "move";
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-white/70 p-6 text-center text-xs text-text-secondary">
            Drop a task here
          </div>
        )}
      </div>
    </section>
  );
};

export default KanbanColumn;
