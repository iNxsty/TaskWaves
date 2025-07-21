import { Star, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectCardProps {
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
    avatar?: string
    initials: string
  }>
  platforms: string[]
}

export function ProjectCard({
  title,
  company,
  logo,
  progress,
  totalTasks,
  completedTasks,
  priority,
  dueDate,
  teamMembers,
  platforms
}: ProjectCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-progress-high text-white'
      case 'MEDIUM': return 'bg-progress-medium text-black'
      case 'LOW': return 'bg-progress-low text-white'
      default: return 'bg-muted'
    }
  }

  const getProgressColor = () => {
    if (progress >= 80) return 'bg-progress-low'
    if (progress >= 50) return 'bg-progress-medium'
    return 'bg-progress-high'
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
            {logo}
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">SELECT PROGRESS</span>
          <Badge className={getPriorityColor(priority)} variant="secondary">
            {priority}
          </Badge>
        </div>
        <div className="mb-2">
          <span className="text-sm font-medium">Task Done: {completedTasks} / {totalTasks}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {platforms.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
        <div className="flex items-center -space-x-2">
          {teamMembers.slice(0, 4).map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
            </Avatar>
          ))}
          {teamMembers.length > 4 && (
            <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">
              +{teamMembers.length - 4}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        DUE DATE: <span className="text-destructive font-medium">{dueDate}</span>
      </div>
    </div>
  )
}