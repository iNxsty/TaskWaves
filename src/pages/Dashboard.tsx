import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { TaskList } from "@/components/TaskList"
import { Calendar } from "@/components/Calendar"
import { MessagesList } from "@/components/MessagesList"

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Create wireframe', completed: false, priority: 'HIGH' as const },
    { id: '2', title: 'Slack Logo Design', completed: false, priority: 'MEDIUM' as const, comments: 3 },
    { id: '3', title: 'Dashboard Design', completed: false, priority: 'LOW' as const },
    { id: '4', title: 'Create wireframe', completed: true, priority: 'HIGH' as const },
    { id: '5', title: 'Google Logo Design', completed: true, priority: 'MEDIUM' as const },
    { id: '6', title: 'Slack Logo Design', completed: false, priority: 'HIGH' as const },
    { id: '7', title: 'Dashboard Design', completed: false, priority: 'LOW' as const },
  ])

  const projects = [
    {
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
      platforms: ['IOS APP', 'UI/UX']
    },
    {
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
      platforms: ['IOS APP', 'ANDROID']
    }
  ]

  const messages = [
    {
      id: '1',
      sender: 'John Doe',
      initials: 'JD',
      message: 'Hi Angelina! How are you?',
      time: 'now',
      isOnline: true
    },
    {
      id: '2',
      sender: 'Charmie',
      initials: 'CH',
      message: 'Do you need that design?',
      time: '2m',
      isOnline: true
    },
    {
      id: '3',
      sender: 'Jason Mandela',
      initials: 'JM',
      message: 'What is the price of hourly...',
      time: '5m',
      isOnline: false
    },
    {
      id: '4',
      sender: 'Charlie Chu',
      initials: 'CC',
      message: 'Awesome!',
      time: '10m',
      isOnline: true
    }
  ]

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* Tasks, Calendar and Messages Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TaskList 
            title="My Tasks" 
            tasks={tasks} 
            onTaskToggle={handleTaskToggle}
          />
        </div>
        
        <div className="lg:col-span-1">
          <Calendar />
        </div>
        
        <div className="lg:col-span-1">
          <MessagesList messages={messages} />
        </div>
      </div>
    </div>
  )
}