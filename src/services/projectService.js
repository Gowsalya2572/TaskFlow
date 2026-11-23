
import { projects as demoProjects } from "../data/projects";

const STORAGE_KEY = "taskflow_projects";

const createId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `project-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const getProjects = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoProjects));
  return demoProjects;
};

const saveProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects;
};

export const createProject = (projectData) => {
  const projects = getProjects();

  const newProject = {
    id: createId(),
    name: projectData.name.trim(),
    description: projectData.description.trim(),
    totalTasks: 0,
    completedTasks: 0,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  saveProjects([newProject, ...projects]);
  return newProject;
};

export const updateProject = (projectId, updates) => {
  const projects = getProjects();

  const updatedProjects = projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          ...updates,
          name: updates.name?.trim() ?? project.name,
          description:
            updates.description?.trim() ?? project.description,
          updatedAt: new Date().toISOString().slice(0, 10),
        }
      : project
  );

  saveProjects(updatedProjects);

  return updatedProjects.find((project) => project.id === projectId);
};

export const deleteProject = (projectId) => {
  const projects = getProjects();

  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );

  saveProjects(updatedProjects);
  return updatedProjects;
};

export const getProjectById = (projectId) => {
  return getProjects().find((project) => project.id === projectId) || null;
};
