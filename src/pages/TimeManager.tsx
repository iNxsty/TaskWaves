import { useState } from "react"
import { Clock, Play, Pause, Square, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TimeEntry {
  id: string
  project: string
  task: string
  duration: number
  date: string
  status: 'completed' | 'active' | 'paused'
}

export default function TimeManager() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentProject, setCurrentProject] = useState('Google')
  const [currentTask, setCurrentTask] = useState('Design Review')

  const [timeEntries] = useState<TimeEntry[]>([
    { id: '1', project: 'Google', task: 'Wireframe Creation', duration: 120, date: '2024-02-05', status: 'completed' },
    { id: '2', project: 'Slack', task: 'Logo Design', duration: 90, date: '2024-02-05', status: 'completed' },
    { id: '3', project: 'Google', task: 'User Research', duration: 180, date: '2024-02-04', status: 'completed' },
    { id: '4', project: 'Slack', task: 'Dashboard UI', duration: 150, date: '2024-02-04', status: 'completed' },
    { id: '5', project: 'Netflix', task: 'Prototype Testing', duration: 240, date: '2024-02-03', status: 'completed' },
  ])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const todayTotal = timeEntries
    .filter(entry => entry.date === '2024-02-05')
    .reduce((total, entry) => total + entry.duration, 0) + currentTime

  const weekTotal = timeEntries.reduce((total, entry) => total + entry.duration, 0) + currentTime

  const projectBreakdown = timeEntries.reduce((acc, entry) => {
    acc[entry.project] = (acc[entry.project] || 0) + entry.duration
    return acc
  }, {} as Record<string, number>)

  const toggleTimer = () => {
    setIsTracking(!isTracking)
  }

  const stopTimer = () => {
    setIsTracking(false)
    setCurrentTime(0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Time Manager</h1>
        <p className="text-muted-foreground">Track your time and analyze productivity</p>
      </div>

      {/* Timer Section */}
      <div className="bg-card rounded-xl p-8 border border-border text-center">
        <div className="text-6xl font-mono font-bold text-primary mb-6">
          {formatTime(currentTime)}
        </div>
        
        <div className="mb-6">
          <p className="text-lg font-medium text-card-foreground">{currentProject}</p>
          <p className="text-muted-foreground">{currentTask}</p>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={toggleTimer} size="lg" className="px-8">
            {isTracking ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button onClick={stopTimer} variant="outline" size="lg">
            <Square className="w-5 h-5 mr-2" />
            Stop
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-foreground">{formatTime(todayTotal)}</div>
          <div className="text-sm text-muted-foreground">Today</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-primary">{formatTime(weekTotal)}</div>
          <div className="text-sm text-muted-foreground">This Week</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-success">{timeEntries.length}</div>
          <div className="text-sm text-muted-foreground">Sessions</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-warning">{formatTime(Math.round(weekTotal / 5))}</div>
          <div className="text-sm text-muted-foreground">Daily Average</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Breakdown */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Project Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(projectBreakdown).map(([project, time]) => {
              const percentage = (time / weekTotal) * 100
              return (
                <div key={project}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-card-foreground">{project}</span>
                    <span className="text-sm text-muted-foreground">{formatTime(time)}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Sessions
          </h3>
          <div className="space-y-3">
            {timeEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <div className="font-medium text-card-foreground">{entry.task}</div>
                  <div className="text-sm text-muted-foreground">{entry.project}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-card-foreground">{formatTime(entry.duration)}</div>
                  <div className="text-sm text-muted-foreground">{entry.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Insights */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Productivity Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-lg font-semibold text-success">+15%</div>
            <div className="text-sm text-muted-foreground">vs last week</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-lg font-semibold text-primary">Peak: 2-4 PM</div>
            <div className="text-sm text-muted-foreground">Most productive hours</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="text-lg font-semibold text-warning">Google</div>
            <div className="text-sm text-muted-foreground">Top project this week</div>
          </div>
        </div>
      </div>
    </div>
  )
}