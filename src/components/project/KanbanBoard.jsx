
import KanbanColumn from "./KanbanColumn";

const columns = [
  { title: "To Do", status: "TODO" },
  { title: "In Progress", status: "IN_PROGRESS" },
  { title: "Done", status: "DONE" },
];

const KanbanBoard = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status
        );

        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={columnTasks}
            onAddTask={() => onAddTask(column.status)}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onDropTask={onDropTask}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;
