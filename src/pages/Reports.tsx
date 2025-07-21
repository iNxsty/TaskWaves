import { BarChart3, TrendingUp, Users, Clock, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Reports() {
  const reportData = {
    totalProjects: 4,
    completedTasks: 85,
    totalHours: 240,
    teamMembers: 12,
    productivity: 92,
    onTimeDelivery: 87
  }

  const projectProgress = [
    { name: 'Google', progress: 50, tasks: 25, total: 50, status: 'active' },
    { name: 'Slack', progress: 100, tasks: 30, total: 30, status: 'completed' },
    { name: 'Netflix', progress: 75, tasks: 30, total: 40, status: 'active' },
    { name: 'Spotify', progress: 25, tasks: 15, total: 60, status: 'active' }
  ]

  const timeData = [
    { project: 'Google', hours: 80, percentage: 33 },
    { project: 'Slack', hours: 60, percentage: 25 },
    { project: 'Netflix', hours: 70, percentage: 29 },
    { project: 'Spotify', hours: 30, percentage: 13 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">Analytics and insights for your projects</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-foreground">{reportData.totalProjects}</div>
          <div className="text-sm text-muted-foreground">Total Projects</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-success">{reportData.completedTasks}</div>
          <div className="text-sm text-muted-foreground">Completed Tasks</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-primary">{reportData.totalHours}h</div>
          <div className="text-sm text-muted-foreground">Total Hours</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-warning">{reportData.teamMembers}</div>
          <div className="text-sm text-muted-foreground">Team Members</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-success">{reportData.productivity}%</div>
          <div className="text-sm text-muted-foreground">Productivity</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-primary">{reportData.onTimeDelivery}%</div>
          <div className="text-sm text-muted-foreground">On-Time Delivery</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Progress */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Project Progress
          </h3>
          <div className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.name}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-card-foreground">{project.name}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      project.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{project.tasks}/{project.total} tasks</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Time Distribution */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Distribution
          </h3>
          <div className="space-y-4">
            {timeData.map((item) => (
              <div key={item.project}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-card-foreground">{item.project}</span>
                  <span className="text-sm text-muted-foreground">{item.hours}h ({item.percentage}%)</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Performance Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className="text-3xl font-bold text-success mb-2">+23%</div>
            <div className="text-sm text-muted-foreground">Task Completion Rate</div>
            <div className="text-xs text-success mt-1">vs last month</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className="text-3xl font-bold text-primary mb-2">-15%</div>
            <div className="text-sm text-muted-foreground">Average Task Time</div>
            <div className="text-xs text-success mt-1">improvement</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <div className="text-3xl font-bold text-warning mb-2">4.8/5</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            <div className="text-xs text-success mt-1">+0.3 from last quarter</div>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'John Doe', tasks: 24, efficiency: 95 },
            { name: 'Jane Smith', tasks: 18, efficiency: 92 },
            { name: 'Bob Wilson', tasks: 22, efficiency: 88 },
            { name: 'Alice Brown', tasks: 20, efficiency: 90 }
          ].map((member) => (
            <div key={member.name} className="p-4 rounded-lg bg-muted/30">
              <div className="font-medium text-card-foreground mb-2">{member.name}</div>
              <div className="text-sm text-muted-foreground mb-1">{member.tasks} tasks completed</div>
              <div className="text-sm font-medium text-success">{member.efficiency}% efficiency</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}