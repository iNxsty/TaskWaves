import { useState } from "react"
import { Plus, Search, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/Calendar"

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: 'meeting' | 'deadline' | 'reminder'
  project?: string
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Design Review Meeting', date: '2024-02-05', time: '10:00', type: 'meeting', project: 'Google' },
    { id: '2', title: 'Project Deadline', date: '2024-02-06', time: '18:00', type: 'deadline', project: 'Slack' },
    { id: '3', title: 'Team Standup', date: '2024-02-07', time: '09:00', type: 'meeting' },
    { id: '4', title: 'Client Presentation', date: '2024-02-08', time: '14:00', type: 'meeting', project: 'Google' },
    { id: '5', title: 'Code Review', date: '2024-02-09', time: '16:00', type: 'reminder' },
  ])

  const [newEvent, setNewEvent] = useState('')

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-primary text-primary-foreground'
      case 'deadline': return 'bg-destructive text-destructive-foreground'
      case 'reminder': return 'bg-warning text-warning-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const todaysEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0]
    return event.date === today
  })

  const upcomingEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0]
    return event.date > today
  }).slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-foreground">{todaysEvents.length}</div>
          <div className="text-sm text-muted-foreground">Today's Events</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-primary">{events.filter(e => e.type === 'meeting').length}</div>
          <div className="text-sm text-muted-foreground">Meetings This Week</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-destructive">{events.filter(e => e.type === 'deadline').length}</div>
          <div className="text-sm text-muted-foreground">Upcoming Deadlines</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar />
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-card-foreground mb-4">Today's Events</h3>
            {todaysEvents.length > 0 ? (
              <div className="space-y-3">
                {todaysEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type).split(' ')[0]}`} />
                    <div className="flex-1">
                      <div className="font-medium text-card-foreground">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No events today</p>
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-card-foreground mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type).split(' ')[0]}`} />
                  <div className="flex-1">
                    <div className="font-medium text-card-foreground">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    {event.project && (
                      <div className="text-xs text-muted-foreground mt-1">{event.project}</div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}