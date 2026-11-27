TaskFlow – Task Management Web Application
TaskFlow is a responsive task and project management web application built with React. It helps users organize projects, manage tasks, track progress, and collaborate with team members through role-based access.

The application provides separate dashboards and permissions for Admins, Project Managers, Members, and Viewers.

🚀 Features
1. Authentication
- User registration and login.
- Password matching during login.
- Form validation and error handling.
- Demo authentication with browser local storage.
- Protected routes for authenticated users.
  
2. Dashboard
- Overview of projects and tasks.
- Task status summaries.
- Project progress tracking.
- Team activity overview.
  
3. Project Management
- Create and manage projects.
- View project details.
- Assign project members and viewers.
- Track project progress.
- Access projects based on user permissions.
  
4. Task Management
- Create and manage tasks.
- Assign tasks to team members.
- Update task status.
- View task details and descriptions.
- Organize tasks by project and status.
  
5. Team Management
- View team members.
- Manage user roles (Admin, Project Manager, Member, Viewer).
- Control access based on permissions.
  
6. Analytics
- View project progress.
- Track completed and pending tasks.
- Visualize task statistics.
  
7. Settings
- Manage user profile information.
- Update account preferences.
  
## 👥 User Roles & Permissions

| Role | Permissions |
|---|---|
| **Admin** | Manage users, projects, tasks, and workspace settings |
| **Project Manager** | Manage assigned projects, tasks, and project members |
| **Member** | Create projects, manage permitted tasks, and collaborate |
| **Viewer** | View assigned projects, tasks, and progress without editing |

> **Note:** Project-level access is separate from workspace roles. A Member who creates a project can manage that project as its owner, while a Viewer has read-only access to assigned projects.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and build tool |
| Tailwind CSS v4 | Styling and responsive design |
| JavaScript (ES6+) | Application logic |
| React Router  | Client-side navigation and protected routes |
| Zustand | Global state management |
| Lucide React | Icons |
| Recharts | Analytics and data visualization |
| LocalStorage / SessionStorage | Demo data persistence and authentication |
| Git & GitHub | Version control and source code management |
Vite	             Development server and build tool
Git & GitHub	     Version control and code hosting
