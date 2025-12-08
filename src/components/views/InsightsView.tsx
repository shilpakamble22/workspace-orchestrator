import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, Clock, CheckCircle2, AlertTriangle, Users, MessageSquare, FileText, Video, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const todayStats = [
  { label: "Tasks done", value: 7, color: "success" },
  { label: "Decisions", value: 3, color: "info" },
  { label: "Incidents", value: 1, color: "warning" },
];

const weekStats = [
  { icon: Calendar, text: "16 meetings scheduled" },
  { icon: Clock, text: "6 hours of focus time" },
  { icon: AlertTriangle, text: "4 tasks at risk", iconColor: "text-warning" },
];

const recommendedActions = [
  "Remind SVP about EMCPS approval",
  "Block focus time for performance review",
  "Follow up on connector testing delay",
];

const projectInsights = [
  {
    project: "EMCPS Launch",
    status: "at-risk",
    insight: "Performance testing task idle for 5 days. Recommend sending a status request.",
    action: "Nudge team member",
  },
  {
    project: "Zoom AIC Rollout",
    status: "on-track",
    insight: "Adoption metrics exceeded Q4 target by 12%. Consider sharing success story.",
    action: "Generate report",
  },
];

const upcomingItems = [
  { type: "meeting", title: "EMCPS Performance Review", time: "Tomorrow, 9:00 AM", participants: 4 },
  { type: "deadline", title: "Legal FAQ Review Due", time: "Dec 18", project: "EMCPS Launch" },
  { type: "meeting", title: "Zoom AIC Weekly Sync", time: "Wed, 2:00 PM", participants: 8 },
  { type: "reminder", title: "SVP EMCPS Approval Reminder", time: "Dec 15", project: "EMCPS Launch" },
];

export function InsightsView() {
  return (
    <div className="space-y-8">
      {/* Insights & Planning Section - Similar to Home */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
            {todayStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`rounded-lg bg-${stat.color}/10 p-3 text-center`}
              >
                <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Week stats */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium text-foreground mb-2">This Week</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              {weekStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${stat.iconColor || ""}`} />
                    <span>{stat.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Recommended Actions</p>
            {recommendedActions.map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between rounded-lg bg-accent/50 px-4 py-3 text-sm text-left transition-colors hover:bg-accent"
              >
                <span>{action}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Insights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Project Insights</h2>
        <div className="space-y-4">
          {projectInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{insight.project}</h3>
                    <Badge variant={insight.status === "on-track" ? "success" : "warning"}>
                      {insight.status === "on-track" ? "On Track" : "At Risk"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.insight}</p>
                </div>
                <Button variant="outline" size="sm">
                  {insight.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Items */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming</h2>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {upcomingItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                {item.type === "meeting" && <Video className="h-5 w-5 text-info" />}
                {item.type === "deadline" && <AlertTriangle className="h-5 w-5 text-warning" />}
                {item.type === "reminder" && <Clock className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.time}</span>
                  {item.participants && (
                    <>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{item.participants}</span>
                      </div>
                    </>
                  )}
                  {item.project && (
                    <>
                      <span>·</span>
                      <span>{item.project}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge variant="muted" className="capitalize shrink-0">
                {item.type}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
