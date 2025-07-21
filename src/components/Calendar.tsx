import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Calendar() {
  const currentDate = new Date()
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  const month = monthNames[currentDate.getMonth()]
  const year = currentDate.getFullYear()
  
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay()
  
  const days = []
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonth = new Date(year, currentDate.getMonth(), -i)
    days.push({
      date: prevMonth.getDate(),
      isCurrentMonth: false,
      isToday: false
    })
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date === currentDate.getDate()
    })
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length
  for (let date = 1; date <= remainingDays; date++) {
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false
    })
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">{month} {year}</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-xs text-muted-foreground text-center p-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            className={`
              text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors
              ${day.isCurrentMonth ? 'text-card-foreground' : 'text-muted-foreground'}
              ${day.isToday ? 'bg-primary text-primary-foreground font-semibold' : ''}
            `}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  )
}