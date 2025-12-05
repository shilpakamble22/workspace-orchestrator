import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertTriangle, Calendar, Users, MessageSquare, FileText, Bot, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectsViewProps {
  onBack: () => void;
}

const projectTasks = [
  {
    id: "EMCPS-2143",
    title: "Set up performance testing for EMCPS connectors",
    owner: "Ankit Gupta",
    dueDate: "Dec 20",
    status: "at-risk",
    reason: "5 days idle",
  },
  {
    id: "EMCPS-2145",
    title: "Finalize data governance FAQ with Legal",
    owner: "Sarah Chen",
    dueDate: "Dec 18",
    status: "at-risk",
    reason: "Due in 1 day",
  },
  {
    id: "EMCPS-2140",
    title: "Update connector documentation",
    owner: "Dev Team",
    dueDate: "Dec 22",
    status: "on-track",
    reason: null,
  },
];

const projectDecisions = [
  {
    title: "Proceed with EMCPS LA target date of Jan 15",
    date: "Dec 5, 2024",
    source: "Zoom AIC",
    tags: ["Timeline", "Launch"],
  },
  {
    title: "Initial geographies: US & EMEA only in Phase 1",
    date: "Dec 5, 2024",
    source: "Zoom AIC",
    tags: ["Scope", "Geographies"],
  },
  {
    title: "Support team handles first-line escalations",
    date: "Dec 3, 2024",
    source: "Slack",
    tags: ["Operations"],
  },
];

export function ProjectsView({ onBack }: ProjectsViewProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">EMCPS Launch</h1>
            <Badge className="bg-warning/20 text-warning border border-warning/30">At Risk</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Enterprise Multi-Cloud Platform Services · Jan 15 LA Target</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bot className="h-4 w-4" />
          Run Agent
        </Button>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-semibold text-foreground mb-3">Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-lg font-semibold text-warning">At Risk</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">High-priority at risk</p>
            <p className="text-lg font-semibold text-foreground">2 tasks</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending approval</p>
            <p className="text-lg font-semibold text-foreground">1 decision</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last updated</p>
            <p className="text-lg font-semibold text-foreground">11:02 AM</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="decisions">Decisions</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task List */}
              <div className="lg:col-span-2 space-y-3">
                {projectTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
                    className={cn(
                      "rounded-lg border bg-card p-4 cursor-pointer transition-all",
                      selectedTask === task.id
                        ? "border-primary/50 bg-accent/30"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 h-5 w-5 rounded-full flex items-center justify-center",
                          task.status === "at-risk" ? "bg-destructive/20" : "bg-success/20"
                        )}>
                          {task.status === "at-risk" ? (
                            <AlertTriangle className="h-3 w-3 text-destructive" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-success" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="muted" className="text-[10px]">{task.id}</Badge>
                            <span className="font-medium text-foreground">{task.title}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{task.owner}</span>
                            <span>·</span>
                            <span>Due {task.dueDate}</span>
                            {task.reason && (
                              <>
                                <span>·</span>
                                <span className="text-warning">{task.reason}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Task Detail / Actions */}
              <div className="rounded-xl border border-border bg-card p-5">
                {selectedTask ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">
                      No activity in 5 days. I can draft a Slack message to Ankit asking for an updated ETA.
                    </p>
                    <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="muted">#emcps-launch</Badge>
                        <span className="text-muted-foreground">@ankit</span>
                      </div>
                      <p className="text-sm text-foreground">
                        Hi Ankit, quick check on EMCPS-2143 (performance testing for EMCPS connectors). This is now flagged as at risk for the Jan 15 launch. Could you share a status update and revised ETA?
                      </p>
                    </div>
                    <Button className="w-full gap-2" variant="glow">
                      <Send className="h-4 w-4" />
                      Send via Slack
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Select a task to see quick actions</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="decisions" className="mt-6">
            <div className="space-y-3">
              {projectDecisions.map((decision, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{decision.title}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{decision.date}</span>
                        <span>·</span>
                        <Badge variant="muted">{decision.source}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        {decision.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>Overview content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>Meetings content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>Docs content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>Agents content coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
