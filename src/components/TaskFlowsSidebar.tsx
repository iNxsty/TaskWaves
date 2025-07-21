import { 
  Calendar, 
  Clock, 
  BarChart3, 
  Settings, 
  FolderOpen, 
  CheckSquare,
  LayoutDashboard
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "My Task", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Time Manager", url: "/time", icon: Clock },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function TaskFlowsSidebar() {
  return (
    <Sidebar className="w-64 bg-sidebar border-sidebar-border">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">TaskFlows</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-6 py-3 rounded-lg mx-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 ${
                          isActive ? 'bg-sidebar-accent border-l-4 border-primary text-primary font-semibold' : ''
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}