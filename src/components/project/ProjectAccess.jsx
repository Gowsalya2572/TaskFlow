
import { Navigate, Outlet, useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { getProjects } from "../../services/projectService";

const ProjectAccess = () => {
  const { projectId } = useParams();
  const user = useAuthStore((state) => state.user);

  const projects = getProjects();

  const project = projects.find(
    (item) => item.id === projectId
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Admin can access every project
  if (user?.role === "Admin") {
    return <Outlet />;
  }

  // Project Manager can access assigned projects only
  if (
    user?.role === "Project Manager" &&
    project.managerId === user.id
  ) {
    return <Outlet />;
  }

  // Member can access projects they belong to
  if (
    user?.role === "Member" &&
    project.memberIds?.includes(user.id)
  ) {
    return <Outlet />;
  }

  // Viewer can access projects they are permitted to view
  if (
    user?.role === "Viewer" &&
    project.viewerIds?.includes(user.id)
  ) {
    return <Outlet />;
  }

  return <Navigate to="/projects" replace />;
};

export default ProjectAccess;
