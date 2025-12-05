import { useState } from "react";
import { X, CheckCircle2, GitBranch, AlertTriangle, ArrowRight, ExternalLink, Calendar, Check, Clock, Users, Video, FileText, Link2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
interface MeetingOutcomesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
type TabType = "actions" | "decisions" | "risks";
const tabs = [{
  id: "actions" as TabType,
  label: "Actions",
  icon: CheckCircle2,
  count: 6
}, {
  id: "decisions" as TabType,
  label: "Decisions",
  icon: GitBranch,
  count: 3
}, {
  id: "risks" as TabType,
  label: "Risks",
  icon: AlertTriangle,
  count: 2
}];
const initialActions = [{
  id: 1,
  title: "Set up performance testing for EMCPS connectors with a 2-week SLA",
  assignee: "Ankit Gupta",
  type: "jira" as const,
  linked: null as string | null
}, {
  id: 2,
  title: "Schedule follow-up with Support + Legal to finalize data governance FAQ",
  assignee: "Priya Sharma",
  type: "meeting" as const,
  linked: null as string | null
}, {
  id: 3,
  title: "Review and update API documentation for EMCPS connectors",
  assignee: "Dev Team",
  type: "jira" as const,
  linked: "EMCPS-2141"
}, {
  id: 4,
  title: "Prepare executive summary for LA launch",
  assignee: "Priya Sharma",
  type: "email" as const,
  linked: null as string | null
}];
const initialDecisions = [{
  id: 1,
  title: "Proceed with EMCPS LA target date of Jan 15, pending performance sign-off by Dec 20.",
  source: "Zoom AIC",
  date: "December 5, 2024",
  time: "9:15 AM PST",
  participants: ["Priya Sharma", "Ankit Gupta", "Sarah Chen", "Michael Torres"],
  conditionalNote: "pending performance sign-off",
  added: false
}, {
  id: 2,
  title: "Initial geographies for EMCPS LA: US & EMEA only in Phase 1, with APAC rollout targeted for Q2.",
  source: "Zoom AIC",
  date: "December 5, 2024",
  time: "9:28 AM PST",
  participants: ["Priya Sharma", "Ankit Gupta", "Sarah Chen", "Michael Torres"],
  conditionalNote: "APAC rollout contingent on Phase 1 success metrics",
  added: false
}, {
  id: 3,
  title: "Support team will handle first-line escalations for connector issues, with Dev Team as Tier 2.",
  source: "Zoom AIC",
  date: "December 5, 2024",
  time: "9:42 AM PST",
  participants: ["Priya Sharma", "Ankit Gupta", "Sarah Chen", "David Kim"],
  conditionalNote: "escalation SLA of 4 hours",
  added: false
}];
const initialRisks = [{
  id: 1,
  title: "Performance testing may slip, putting Jan 15 LA at risk.",
  severity: "high" as const,
  mitigation: "Set Dec 15 reminder for status check",
  flagged: false,
  confirmed: false
}, {
  id: 2,
  title: "Legal review of data governance FAQ pending external counsel",
  severity: "medium" as const,
  mitigation: "Escalate to Legal lead by Dec 10",
  flagged: false,
  confirmed: false
}];
type RiskView = "list" | "proposal" | "customize";
const timeSlots = [{
  id: 1,
  label: "Tue 2:00–2:45 p.m.",
  date: "Dec 10",
  time: "2:00 PM"
}, {
  id: 2,
  label: "Wed 10:00–10:45 a.m.",
  date: "Dec 11",
  time: "10:00 AM"
}, {
  id: 3,
  label: "Thu 3:00–3:45 p.m.",
  date: "Dec 12",
  time: "3:00 PM"
}];
const meetingParticipants = [{
  name: "Sarah Chen",
  role: "Support Lead",
  email: "sarah.chen@oracle.com"
}, {
  name: "Michael Torres",
  role: "Legal Counsel",
  email: "m.torres@oracle.com"
}, {
  name: "Jennifer Park",
  role: "Legal Associate",
  email: "j.park@oracle.com"
}, {
  name: "David Kim",
  role: "Support Engineer",
  email: "d.kim@oracle.com"
}];
export function MeetingOutcomesPanel({
  isOpen,
  onClose
}: MeetingOutcomesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("actions");
  const [actions, setActions] = useState(initialActions);
  const [decisions, setDecisions] = useState(initialDecisions);
  const [risks, setRisks] = useState(initialRisks);
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showJiraModal, setShowJiraModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);

  // Risk flow state
  const [selectedRiskId, setSelectedRiskId] = useState<number | null>(null);
  const [riskView, setRiskView] = useState<RiskView>("list");
  const [riskNote, setRiskNote] = useState("Performance testing timeline is at risk. Current status: awaiting environment setup. Recommend escalating to DevOps lead if no progress by Dec 12.");
  const [reminderDate, setReminderDate] = useState("Dec 15");
  const [reminderTime, setReminderTime] = useState("9:00 AM");
  const [riskOptions, setRiskOptions] = useState({
    flagRisk: true,
    draftNote: true,
    createReminder: true
  });

  // Jira form state
  const [jiraForm, setJiraForm] = useState({
    project: "EMCPS-Core",
    summary: "",
    description: "",
    assignee: "",
    dueDate: addDays(new Date(), 14)
  });
  const handleConfigureJira = (action: typeof initialActions[0]) => {
    setSelectedActionId(action.id);
    setJiraForm({
      project: "EMCPS-Core",
      summary: action.title,
      description: `**From Zoom AIC Meeting**: EMCPS Launch – Go/No-Go Checkpoint\n\n**Meeting Date**: December 5, 2024, 9:00 AM PST\n\n**Attendees**: Priya Sharma, Ankit Gupta, Sarah Chen, Michael Torres, Dev Team leads\n\n**Action Item**: ${action.title}\n\n[View full Zoom summary →](https://zoom.us/recording/emcps-launch-dec5)`,
      assignee: action.assignee,
      dueDate: addDays(new Date(), 14)
    });
    setShowJiraModal(true);
  };
  const handleCreateJiraTicket = () => {
    if (!selectedActionId) return;
    const ticketId = `EMCPS-${2143 + Math.floor(Math.random() * 10)}`;
    setActions(prev => prev.map(a => a.id === selectedActionId ? {
      ...a,
      linked: ticketId
    } : a));
    setShowJiraModal(false);
    setSelectedActionId(null);
    toast.success(<div className="flex items-center justify-between gap-4">
        <span>Created Jira ticket <strong>{ticketId}</strong></span>
        <div className="flex items-center gap-2">
          <button className="text-primary hover:underline text-sm font-medium">View in Jira</button>
          <span className="text-muted-foreground">|</span>
          <button className="text-primary hover:underline text-sm font-medium">Pin to EMCPS Launch</button>
        </div>
      </div>);
  };
  const handleScheduleMeeting = (actionId: number) => {
    setSelectedActionId(actionId);
    setShowScheduleModal(true);
    setSelectedTimeSlot(null);
  };
  const handleCreateOutlookEvent = () => {
    if (!selectedActionId) return;
    setActions(prev => prev.map(a => a.id === selectedActionId ? {
      ...a,
      linked: "Outlook Event"
    } : a));
    setShowScheduleModal(false);
    setSelectedActionId(null);
    toast.success(<div className="flex items-center justify-between gap-4">
        <span>Follow-up meeting created in Outlook</span>
        <button className="text-primary hover:underline text-sm font-medium">View event</button>
      </div>);
  };
  const handleDraftEmail = (action: typeof initialActions[0]) => {
    setSelectedActionId(action.id);
    setShowEmailModal(true);
  };
  const handleCreateOutlookDraft = () => {
    if (!selectedActionId) return;
    setActions(prev => prev.map(a => a.id === selectedActionId ? {
      ...a,
      linked: "Outlook Draft"
    } : a));
    setShowEmailModal(false);
    setSelectedActionId(null);
    toast.success(<div className="flex items-center justify-between gap-4">
        <span>Email draft created in Outlook</span>
        <button className="text-primary hover:underline text-sm font-medium">Open draft</button>
      </div>);
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div initial={{
        x: "100%"
      }} animate={{
        x: 0
      }} exit={{
        x: "100%"
      }} transition={{
        type: "spring",
        damping: 25,
        stiffness: 200
      }} className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl border-l border-border bg-card shadow-2xl overflow-hidden flex flex-col">
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
              {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors", isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    <Badge variant={isActive ? "default" : "muted"} className="text-[10px] h-5 px-1.5">
                      {tab.count}
                    </Badge>
                  </button>;
          })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "actions" && <div className="space-y-4">
                  {actions.map(action => {
              const isCompleted = action.linked !== null;
              return <motion.div key={action.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} layout className={cn("rounded-lg border bg-card transition-all border-border", isCompleted && "opacity-75")}>
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={cn("mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", isCompleted ? "border-success bg-success" : "border-muted-foreground")}>
                              {isCompleted && <Check className="h-3 w-3 text-success-foreground" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{action.title}</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Suggested: {action.assignee}
                              </p>
                              
                              {action.linked ? <Badge variant="info" className="mt-3 gap-1.5">
                                  <ExternalLink className="h-3 w-3" />
                                  Linked: {action.type === "jira" ? `Jira ${action.linked}` : action.linked}
                                </Badge> : <div className="mt-3 flex items-center gap-2">
                                  {action.type === "jira" && <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleConfigureJira(action)}>
                                      <FileText className="h-3 w-3" />
                                      Create Jira Ticket
                                    </Button>}
                                  {action.type === "meeting" && <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleScheduleMeeting(action.id)}>
                                      <Calendar className="h-3 w-3" />
                                      Schedule Meeting
                                    </Button>}
                                  {action.type === "email" && <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleDraftEmail(action)}>
                                      <Mail className="h-3 w-3" />
                                      Draft Email
                                    </Button>}
                                </div>}
                            </div>
                          </div>
                        </div>
                      </motion.div>;
            })}
                </div>}

              {activeTab === "decisions" && <div className="space-y-4">
                  {decisions.map(decision => {
              const handleToggle = () => {
                setDecisions(prev => prev.map(d => d.id === decision.id ? {
                  ...d,
                  added: !d.added
                } : d));
                if (!decision.added) {
                  toast.success(<div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success" />
                            <span>Decision added to EMCPS Launch Decision Log</span>
                          </div>);
                }
              };
              return <motion.div key={decision.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} layout className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-start gap-3">
                          <div className={cn("mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", decision.added ? "border-success bg-success" : "border-muted-foreground")}>
                            {decision.added && <Check className="h-3 w-3 text-success-foreground" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{decision.title}</p>
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="muted" className="gap-1">
                                <Video className="h-3 w-3" />
                                {decision.source}
                              </Badge>
                              <span>·</span>
                              <span>{decision.date}</span>
                            </div>
                            
                            <div className="mt-3 flex items-center gap-2">
                              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                                <div onClick={handleToggle} className={cn("relative h-5 w-9 rounded-full transition-colors cursor-pointer", decision.added ? "bg-primary" : "bg-muted")}>
                                  <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", decision.added ? "translate-x-4" : "translate-x-0.5")} />
                                </div>
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                                  Add to EMCPS Launch Decision Log
                                </span>
                              </label>
                            </div>

                            <AnimatePresence>
                              {decision.added && <motion.div initial={{
                        opacity: 0,
                        height: 0
                      }} animate={{
                        opacity: 1,
                        height: "auto"
                      }} exit={{
                        opacity: 0,
                        height: 0
                      }} className="overflow-hidden">
                                  <div className="mt-3 rounded-md bg-muted/50 p-3 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{decision.date} at {decision.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Users className="h-3 w-3" />
                                      <span>{decision.participants.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <FileText className="h-3 w-3" />
                                      <span>Condition: {decision.conditionalNote}</span>
                                    </div>
                                    <div className="pt-1 border-t border-border/50 mt-2">
                                      <p className="text-xs text-success flex items-center gap-1.5">
                                        <Check className="h-3 w-3" />
                                        Added to EMCPS Launch workspace · 
                                        <button className="text-primary hover:underline">Go to EMCPS Launch Workspace </button>
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>;
            })}
                </div>}

              {activeTab === "risks" && <AnimatePresence mode="wait">
                  {riskView === "list" && <motion.div key="risk-list" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} className="space-y-4">
                      {risks.map(risk => <motion.div key={risk.id} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} className={cn("rounded-lg border bg-card p-4 cursor-pointer transition-all hover:border-primary/50", risk.confirmed ? "border-success/50 bg-success/5" : "border-border")} onClick={() => {
                if (!risk.confirmed) {
                  setSelectedRiskId(risk.id);
                  setRiskView("proposal");
                }
              }}>
                          <div className="flex items-start gap-3">
                            <AlertTriangle className={cn("h-5 w-5 mt-0.5 shrink-0", risk.severity === "high" ? "text-destructive" : "text-warning")} />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{risk.title}</p>
                              {risk.confirmed ? <div className="mt-2 rounded-md bg-success/10 p-2">
                                  <p className="text-xs text-success flex items-center gap-1.5">
                                    <Check className="h-3 w-3" />
                                    Risk flagged in EMCPS Launch · Reminder set for Dec 15
                                  </p>
                                </div> : <>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    Mitigation: {risk.mitigation}
                                  </p>
                                  <div className="mt-3">
                                    <Button size="sm" variant="outline" className="gap-1.5">
                                      View AI Recommendations
                                      <ArrowRight className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </>}
                            </div>
                            <Badge variant={risk.severity === "high" ? "destructive" : "warning"}>
                              {risk.severity}
                            </Badge>
                          </div>
                        </motion.div>)}
                    </motion.div>}

                  {riskView === "proposal" && selectedRiskId && <motion.div key="risk-proposal" initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} className="space-y-6">
                      <button onClick={() => {
                setRiskView("list");
                setSelectedRiskId(null);
              }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to risks
                      </button>

                      <div className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">
                              {risks.find(r => r.id === selectedRiskId)?.title}
                            </p>
                            <Badge variant="destructive" className="mt-2">High Risk</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                        <p className="font-medium text-foreground mb-4">AI Workspace suggestions</p>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-3 cursor-pointer group" onClick={() => setRiskOptions(prev => ({
                    ...prev,
                    flagRisk: !prev.flagRisk
                  }))}>
                            <div className={cn("h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors", riskOptions.flagRisk ? "border-primary bg-primary" : "border-muted-foreground bg-transparent")}>
                              {riskOptions.flagRisk && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className="group-hover:text-foreground transition-colors">Flag this risk in the <strong>EMCPS Launch</strong> workspace</span>
                          </li>
                          <li className="flex items-center gap-3 cursor-pointer group" onClick={() => setRiskOptions(prev => ({
                    ...prev,
                    draftNote: !prev.draftNote
                  }))}>
                            <div className={cn("h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors", riskOptions.draftNote ? "border-primary bg-primary" : "border-muted-foreground bg-transparent")}>
                              {riskOptions.draftNote && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className="group-hover:text-foreground transition-colors">Draft a risk note for your next status update</span>
                          </li>
                          <li className="flex items-center gap-3 cursor-pointer group" onClick={() => setRiskOptions(prev => ({
                    ...prev,
                    createReminder: !prev.createReminder
                  }))}>
                            <div className={cn("h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors", riskOptions.createReminder ? "border-primary bg-primary" : "border-muted-foreground bg-transparent")}>
                              {riskOptions.createReminder && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className="group-hover:text-foreground transition-colors">Create an <strong>Outlook reminder</strong> 5 days before Dec 20"</span>
                          </li>
                        </ul>
                        <Button className="mt-5 w-full gap-1.5" variant="glow" onClick={() => setRiskView("customize")}>
                          Customize & Proceed
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>}

                  {riskView === "customize" && selectedRiskId && <motion.div key="risk-customize" initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} className="space-y-6">
                      <button onClick={() => setRiskView("proposal")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Back
                      </button>

                      <div className="space-y-5">
                        {/* Risk Flag */}
                        <div className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center text-xs font-medium text-destructive">1</div>
                            <Label className="font-medium">Risk Flag</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Add to the EMCPS Launch status as a flagged risk
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              High Risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">→ EMCPS Launch workspace</span>
                          </div>
                        </div>

                        {/* Risk Note */}
                        <div className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">2</div>
                            <Label className="font-medium">Risk Note for Status Email</Label>
                          </div>
                          <Textarea value={riskNote} onChange={e => setRiskNote(e.target.value)} rows={3} className="mt-2 text-sm" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Will be saved as a snippet for your next status email
                          </p>
                        </div>

                        {/* Reminder */}
                        <div className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">3</div>
                            <Label className="font-medium">Outlook Reminder</Label>
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <Select value={reminderDate} onValueChange={setReminderDate}>
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Dec 14">Dec 14</SelectItem>
                                  <SelectItem value="Dec 15">Dec 15</SelectItem>
                                  <SelectItem value="Dec 16">Dec 16</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <Select value={reminderTime} onValueChange={setReminderTime}>
                                <SelectTrigger className="w-28">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full gap-1.5" variant="glow" onClick={() => {
                setRisks(prev => prev.map(r => r.id === selectedRiskId ? {
                  ...r,
                  flagged: true,
                  confirmed: true
                } : r));
                toast.success(<div className="space-y-1">
                              <p className="font-medium">Actions confirmed</p>
                              <p className="text-sm text-muted-foreground">
                                Risk flagged · Note saved · Reminder created
                              </p>
                            </div>);
                setRiskView("list");
                setSelectedRiskId(null);
              }}>
                        <Check className="h-4 w-4" />
                        Confirm Actions
                      </Button>
                    </motion.div>}
                </AnimatePresence>}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-4">
              <Button onClick={onClose} className="w-full" variant="glow">
                Done
              </Button>
            </div>
          </motion.div>

          {/* Schedule Meeting Modal */}
          <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Schedule Follow-up Meeting
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Participants */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Participants
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {meetingParticipants.map(p => <Badge key={p.email} variant="secondary" className="gap-1.5 py-1.5 px-3">
                        {p.name}
                        <span className="text-muted-foreground text-[10px]">({p.role})</span>
                        <button className="ml-1 hover:text-destructive">×</button>
                      </Badge>)}
                  </div>
                  <p className="text-xs text-muted-foreground">Auto-filled from Support + Legal attendees</p>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Duration
                  </Label>
                  <Select defaultValue="45">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Suggested Time Slots
                  </Label>
                  <div className="grid gap-2">
                    {timeSlots.map(slot => <button key={slot.id} onClick={() => setSelectedTimeSlot(slot.id)} className={cn("flex items-center justify-between rounded-lg border p-3 text-left transition-all", selectedTimeSlot === slot.id ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/50")}>
                        <div className="flex items-center gap-3">
                          <div className={cn("h-4 w-4 rounded-full border-2 flex items-center justify-center", selectedTimeSlot === slot.id ? "border-primary bg-primary" : "border-muted-foreground")}>
                            {selectedTimeSlot === slot.id && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                          </div>
                          <span className="font-medium">{slot.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{slot.date}</span>
                      </button>)}
                  </div>
                </div>

                {/* Body Draft */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Meeting Body (Draft)
                  </Label>
                  <Textarea rows={5} defaultValue={`Following up from the EMCPS Launch Go/No-Go meeting on Dec 5. This session will focus on finalizing the data governance FAQ before the Jan 15 LA launch.

**Objectives:**
• Review and approve final FAQ content
• Confirm legal sign-off timeline
• Address any remaining questions

**References:**
• FAQ Draft: [Confluence Link]
• Related tickets: EMCPS-2143, EMCPS-2141`} className="text-sm" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button variant="glow" className="gap-1.5" disabled={!selectedTimeSlot} onClick={handleCreateOutlookEvent}>
                  Create Outlook Event
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Create Jira Ticket Modal */}
          <Dialog open={showJiraModal} onOpenChange={setShowJiraModal}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Create Jira Ticket
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Project & Assignee */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select value={jiraForm.project} onValueChange={v => setJiraForm(f => ({
                  ...f,
                  project: v
                }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMCPS-Core">EMCPS-Core</SelectItem>
                        <SelectItem value="EMCPS-Infra">EMCPS-Infra</SelectItem>
                        <SelectItem value="EMCPS-UI">EMCPS-UI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Assignee</Label>
                    <Select value={jiraForm.assignee} onValueChange={v => setJiraForm(f => ({
                  ...f,
                  assignee: v
                }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ankit Gupta">Ankit Gupta</SelectItem>
                        <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                        <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                        <SelectItem value="Dev Team">Dev Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Input value={jiraForm.summary} onChange={e => setJiraForm(f => ({
                ...f,
                summary: e.target.value
              }))} />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={jiraForm.description} onChange={e => setJiraForm(f => ({
                ...f,
                description: e.target.value
              }))} rows={6} className="text-sm" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    <span>Includes: Meeting excerpt, date/time, attendees, Zoom summary link</span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(jiraForm.dueDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={jiraForm.dueDate} onSelect={date => date && setJiraForm(f => ({
                    ...f,
                    dueDate: date
                  }))} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">Suggested: +14 days from today</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowJiraModal(false)}>
                  Cancel
                </Button>
                <Button variant="glow" className="gap-1.5" onClick={handleCreateJiraTicket}>
                  Create Jira Ticket
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Draft Email Modal */}
          <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Draft Email
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Recipients */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    To
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                      SVP Engineering
                      <span className="text-muted-foreground text-[10px]">(john.smith@oracle.com)</span>
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                    <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
                      Director of Product
                      <span className="text-muted-foreground text-[10px]">(lisa.wong@oracle.com)</span>
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  </div>
                  <Input placeholder="Add recipients..." className="text-sm" />
                </div>

                {/* CC */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    Cc
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="muted" className="gap-1.5 py-1.5 px-3">
                      EMCPS Program Team
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input defaultValue="EMCPS Launch Executive Summary – Jan 15 LA Target" className="font-medium" />
                </div>

                {/* Body */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Email Body (Draft)
                  </Label>
                  <Textarea rows={8} defaultValue={`Hi Team,

Following up from the EMCPS Launch Go/No-Go meeting held on December 5, 2024. Here's the executive summary for the upcoming LA launch:

**Status**: On track for Jan 15 LA, pending performance sign-off by Dec 20

**Key Decisions Made**:
• Proceed with EMCPS LA target date of Jan 15
• Initial geographies: US & EMEA only in Phase 1
• Support team will handle first-line escalations

**Action Items**:
• Performance testing setup (Ankit Gupta) - Due Dec 20
• Data governance FAQ finalization (Legal) - Due Dec 18

**Risks & Mitigations**:
• Performance testing timeline - Reminder set for Dec 15 status check

Please review and let me know if you have any questions.

Best regards,
Priya Sharma`} className="text-sm" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    <span>Context from: EMCPS Launch Go/No-Go meeting, Dec 5</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEmailModal(false)}>
                  Cancel
                </Button>
                <Button variant="glow" className="gap-1.5" onClick={handleCreateOutlookDraft}>
                  <Send className="h-4 w-4" />
                  Create Outlook Draft
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>}
    </AnimatePresence>;
}