import { CheckCircle2, Circle, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  source: "jira" | "outlook" | "slack";
  project: string;
  dueDate: string;
  status: "todo" | "in-progress" | "at-risk" | "done";
  priority: "low" | "medium" | "high";
  ticketId?: string;
}

const sourceColors = {
  jira: "bg-blue-500/20 text-blue-400",
  outlook: "bg-sky-500/20 text-sky-400",
  slack: "bg-purple-500/20 text-purple-400",
};

const sourceLabels = {
  jira: "Jira",
  outlook: "Outlook",
  slack: "Slack",
};

const statusIcons = {
  todo: Circle,
  "in-progress": Circle,
  "at-risk": AlertCircle,
  done: CheckCircle2,
};

const statusColors = {
  todo: "text-muted-foreground",
  "in-progress": "text-info",
  "at-risk": "text-destructive",
  done: "text-success",
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/20 text-warning",
  high: "bg-destructive/20 text-destructive",
};

export function TaskCard({ title, source, project, dueDate, status, priority, ticketId }: TaskCardProps) {
  const StatusIcon = statusIcons[status];

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent/30">
      <StatusIcon className={cn("h-5 w-5 shrink-0", statusColors[status])} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-foreground truncate">{title}</h4>
          {ticketId && (
            <Badge variant="muted" className="text-[10px] shrink-0">
              {ticketId}
            </Badge>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className={cn("text-[10px]", sourceColors[source])}>
            {sourceLabels[source]}
          </Badge>
          <span>·</span>
          <span className="truncate">{project}</span>
          <span>·</span>
          <span className="shrink-0">Due {dueDate}</span>
        </div>
      </div>

      <Badge className={cn("shrink-0", priorityColors[priority])}>
        {priority}
      </Badge>

      <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
