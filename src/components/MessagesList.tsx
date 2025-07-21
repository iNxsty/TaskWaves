import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  sender: string
  avatar?: string
  initials: string
  message: string
  time: string
  isOnline?: boolean
}

interface MessagesListProps {
  messages: Message[]
}

export function MessagesList({ messages }: MessagesListProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-semibold text-card-foreground mb-4">Messages</h3>
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={message.avatar} />
                <AvatarFallback className="text-sm">{message.initials}</AvatarFallback>
              </Avatar>
              {message.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-card-foreground text-sm">{message.sender}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}