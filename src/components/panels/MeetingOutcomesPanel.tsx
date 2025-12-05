import { useState } from "react";
import { X, CheckCircle2, GitBranch, AlertTriangle, ArrowRight, ExternalLink, Calendar, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MeetingOutcomesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "actions" | "decisions" | "risks";

const tabs = [
  { id: "actions" as TabType, label: "Actions", icon: CheckCircle2, count: 6 },
  { id: "decisions" as TabType, label: "Decisions", icon: GitBranch, count: 3 },
  { id: "risks" as TabType, label: "Risks", icon: AlertTriangle, count: 2 },
];

const actions = [
  {
    id: 1,
    title: "Set up performance testing for EMCPS connectors with a 2-week SLA",
    assignee: "Ankit Gupta",
    suggestion: "Create a Jira ticket in project EMCPS-Core?",
    linked: null,
  },
  {
    id: 2,
    title: "Schedule follow-up with Support + Legal to finalize data governance FAQ",
    assignee: "Priya Sharma",
    suggestion: "Create a 45-minute follow-up in Outlook?",
    linked: null,
  },
  {
    id: 3,
    title: "Review and update API documentation for EMCPS connectors",
    assignee: "Dev Team",
    suggestion: "Create Confluence task?",
    linked: "EMCPS-2141",
  },
  {
    id: 4,
    title: "Prepare executive summary for LA launch",
    assignee: "Priya Sharma",
    suggestion: "Draft email in Outlook?",
    linked: null,
  },
];

const decisions = [
  {
    id: 1,
    title: "Proceed with EMCPS LA target date of Jan 15, pending performance sign-off by Dec 20",
    source: "Zoom AIC",
    date: "Today",
    added: false,
  },
  {
    id: 2,
    title: "Initial geographies for EMCPS LA: US & EMEA only in Phase 1",
    source: "Zoom AIC",
    date: "Today",
    added: true,
  },
  {
    id: 3,
    title: "Support team will handle first-line escalations for connector issues",
    source: "Zoom AIC",
    date: "Today",
    added: false,
  },
];

const risks = [
  {
    id: 1,
    title: "Performance testing may slip, putting Jan 15 LA at risk",
    severity: "high",
    mitigation: "Set Dec 15 reminder for status check",
  },
  {
    id: 2,
    title: "Legal review of data governance FAQ pending external counsel",
    severity: "medium",
    mitigation: "Escalate to Legal lead by Dec 10",
  },
];

export function MeetingOutcomesPanel({ isOpen, onClose }: MeetingOutcomesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("actions");
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  const handleActionComplete = (id: number) => {
    setCompletedActions((prev) => [...prev, id]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-border bg-card shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Meeting Outcomes</h2>
                <p className="text-sm text-muted-foreground">EMCPS Launch – Go/No-Go Checkpoint</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    <Badge variant={isActive ? "default" : "muted"} className="text-[10px] h-5 px-1.5">
                      {tab.count}
                    </Badge>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "actions" && (
                <div className="space-y-4">
                  {actions.map((action) => {
                    const isCompleted = completedActions.includes(action.id);
                    return (
                      <motion.div
                        key={action.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "rounded-lg border border-border bg-card p-4 transition-all",
                          isCompleted && "opacity-50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                            isCompleted ? "border-success bg-success" : "border-muted-foreground"
                          )}>
                            {isCompleted && <Check className="h-3 w-3 text-success-foreground" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{action.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Suggested: {action.assignee}
                            </p>
                            
                            {action.linked ? (
                              <Badge variant="info" className="mt-3 gap-1.5">
                                <ExternalLink className="h-3 w-3" />
                                Linked: Jira {action.linked}
                              </Badge>
                            ) : !isCompleted && (
                              <div className="mt-3 flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1.5"
                                  onClick={() => handleActionComplete(action.id)}
                                >
                                  {action.suggestion?.includes("Jira") && "Create Jira Ticket"}
                                  {action.suggestion?.includes("Outlook") && (
                                    <>
                                      <Calendar className="h-3 w-3" />
                                      Schedule Meeting
                                    </>
                                  )}
                                  {action.suggestion?.includes("Confluence") && "Create Task"}
                                  {action.suggestion?.includes("email") && "Draft Email"}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {activeTab === "decisions" && (
                <div className="space-y-4">
                  {decisions.map((decision) => (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <p className="font-medium text-foreground">{decision.title}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="muted">{decision.source}</Badge>
                        <span>·</span>
                        <span>{decision.date}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={decision.added}
                            className="h-4 w-4 rounded border-muted-foreground"
                          />
                          <span className="text-muted-foreground">Add to EMCPS Launch Decision Log</span>
                        </label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "risks" && (
                <div className="space-y-4">
                  {risks.map((risk) => (
                    <motion.div
                      key={risk.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={cn(
                          "h-5 w-5 mt-0.5 shrink-0",
                          risk.severity === "high" ? "text-destructive" : "text-warning"
                        )} />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{risk.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Mitigation: {risk.mitigation}
                          </p>
                          <div className="mt-3">
                            <Button size="sm" variant="outline" className="gap-1.5">
                              Customize & Proceed
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Badge variant={risk.severity === "high" ? "destructive" : "warning"}>
                          {risk.severity}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4">
              <Button onClick={onClose} className="w-full" variant="glow">
                Done
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
