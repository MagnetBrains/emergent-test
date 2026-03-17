import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, FolderOpen, LayoutDashboard, ListTodo, PauseCircle, Circle, XCircle } from "lucide-react";

// Sidebar Navigation
const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/tasks", label: "My Tasks", icon: ListTodo },
  ];

  return (
    <div data-testid="sidebar" className="w-56 bg-white border-r border-slate-200 min-h-screen p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-900">TaskFlow</h1>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-slate-900 text-white" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// Layout wrapper
const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="ml-56 flex-1">{children}</main>
  </div>
);

const Dashboard = () => {
  // Placeholder stats data
  const stats = {
    totalTasks: 24,
    completed: 8,
    inProgress: 12,
    overdue: 4,
    projects: 5
  };

  const recentTasks = [
    { id: 1, title: "Design homepage mockup", project: "Website Redesign", priority: "High", status: "In Progress" },
    { id: 2, title: "Review API documentation", project: "Backend API", priority: "Medium", status: "Pending" },
    { id: 3, title: "Setup CI/CD pipeline", project: "DevOps", priority: "High", status: "Completed" },
    { id: 4, title: "User testing session", project: "Mobile App", priority: "Low", status: "Overdue" },
  ];

  const projects = [
    { id: 1, name: "Website Redesign", tasks: 8, completed: 3, color: "#3B82F6" },
    { id: 2, name: "Backend API", tasks: 6, completed: 2, color: "#10B981" },
    { id: 3, name: "Mobile App", tasks: 10, completed: 3, color: "#F59E0B" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-500 bg-red-500/10";
      case "Medium": return "text-amber-500 bg-amber-500/10";
      case "Low": return "text-emerald-500 bg-emerald-500/10";
      default: return "text-slate-500 bg-slate-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "In Progress": return <Clock className="w-4 h-4 text-blue-500" />;
      case "Overdue": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div data-testid="dashboard" className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 data-testid="dashboard-title" className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's your task overview.</p>
      </div>

      {/* Stats Grid */}
      <div data-testid="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Tasks</p>
                <p data-testid="total-tasks" className="text-2xl font-bold text-slate-900 mt-1">{stats.totalTasks}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Completed</p>
                <p data-testid="completed-tasks" className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">In Progress</p>
                <p data-testid="in-progress-tasks" className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium">Overdue</p>
                <p data-testid="overdue-tasks" className="text-2xl font-bold text-red-500 mt-1">{stats.overdue}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <Card data-testid="recent-tasks-card" className="md:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div 
                  key={task.id} 
                  data-testid={`task-item-${task.id}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="text-sm font-medium text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.project}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects Overview */}
        <Card data-testid="projects-card" className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} data-testid={`project-item-${project.id}`} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="text-sm font-medium text-slate-900">{project.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{project.completed}/{project.tasks}</span>
                  </div>
                  <Progress 
                    value={(project.completed / project.tasks) * 100} 
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Tasks Page
const Tasks = () => {
  const tasks = [
    { id: 1, title: "Design homepage mockup", project: "Website Redesign", priority: "High", status: "Open", dueDate: "Jan 15, 2026" },
    { id: 2, title: "Review API documentation", project: "Backend API", priority: "Medium", status: "In Progress", dueDate: "Jan 18, 2026" },
    { id: 3, title: "Setup CI/CD pipeline", project: "DevOps", priority: "High", status: "Completed", dueDate: "Jan 10, 2026" },
    { id: 4, title: "User testing session", project: "Mobile App", priority: "Low", status: "On Hold", dueDate: "Jan 20, 2026" },
    { id: 5, title: "Database optimization", project: "Backend API", priority: "High", status: "Open", dueDate: "Jan 22, 2026" },
    { id: 6, title: "Write unit tests", project: "Website Redesign", priority: "Medium", status: "In Progress", dueDate: "Jan 17, 2026" },
    { id: 7, title: "Security audit", project: "DevOps", priority: "High", status: "Cancelled", dueDate: "Jan 12, 2026" },
    { id: 8, title: "Mobile responsive fixes", project: "Mobile App", priority: "Medium", status: "Open", dueDate: "Jan 25, 2026" },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "Open": return { icon: Circle, color: "text-blue-500", bg: "bg-blue-50 text-blue-700 border-blue-200" };
      case "In Progress": return { icon: Clock, color: "text-amber-500", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "Completed": return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "On Hold": return { icon: PauseCircle, color: "text-slate-500", bg: "bg-slate-100 text-slate-700 border-slate-200" };
      case "Cancelled": return { icon: XCircle, color: "text-red-500", bg: "bg-red-50 text-red-700 border-red-200" };
      default: return { icon: Circle, color: "text-slate-400", bg: "bg-slate-50 text-slate-600 border-slate-200" };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-amber-500";
      case "Low": return "bg-emerald-500";
      default: return "bg-slate-400";
    }
  };

  const statusCounts = {
    Open: tasks.filter(t => t.status === "Open").length,
    "In Progress": tasks.filter(t => t.status === "In Progress").length,
    "On Hold": tasks.filter(t => t.status === "On Hold").length,
    Completed: tasks.filter(t => t.status === "Completed").length,
    Cancelled: tasks.filter(t => t.status === "Cancelled").length,
  };

  return (
    <div data-testid="tasks-page" className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 data-testid="tasks-title" className="text-3xl font-bold text-slate-900 tracking-tight">My Tasks</h1>
        <p className="text-slate-500 mt-1">Manage and track all your tasks</p>
      </div>

      {/* Status Filter Pills */}
      <div data-testid="status-filters" className="flex flex-wrap gap-2 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = getStatusConfig(status);
          return (
            <button
              key={status}
              data-testid={`filter-${status.toLowerCase().replace(' ', '-')}`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors hover:opacity-80 ${config.bg}`}
            >
              <config.icon className="w-3.5 h-3.5" />
              {status}
              <span className="bg-white/50 px-1.5 py-0.5 rounded-full text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks Table */}
      <Card data-testid="tasks-table-card" className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="text-left py-4 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const statusConfig = getStatusConfig(task.status);
                  return (
                    <tr 
                      key={task.id} 
                      data-testid={`task-row-${task.id}`}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <span className="text-sm font-medium text-slate-900">{task.title}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-sm text-slate-600">{task.project}</span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <statusConfig.icon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className="text-sm text-slate-700">{task.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          <span className="text-sm text-slate-600">{task.priority}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-sm text-slate-500">{task.dueDate}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
