import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { Plus, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Google',
      company: 'Google Inc.',
      logo: 'G',
      progress: 50,
      totalTasks: 50,
      completedTasks: 25,
      priority: 'HIGH' as const,
      dueDate: '20 JUNE',
      teamMembers: [
        { id: '1', name: 'John', initials: 'JD', avatar: '/avatar1.jpg' },
        { id: '2', name: 'Jane', initials: 'JS', avatar: '/avatar2.jpg' },
        { id: '3', name: 'Bob', initials: 'BW', avatar: '/avatar3.jpg' },
        { id: '4', name: 'Alice', initials: 'AB', avatar: '/avatar4.jpg' },
        { id: '5', name: 'Charlie', initials: 'CH' },
      ],
      platforms: ['IOS APP', 'UI/UX'],
      status: 'active'
    },
    {
      id: '2',
      title: 'Slack',
      company: 'Slack corporation',
      logo: 'S',
      progress: 100,
      totalTasks: 30,
      completedTasks: 30,
      priority: 'MEDIUM' as const,
      dueDate: '20 JUNE',
      teamMembers: [
        { id: '1', name: 'John', initials: 'JD', avatar: '/avatar1.jpg' },
        { id: '2', name: 'Jane', initials: 'JS', avatar: '/avatar2.jpg' },
        { id: '3', name: 'Bob', initials: 'BW', avatar: '/avatar3.jpg' },
        { id: '4', name: 'Alice', initials: 'AB', avatar: '/avatar4.jpg' },
        { id: '5', name: 'Charlie', initials: 'CH' },
      ],
      platforms: ['IOS APP', 'ANDROID'],
      status: 'completed'
    },
    {
      id: '3',
      title: 'Netflix',
      company: 'Netflix Inc.',
      logo: 'N',
      progress: 75,
      totalTasks: 40,
      completedTasks: 30,
      priority: 'HIGH' as const,
      dueDate: '15 JULY',
      teamMembers: [
        { id: '1', name: 'Sarah', initials: 'SK', avatar: '/avatar5.jpg' },
        { id: '2', name: 'Mike', initials: 'MP', avatar: '/avatar6.jpg' },
        { id: '3', name: 'Lisa', initials: 'LR', avatar: '/avatar7.jpg' },
      ],
      platforms: ['WEB APP', 'UI/UX'],
      status: 'active'
    },
    {
      id: '4',
      title: 'Spotify',
      company: 'Spotify AB',
      logo: 'S',
      progress: 25,
      totalTasks: 60,
      completedTasks: 15,
      priority: 'LOW' as const,
      dueDate: '30 AUGUST',
      teamMembers: [
        { id: '1', name: 'David', initials: 'DL', avatar: '/avatar8.jpg' },
        { id: '2', name: 'Emma', initials: 'EW', avatar: '/avatar9.jpg' },
      ],
      platforms: ['MOBILE APP', 'ANDROID'],
      status: 'active'
    }
  ])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'active') return project.status === 'active' && matchesSearch
    if (filter === 'completed') return project.status === 'completed' && matchesSearch
    if (filter === 'high') return project.priority === 'HIGH' && matchesSearch
    return matchesSearch
  })

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    overdue: projects.filter(p => p.progress < 50 && p.status === 'active').length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and track your project progress</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-foreground">{projectStats.total}</div>
          <div className="text-sm text-muted-foreground">Total Projects</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-primary">{projectStats.active}</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-success">{projectStats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-destructive">{projectStats.overdue}</div>
          <div className="text-sm text-muted-foreground">Behind Schedule</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Projects
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active
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
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first project to get started'}
          </p>
        </div>
      )}
    </div>
  )
}