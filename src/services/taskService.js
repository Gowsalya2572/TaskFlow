
import { tasks as demoTasks } from "../data/tasks";

const STORAGE_KEY = "taskflow_tasks";

const createId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `task-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const getTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoTasks));
  return demoTasks;
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return tasks;
};

export const getTasksByProject = (projectId) =>
  getTasks().filter((task) => task.projectId === projectId);

export const getTaskById = (taskId) =>
  getTasks().find((task) => task.id === taskId) || null;

export const createTask = (taskData) => {
  const tasks = getTasks();

  const newTask = {
    id: createId(),
    title: taskData.title.trim(),
    description: taskData.description?.trim() || "",
    projectId: taskData.projectId,
    status: taskData.status || "TODO",
    priority: taskData.priority || "Medium",
    assigneeId: taskData.assigneeId || "",
    assigneeName: taskData.assigneeName || "Unassigned",
    dueDate: taskData.dueDate || "",
    comments: [],
    createdAt: new Date().toISOString(),
  };

  saveTasks([newTask, ...tasks]);
  return newTask;
};

export const updateTask = (taskId, updates) => {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, ...updates }
      : task
  );

  saveTasks(updatedTasks);

  return updatedTasks.find((task) => task.id === taskId) || null;
};

export const updateTaskStatus = (taskId, status) =>
  updateTask(taskId, { status });

export const deleteTask = (taskId) => {
  const tasks = getTasks();
  saveTasks(tasks.filter((task) => task.id !== taskId));
};

export const addTaskComment = (taskId, comment) => {
  const task = getTaskById(taskId);

  if (!task) return null;

  const newComment = {
    id: createId(),
    text: comment.trim(),
    createdAt: new Date().toISOString(),
  };

  return updateTask(taskId, {
    comments: [...(task.comments || []), newComment],
  });
};

export const deleteTasksByProject = (projectId) => {
  const tasks = getTasks();

  saveTasks(
    tasks.filter((task) => task.projectId !== projectId)
  );
};