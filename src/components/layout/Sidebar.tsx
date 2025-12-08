import { Home, FolderKanban, Bot, BarChart3, Search, Settings, Bell, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "ask", label: "Ask anything", icon: Sparkles },
  { id: "projects", label: "Workspaces", icon: FolderKanban },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "insights", label: "Insights", icon: BarChart3 },
];

const bottomItems = [{ id: "settings", label: "Settings", icon: Settings }];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar flex flex-col"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">O</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Oracle Workspace</span>
          <span className="text-xs text-muted-foreground">AI Companion</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <button className="flex w-full items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <Search className="h-4 w-4" />
          <span>Search everything...</span>
          <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="activeIndicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3">
        <ul className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  <span>{item.label}</span>
                  {isActive && <motion.div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              </li>
            );
          })}
        </ul>

        {/* User */}
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-sidebar-accent/30 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Priya Sharma</p>
            <p className="text-xs text-muted-foreground truncate">Sr. Product Manager</p>
          </div>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </motion.aside>
  );
}
