import { ArrowRight, CheckCircle2, AlertTriangle, Calendar, Users, GitBranch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectCardProps {
  name: string;
  description: string;
  status: "on-track" | "at-risk" | "delayed";
  progress: number;
  tasksAtRisk: number;
  decisions: number;
  members: number;
  lastUpdated: string;
  newDecisions?: number;
  newRisks?: number;
  onClick: () => void;
}

const statusConfig = {
  "on-track": { label: "On Track", color: "bg-success/20 text-success border-success/30" },
  "at-risk": { label: "At Risk", color: "bg-warning/20 text-warning border-warning/30" },
  "delayed": { label: "Delayed", color: "bg-destructive/20 text-destructive border-destructive/30" },
};

export function ProjectCard({
  name,
  description,
  status,
  progress,
  tasksAtRisk,
  decisions,
  members,
  lastUpdated,
  newDecisions = 0,
  newRisks = 0,
  onClick,
}: ProjectCardProps) {
  const statusInfo = statusConfig[status];
  const hasUpdates = newDecisions > 0 || newRisks > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <Badge className={cn("text-[10px] border", statusInfo.color)}>
              {statusInfo.label}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
      </div>

      {/* New updates indicator */}
      {hasUpdates && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-primary font-medium">
            Updated · {newDecisions > 0 && `${newDecisions} new decision`}{newDecisions > 0 && newRisks > 0 && " · "}{newRisks > 0 && `${newRisks} new risk`}
          </span>
        </motion.div>
      )}

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        {tasksAtRisk > 0 && (
          <div className="flex items-center gap-1.5 text-warning">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{tasksAtRisk} at risk</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{decisions} decisions</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>{members}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>Updated {lastUpdated}</span>
      </div>
    </motion.div>
  );
}
