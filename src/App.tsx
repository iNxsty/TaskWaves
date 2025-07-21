import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskFlowsSidebar } from "@/components/TaskFlowsSidebar";
import { Header } from "@/components/Header";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <SidebarProvider>
            <div className="flex w-full">
              <TaskFlowsSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/tasks" element={<Dashboard />} />
                    <Route path="/calendar" element={<Dashboard />} />
                    <Route path="/time" element={<Dashboard />} />
                    <Route path="/reports" element={<Dashboard />} />
                    <Route path="/settings" element={<Dashboard />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
