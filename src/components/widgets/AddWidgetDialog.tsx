import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Mail, Calendar, Target, Brain, Sparkles, FileText, Users, TrendingUp } from "lucide-react";

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWidget: (widget: string) => void;
}

const availableWidgets = [
  { id: "inbox", icon: Mail, label: "Review my inbox", description: "Summarize unread emails and priorities" },
  { id: "recap", icon: Calendar, label: "Recap my day", description: "Get a summary of today's activities" },
  { id: "planning", icon: Target, label: "Planning & Focus", description: "Plan your day and set focus areas" },
  { id: "decisions", icon: Brain, label: "Recent decisions", description: "Track decisions across projects" },
  { id: "insights", icon: Sparkles, label: "AI Insights", description: "Get personalized recommendations" },
  { id: "docs", icon: FileText, label: "Doc updates", description: "See recent Confluence changes" },
  { id: "team", icon: Users, label: "Team activity", description: "What your team is working on" },
  { id: "metrics", icon: TrendingUp, label: "Key metrics", description: "Project health at a glance" },
];

export function AddWidgetDialog({ open, onOpenChange, onSelectWidget }: AddWidgetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Add Widget</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {availableWidgets.map((widget, index) => (
            <motion.button
              key={widget.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                onSelectWidget(widget.id);
                onOpenChange(false);
              }}
              className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
            >
              <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <widget.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{widget.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{widget.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
