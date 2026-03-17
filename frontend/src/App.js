import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, FolderOpen } from "lucide-react";

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
    <div data-testid="dashboard" className="min-h-screen bg-slate-50 p-6 md:p-10">
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
