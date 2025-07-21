import { Circle, MessageSquare, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  completed: boolean
  priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  comments?: number
  timeSpent?: string
}

interface TaskListProps {
  title: string
  tasks: Task[]
  onTaskToggle: (taskId: string) => void
}

export function TaskList({ title, tasks, onTaskToggle }: TaskListProps) {
  const getPriorityIndicator = (priority?: string) => {
    const colors = {
      HIGH: 'bg-progress-high',
      MEDIUM: 'bg-progress-medium', 
      LOW: 'bg-progress-low'
    }
    return colors[priority as keyof typeof colors] || 'bg-muted-foreground'
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">{title} ({tasks.length})</h3>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={() => onTaskToggle(task.id)}
              className="data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
            
            <div className={`w-2 h-2 rounded-full ${getPriorityIndicator(task.priority)}`} />
            
            <div className="flex-1">
              <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                {task.title}
              </span>
            </div>

            {task.comments && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span className="text-xs">{task.comments}</span>
              </div>
            )}

            {task.timeSpent && (
              <span className="text-xs text-muted-foreground">{task.timeSpent}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}