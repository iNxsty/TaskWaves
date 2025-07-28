import { 
  Calendar, 
  Clock, 
  BarChart3, 
  Settings, 
  FolderOpen, 
  CheckSquare,
  LayoutDashboard
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar
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
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  return (
    <Sidebar 
      className="bg-sidebar-background border-sidebar-border"
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header with logo */}
        <div className={`p-4 border-b border-sidebar-border ${isCollapsed ? "px-2" : "px-6"}`}>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">TaskFlows</span>
            )}
          </div>
        </div>
        
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className={isCollapsed ? "px-2" : "px-3"}>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={`flex items-center gap-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/80 transition-all duration-200 group ${
                        isCollapsed ? "px-2 justify-center" : "px-3"
                      } ${
                        isActive(item.url) 
                          ? 'bg-sidebar-accent border-l-4 border-primary text-primary font-semibold shadow-sm' 
                          : 'hover:text-sidebar-accent-foreground'
                      }`}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 ${
                        isActive(item.url) ? 'text-primary' : 'group-hover:text-primary'
                      }`} />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
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