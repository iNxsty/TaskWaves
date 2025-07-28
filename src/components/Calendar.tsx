import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

interface CalendarProps {
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
}

export function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const today = new Date()
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
      isToday: false,
      fullDate: new Date(year, currentDate.getMonth() - 1, prevMonth.getDate())
    })
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = new Date(year, currentDate.getMonth(), date)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date === today.getDate() && 
               currentDate.getMonth() === today.getMonth() && 
               currentDate.getFullYear() === today.getFullYear(),
      fullDate
    })
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length
  for (let date = 1; date <= remainingDays; date++) {
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(year, currentDate.getMonth() + 1, date)
    })
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth() + direction, 1))
  }

  const handleDateClick = (day: typeof days[0]) => {
    if (onDateSelect) {
      onDateSelect(day.fullDate)
    }
  }

  const isSelected = (day: typeof days[0]) => {
    if (!selectedDate) return false
    return day.fullDate.toDateString() === selectedDate.toDateString()
  }

  return (
    <motion.div 
      className="bg-card rounded-xl p-6 border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">{month} {year}</h3>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-muted"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 hover:bg-muted"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-xs text-muted-foreground text-center p-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <motion.button
            key={`${currentDate.getMonth()}-${index}`}
            onClick={() => handleDateClick(day)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              text-sm p-2 rounded-lg transition-all duration-200 relative
              ${day.isCurrentMonth 
                ? 'text-card-foreground hover:bg-muted/80' 
                : 'text-muted-foreground/50 hover:text-muted-foreground'
              }
              ${day.isToday 
                ? 'bg-primary text-primary-foreground font-semibold shadow-lg' 
                : ''
              }
              ${isSelected(day) && !day.isToday 
                ? 'bg-secondary text-secondary-foreground ring-2 ring-primary/50' 
                : ''
              }
            `}
          >
            {day.date}
            {day.isToday && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}