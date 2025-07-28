import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { TaskList } from "@/components/TaskList"
import { Calendar } from "@/components/Calendar"
import { MessagesList } from "@/components/MessagesList"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Create wireframe', completed: false, priority: 'HIGH' as const, dueDate: new Date('2025-07-28') },
    { id: '2', title: 'Slack Logo Design', completed: false, priority: 'MEDIUM' as const, comments: 3, dueDate: new Date('2025-07-29') },
    { id: '3', title: 'Dashboard Design', completed: false, priority: 'LOW' as const, dueDate: new Date('2025-07-30') },
    { id: '4', title: 'Create wireframe', completed: true, priority: 'HIGH' as const, dueDate: new Date('2025-07-27') },
    { id: '5', title: 'Google Logo Design', completed: true, priority: 'MEDIUM' as const, dueDate: new Date('2025-07-26') },
    { id: '6', title: 'Slack Logo Design', completed: false, priority: 'HIGH' as const, dueDate: new Date('2025-07-31') },
    { id: '7', title: 'Dashboard Design', completed: false, priority: 'LOW' as const, dueDate: new Date('2025-08-01') },
  ])
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const filteredTasks = selectedDate 
    ? tasks.filter(task => 
        task.dueDate && task.dueDate.toDateString() === selectedDate.toDateString()
      )
    : tasks

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          {selectedDate 
            ? `Tasks for ${selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}`
            : 'Welcome back! Here\'s your project overview.'
          }
        </p>
      </motion.div>

      {/* Projects Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Tasks, Calendar and Messages Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <TaskList 
            title={selectedDate ? "Tasks for Selected Date" : "My Tasks"} 
            tasks={filteredTasks} 
            onTaskToggle={handleTaskToggle}
          />
          {selectedDate && (
            <motion.button
              onClick={() => setSelectedDate(undefined)}
              className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Clear date filter
            </motion.button>
          )}
        </motion.div>
        
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Calendar 
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </motion.div>
        
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <MessagesList messages={messages} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}