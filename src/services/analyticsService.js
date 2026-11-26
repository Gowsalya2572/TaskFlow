
import { getTasks } from "../services/taskService";
import { getProjects } from "../services/projectService";
import { getTeamMembers } from "../services/teamService";

// Get overall analytics data
export const getAnalyticsSummary = () => {
  const tasks = getTasks();
  const projects = getProjects();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "DONE"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) =>
      project.totalTasks > 0 &&
      project.completedTasks === project.totalTasks
  ).length;

  return {
    totalProjects,
    completedProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    completionRate,
  };
};

// Get task status chart data
export const getTaskStatusData = (tasks = getTasks()) => {
  return [
    {
      name: "To Do",
      value: tasks.filter((task) => task.status === "TODO").length,
    },
    {
      name: "In Progress",
      value: tasks.filter(
        (task) => task.status === "IN_PROGRESS"
      ).length,
    },
    {
      name: "Completed",
      value: tasks.filter((task) => task.status === "DONE").length,
    },
  ];
};

// Get team productivity
export const getProductivityData = (
  tasks = getTasks(),
  members = getTeamMembers()
) => {
  return members.map((member) => {
    const memberTasks = tasks.filter(
      (task) => task.assigneeId === member.id
    );

    const completedTasks = memberTasks.filter(
      (task) => task.status === "DONE"
    ).length;

    return {
      name: member.name.split(" ")[0],
      totalTasks: memberTasks.length,
      completedTasks,
      pendingTasks: memberTasks.length - completedTasks,
    };
  });
};

// Get project progress chart data
export const getProjectProgressData = (projects = getProjects()) => {
  return projects.map((project) => {
    const totalTasks = project.totalTasks || 0;
    const completedTasks = project.completedTasks || 0;

    const progress =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    return {
      name: project.name,
      progress,
      totalTasks,
      completedTasks,
    };
  });
};

// Get analytics according to the logged-in role
export const getRoleAnalytics = (user) => {
  const tasks = getTasks();
  const projects = getProjects();
  const members = getTeamMembers();

  if (!user) {
    return {
      summary: getAnalyticsSummary(),
      taskStatus: getTaskStatusData(tasks),
      productivity: getProductivityData(tasks, members),
      projectProgress: getProjectProgressData(projects),
    };
  }

  if (user.role === "Member") {
    const myTasks = tasks.filter(
      (task) => task.assigneeId === user.id
    );

    const myProjects = projects.filter((project) =>
      myTasks.some((task) => task.projectId === project.id)
    );

    return {
      summary: {
        totalProjects: myProjects.length,
        completedProjects: 0,
        totalTasks: myTasks.length,
        completedTasks: myTasks.filter(
          (task) => task.status === "DONE"
        ).length,
        inProgressTasks: myTasks.filter(
          (task) => task.status === "IN_PROGRESS"
        ).length,
        todoTasks: myTasks.filter(
          (task) => task.status === "TODO"
        ).length,
        completionRate:
          myTasks.length > 0
            ? Math.round(
                (myTasks.filter((task) => task.status === "DONE").length /
                  myTasks.length) *
                  100
              )
            : 0,
      },
      taskStatus: getTaskStatusData(myTasks),
      productivity: getProductivityData(myTasks, [user]),
      projectProgress: getProjectProgressData(myProjects),
    };
  }

  // Admin, Project Manager and Viewer currently use overall demo analytics.
  return {
    summary: getAnalyticsSummary(),
    taskStatus: getTaskStatusData(tasks),
    productivity: getProductivityData(tasks, members),
    projectProgress: getProjectProgressData(projects),
  };
};
