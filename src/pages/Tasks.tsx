import { useState } from "react"
import { TaskList } from "@/components/TaskList"
import { Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Create wireframe for mobile app', completed: false, priority: 'HIGH' as const, project: 'Google' },
    { id: '2', title: 'Design Slack logo variations', completed: false, priority: 'MEDIUM' as const, comments: 3, project: 'Slack' },
    { id: '3', title: 'Dashboard UI/UX improvements', completed: false, priority: 'LOW' as const, project: 'Internal' },
    { id: '4', title: 'User research analysis', completed: true, priority: 'HIGH' as const, project: 'Google' },
    { id: '5', title: 'Create color palette', completed: true, priority: 'MEDIUM' as const, project: 'Slack' },
    { id: '6', title: 'Prototype testing', completed: false, priority: 'HIGH' as const, timeSpent: '2h 30m', project: 'Google' },
    { id: '7', title: 'Icon set design', completed: false, priority: 'LOW' as const, comments: 1, project: 'Internal' },
    { id: '8', title: 'Brand guidelines document', completed: true, priority: 'MEDIUM' as const, project: 'Slack' },
  ])

  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'MEDIUM' as const,
        project: 'New'
      }
      setTasks([newTaskObj, ...tasks])
      setNewTask('')
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === 'completed') return task.completed && matchesSearch
    if (filter === 'pending') return !task.completed && matchesSearch
    if (filter === 'high') return task.priority === 'HIGH' && matchesSearch
    return matchesSearch
  })

  const pendingTasks = filteredTasks.filter(task => !task.completed)
  const completedTasks = filteredTasks.filter(task => task.completed)

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'HIGH').length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tasks</h1>
        <p className="text-muted-foreground">Manage your daily tasks and projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-foreground">{taskStats.total}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-success">{taskStats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-warning">{taskStats.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-destructive">{taskStats.high}</div>
          <div className="text-sm text-muted-foreground">High Priority</div>
        </div>
      </div>

      {/* Add Task */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold text-card-foreground mb-4">Add New Task</h3>
        <div className="flex gap-3">
          <Input
            placeholder="Enter task description..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-1"
          />
          <Button onClick={handleAddTask} className="px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Tasks
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'high' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('high')}
          >
            High Priority
          </Button>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pendingTasks.length > 0 && (
          <TaskList
            title="Pending Tasks"
            tasks={pendingTasks}
            onTaskToggle={handleTaskToggle}
          />
        )}
        
        {completedTasks.length > 0 && (
          <TaskList
            title="Completed Tasks"
            tasks={completedTasks}
            onTaskToggle={handleTaskToggle}
          />
        )}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first task to get started'}
          </p>
        </div>
      )}
    </div>
  )
}