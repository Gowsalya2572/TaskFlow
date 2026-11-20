
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Calculate dashboard statistics
export const getDashboardStats = (tasks = []) => {
  const today = getTodayDate();

  const totalTasks = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const overdue = tasks.filter(
    (task) =>
      task.status !== "DONE" &&
      task.dueDate < today
  ).length;

  return {
    totalTasks,
    completed,
    inProgress,
    overdue,
  };
};

// Get recently updated projects
export const getRecentProjects = (projects = [], limit = 3) => {
  return [...projects]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) - new Date(a.updatedAt)
    )
    .slice(0, limit);
};

// Get tasks assigned to the current user
export const getMyTasks = (tasks = [], userId) => {
  if (!userId) return [];

  return tasks.filter(
    (task) => task.assigneeId === userId
  );
};
