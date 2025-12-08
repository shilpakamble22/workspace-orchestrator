import { Search, Sparkles, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAskAnythingClick?: () => void;
}

export function Header({ title, subtitle, onAskAnythingClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6"
    >
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* AI Search */}
        <div className="relative">
          <button
            onClick={onAskAnythingClick}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-accent cursor-pointer group"
          >
            <Sparkles className="h-4 w-4 text-primary group-hover:animate-pulse" />
            <span className="hidden sm:inline">Ask AI anything...</span>
            <kbd className="hidden sm:inline-flex ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
          </button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </Button>

        {/* Workspace Selector */}
        <Button variant="outline" className="gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-xs font-bold text-primary">
            E
          </div>
          <span className="hidden sm:inline">EMCPS</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </div>
    </motion.header>
  );
}
