import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { Plus, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

type ProjectType = {
  id: string
  title: string
  company: string
  logo: string
  progress: number
  totalTasks: number
  completedTasks: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  dueDate: string
  teamMembers: Array<{
    id: string
    name: string
    initials: string
    avatar?: string
  }>
  platforms: string[]
  status: 'active' | 'completed'
}

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Formulário para novo projeto
  const [newProject, setNewProject] = useState<{
    title: string
    company: string
    description: string
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    dueDate: string
    platforms: string[]
    totalTasks: number
  }>({
    title: '',
    company: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
    platforms: [],
    totalTasks: 0
  })

  const availablePlatforms = ['WEB APP', 'MOBILE APP', 'IOS APP', 'ANDROID', 'UI/UX', 'BACKEND']

  const [projects, setProjects] = useState<ProjectType[]>([
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

  const handleAddProject = () => {
    if (!newProject.title || !newProject.company) {
      toast({
        title: "Erro",
        description: "Nome do projeto e empresa são obrigatórios",
        variant: "destructive"
      })
      return
    }

    const project: ProjectType = {
      id: (projects.length + 1).toString(),
      title: newProject.title,
      company: newProject.company,
      logo: newProject.title.charAt(0).toUpperCase(),
      progress: 0,
      totalTasks: newProject.totalTasks || 10,
      completedTasks: 0,
      priority: newProject.priority,
      dueDate: newProject.dueDate || 'TBD',
      teamMembers: [
        { id: '1', name: 'You', initials: 'ME' }
      ],
      platforms: newProject.platforms,
      status: 'active'
    }

    setProjects([...projects, project])
    
    // Reset form
    setNewProject({
      title: '',
      company: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
      platforms: [],
      totalTasks: 0
    })
    
    setIsDialogOpen(false)
    
    toast({
      title: "Projeto criado!",
      description: `${project.title} foi adicionado com sucesso.`
    })
  }

  const togglePlatform = (platform: string) => {
    setNewProject(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and track your project progress</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Name *</Label>
                  <Input
                    id="title"
                    placeholder="Enter project name"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={newProject.company}
                    onChange={(e) => setNewProject(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the project"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newProject.priority} 
                    onValueChange={(value: 'HIGH' | 'MEDIUM' | 'LOW') => 
                      setNewProject(prev => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tasks">Estimated Tasks</Label>
                  <Input
                    id="tasks"
                    type="number"
                    placeholder="Number of tasks"
                    value={newProject.totalTasks || ''}
                    onChange={(e) => setNewProject(prev => ({ 
                      ...prev, 
                      totalTasks: parseInt(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Platforms</Label>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((platform) => (
                    <Badge
                      key={platform}
                      variant={newProject.platforms.includes(platform) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => togglePlatform(platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
      <motion.div 
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}
        layout
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            layout
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first project to get started'}
          </p>
        </div>
      )}
    </motion.div>
  )
}