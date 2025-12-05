import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertTriangle, Calendar, Users, MessageSquare, FileText, Bot, ExternalLink, Send, X, Clock, Hash, AtSign, Slack, Activity, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProjectDetailViewProps {
  onBack: () => void;
}

const projectTasks = [
  {
    id: "EMCPS-2143",
    title: "Set up performance testing for EMCPS connectors",
    description: "Configure and execute performance testing suite for all EMCPS connectors to ensure they meet the required SLA benchmarks before the Jan 15 LA launch.",
    owner: "Ankit Gupta",
    ownerEmail: "ankit.gupta@oracle.com",
    source: "Jira",
    dueDate: "Dec 20",
    status: "at-risk" as const,
    reason: "5 days idle",
    priority: "high" as const,
    slackRequestSent: false,
    activity: [
      { date: "Dec 5", action: "Created from Zoom meeting action item", user: "Priya Sharma" },
      { date: "Dec 5", action: "Assigned to Ankit Gupta", user: "System" },
      { date: "Dec 5", action: "Due date set: Dec 20", user: "Priya Sharma" },
    ],
  },
  {
    id: "EMCPS-2145",
    title: "Finalize data governance FAQ with Legal",
    description: "Work with Legal team to finalize the data governance FAQ document for customer-facing communications.",
    owner: "Sarah Chen",
    ownerEmail: "sarah.chen@oracle.com",
    source: "Jira",
    dueDate: "Dec 18",
    status: "at-risk" as const,
    reason: "Due in 1 day",
    priority: "high" as const,
    slackRequestSent: false,
    activity: [
      { date: "Dec 3", action: "Created from Slack discussion", user: "Priya Sharma" },
      { date: "Dec 4", action: "Assigned to Sarah Chen", user: "System" },
      { date: "Dec 10", action: "Comment: Waiting on external counsel review", user: "Sarah Chen" },
    ],
  },
  {
    id: "EMCPS-2140",
    title: "Update connector documentation",
    owner: "Dev Team",
    ownerEmail: "dev-team@oracle.com",
    description: "Update all connector documentation to reflect the latest API changes and configuration options.",
    source: "Jira",
    dueDate: "Dec 22",
    status: "on-track" as const,
    reason: null,
    priority: "medium" as const,
    slackRequestSent: false,
    activity: [
      { date: "Dec 2", action: "Created", user: "Priya Sharma" },
      { date: "Dec 8", action: "First draft completed", user: "Dev Team" },
    ],
  },
];

const projectDecisions = [
  {
    title: "Proceed with EMCPS LA target date of Jan 15",
    date: "Dec 5, 2024",
    source: "Zoom AIC",
    tags: ["Timeline", "Launch"],
    pendingApproval: true,
    approver: "SVP",
  },
  {
    title: "Initial geographies: US & EMEA only in Phase 1",
    date: "Dec 5, 2024",
    source: "Zoom AIC",
    tags: ["Scope", "Geographies"],
    pendingApproval: false,
    approver: null,
  },
  {
    title: "Support team handles first-line escalations",
    date: "Dec 3, 2024",
    source: "Slack",
    tags: ["Operations"],
    pendingApproval: false,
    approver: null,
  },
];

type ViewMode = "overview" | "at-risk-tasks";

export function ProjectDetailView({ onBack }: ProjectDetailViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("overview");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [showSlackEditor, setShowSlackEditor] = useState(false);
  const [tasks, setTasks] = useState(projectTasks);
  const [slackMessage, setSlackMessage] = useState("");

  const atRiskTasks = tasks.filter(t => t.status === "at-risk" && t.priority === "high");
  const pendingDecisions = projectDecisions.filter(d => d.pendingApproval);

  const selectedTaskData = tasks.find(t => t.id === selectedTask);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSlackMessage(`Hi ${task.owner.split(' ')[0]}, quick check on ${task.id} (${task.title.toLowerCase()}).\nThis is now flagged as at risk for the Jan 15 launch.\nCould you share a status update and revised ETA?`);
    }
    setShowTaskDrawer(true);
    setShowSlackEditor(false);
  };

  const handleSendSlack = () => {
    if (!selectedTask) return;
    
    setTasks(prev => prev.map(t => 
      t.id === selectedTask 
        ? { 
            ...t, 
            slackRequestSent: true,
            activity: [
              { date: "Dec 10", action: "Status request sent via Slack to #emcps-launch", user: "Priya Sharma" },
              ...t.activity
            ]
          } 
        : t
    ));
    
    setShowSlackEditor(false);
    setShowTaskDrawer(false);
    
    toast.success(
      <div className="flex items-center gap-2">
        <Slack className="h-4 w-4" />
        <span>Message sent to #emcps-launch</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" onClick={viewMode === "at-risk-tasks" ? () => setViewMode("overview") : onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">
              {viewMode === "at-risk-tasks" ? "High-Priority Tasks at Risk" : "EMCPS Launch"}
            </h1>
            {viewMode === "overview" && (
              <Badge className="bg-success/20 text-success border border-success/30">On Track</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {viewMode === "at-risk-tasks" 
              ? `${atRiskTasks.length} tasks require attention`
              : "Enterprise Multi-Cloud Platform Services · Jan 15 LA Target"
            }
          </p>
        </div>
        {viewMode === "overview" && (
          <Button variant="outline" className="gap-2">
            <Bot className="h-4 w-4" />
            Run Agent
          </Button>
        )}
      </motion.div>

      {/* Summary Card - Only show in overview mode */}
      {viewMode === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <h3 className="font-semibold text-foreground mb-4">EMCPS Launch – Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-semibold text-success">On track</p>
            </div>
            <div 
              className="cursor-pointer group"
              onClick={() => setViewMode("at-risk-tasks")}
            >
              <p className="text-sm text-muted-foreground">High-priority at risk</p>
              <p className="text-lg font-semibold text-destructive group-hover:underline">
                {atRiskTasks.length} tasks
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending approval</p>
              <p className="text-lg font-semibold text-warning">
                {pendingDecisions.length} decision{pendingDecisions.length !== 1 ? 's' : ''}
                {pendingDecisions.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    (SVP)
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-lg font-semibold text-foreground">11:02 a.m.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* At-Risk Tasks Panel */}
      {viewMode === "at-risk-tasks" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {atRiskTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => handleTaskClick(task.id)}
              className={cn(
                "rounded-lg border bg-card p-4 cursor-pointer transition-all hover:border-primary/50",
                "border-border"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="muted" className="text-[10px]">{task.id}</Badge>
                      <span className="font-medium text-foreground">{task.title}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Source: </span>
                        <Badge variant="outline" className="text-[10px] ml-1">{task.source}</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Owner: </span>
                        <span className="text-foreground">{task.owner}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due: </span>
                        <span className="text-foreground">{task.dueDate}</span>
                      </div>
                      <div>
                        <Badge variant="destructive" className="text-[10px]">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.reason}
                        </Badge>
                      </div>
                    </div>
                    {task.slackRequestSent && (
                      <div className="mt-2">
                        <Badge variant="info" className="text-[10px] gap-1">
                          <Slack className="h-3 w-3" />
                          Status request sent · Awaiting reply
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Task Detail Drawer */}
      <AnimatePresence>
        {showTaskDrawer && selectedTaskData && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowTaskDrawer(false);
                setShowSlackEditor(false);
              }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] rounded-t-2xl border-t border-border bg-card shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full max-h-[80vh]">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="muted">{selectedTaskData.id}</Badge>
                    <h2 className="text-lg font-semibold text-foreground">{selectedTaskData.title}</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setShowTaskDrawer(false);
                      setShowSlackEditor(false);
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Ticket Summary */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                    <p className="text-foreground">{selectedTaskData.description}</p>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedTaskData.owner}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due {selectedTaskData.dueDate}
                      </span>
                      <Badge variant="outline">{selectedTaskData.source}</Badge>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Activity Timeline</h3>
                    <div className="space-y-3">
                      {selectedTaskData.activity.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                          <div>
                            <span className="text-muted-foreground">{item.date}</span>
                            <span className="mx-2">·</span>
                            <span className="text-foreground">{item.action}</span>
                            <span className="text-muted-foreground ml-1">by {item.user}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Suggested Action */}
                  {!showSlackEditor && !selectedTaskData.slackRequestSent && (
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                      <Badge variant="default" className="mb-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 text-xs font-medium shadow-md">
                        ✨ AI Workspace suggestion
                      </Badge>
                      <p className="text-foreground mb-1">
                        <span className="font-medium">No activity in 5 days.</span>
                      </p>
                      <p className="text-muted-foreground mb-4">
                        I can draft a Slack message to {selectedTaskData.owner.split(' ')[0]} in #emcps-launch asking for an updated ETA.
                      </p>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => setShowSlackEditor(true)}
                      >
                        <Slack className="h-4 w-4" />
                        Draft Slack Message
                      </Button>
                    </div>
                  )}

                  {/* Slack Editor */}
                  {showSlackEditor && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-border bg-muted/30 p-5 space-y-4"
                    >
                      <h3 className="font-medium text-foreground">Compose Slack Message</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Channel</label>
                          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">emcps-launch</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">To</label>
                          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
                            <AtSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">{selectedTaskData.owner.split(' ')[0].toLowerCase()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Draft</label>
                        <Textarea
                          value={slackMessage}
                          onChange={(e) => setSlackMessage(e.target.value)}
                          className="min-h-[120px] bg-background"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <Button 
                          variant="glow" 
                          className="gap-2"
                          onClick={handleSendSlack}
                        >
                          <Send className="h-4 w-4" />
                          Send via Slack
                        </Button>
                        <Button 
                          variant="ghost"
                          onClick={() => setShowSlackEditor(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Already sent status */}
                  {selectedTaskData.slackRequestSent && (
                    <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Status request sent</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        A message was sent to #emcps-launch. Awaiting reply from {selectedTaskData.owner.split(' ')[0]}.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Link2 className="h-3 w-3" />
                          View in Slack
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tabs - Only show in overview mode */}
      {viewMode === "overview" && (
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
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => handleTaskClick(task.id)}
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
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="muted" className="text-[10px]">{task.id}</Badge>
                              <span className="font-medium text-foreground">{task.title}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
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
                            {task.slackRequestSent && (
                              <Badge variant="info" className="mt-2 text-[10px] gap-1">
                                <Slack className="h-3 w-3" />
                                Status request sent · Awaiting reply
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Click a task to view details</p>
                  </div>
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
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{decision.title}</p>
                          {decision.pendingApproval && (
                            <Badge variant="warning" className="text-[10px]">
                              Pending {decision.approver} approval
                            </Badge>
                          )}
                        </div>
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
      )}
    </div>
  );
}
