import { TrendingUp, CheckCircle2, AlertTriangle, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function InsightsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/20">
          <TrendingUp className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Insights & Planning</h3>
          <p className="text-sm text-muted-foreground">Today's Snapshot</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Today stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-success/10 p-3 text-center">
            <p className="text-2xl font-bold text-success">7</p>
            <p className="text-xs text-muted-foreground">Tasks done</p>
          </div>
          <div className="rounded-lg bg-info/10 p-3 text-center">
            <p className="text-2xl font-bold text-info">3</p>
            <p className="text-xs text-muted-foreground">Decisions</p>
          </div>
          <div className="rounded-lg bg-warning/10 p-3 text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-muted-foreground">Incident</p>
          </div>
        </div>

        {/* Week stats */}
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium text-foreground mb-2">This Week</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>16 meetings scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>6 hours of focus time</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>4 tasks at risk</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Recommended Actions</p>
          <button className="w-full flex items-center justify-between rounded-lg bg-accent/50 px-4 py-3 text-sm text-left transition-colors hover:bg-accent">
            <span>Remind SVP about EMCPS approval</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between rounded-lg bg-accent/50 px-4 py-3 text-sm text-left transition-colors hover:bg-accent">
            <span>Block focus time for performance review</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
