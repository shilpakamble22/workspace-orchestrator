import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Plus, Play, Settings, Users, Zap, ChevronRight, CheckCircle2, Clock, MessageSquare, Calendar, Mail, Target, Brain, Sparkles, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";
import { SlackCatchUpModal } from "@/components/widgets/SlackCatchUpModal";
import { MeetingPrepModal } from "@/components/widgets/MeetingPrepModal";

const myAgents = [
  {
    id: 1,
    name: "EMCPS Launch Assistant",
    description: "Automates EMCPS post-meeting workflows, Jira updates, and status communications.",
    status: "active",
    visibility: "team",
    project: "EMCPS Launch",
    lastRun: "2 hours ago",
    runsToday: 3,
    type: "agent" as const,
  },
  {
    id: "slack-widget",
    name: "Catch me up on Slack",
    description: "Summarize unread Slack messages and mentions across channels.",
    status: "active",
    visibility: "personal",
    project: "All Projects",
    lastRun: "Just now",
    runsToday: 5,
    type: "widget" as const,
    icon: MessageSquare,
  },
  {
    id: "meeting-widget",
    name: "Prep me for my next meeting",
    description: "Get context, attendees, and key decisions for upcoming meetings.",
    status: "active",
    visibility: "personal",
    project: "All Projects",
    lastRun: "45 min ago",
    runsToday: 2,
    type: "widget" as const,
    icon: Calendar,
  },
];

const teamAgents = [
  {
    id: 2,
    name: "EMCPS Incident Helper",
    description: "Streamlines incident response with automated status updates and stakeholder notifications.",
    status: "active",
    visibility: "team",
    owner: "Sarah Chen",
    project: "EMCPS Launch",
    lastRun: "Yesterday",
  },
  {
    id: 3,
    name: "Weekly Status Generator",
    description: "Compiles weekly status reports from Jira, Confluence, and Slack activity.",
    status: "active",
    visibility: "team",
    owner: "Mike Johnson",
    project: "All Projects",
    lastRun: "3 days ago",
  },
];

const galleryAgents = [
  {
    id: 4,
    name: "Meeting Follow-up",
    description: "Converts meeting action items into tasks and schedules follow-ups.",
    category: "Productivity",
    installs: 1240,
    icon: Calendar,
  },
  {
    id: 5,
    name: "Incident Responder",
    description: "Automates incident triage, notification, and status communication.",
    category: "Operations",
    installs: 890,
    icon: Zap,
  },
  {
    id: 6,
    name: "Project Health Monitor",
    description: "Tracks project metrics and alerts on potential delays or blockers.",
    category: "Analytics",
    installs: 756,
    icon: TrendingUp,
  },
  {
    id: "inbox",
    name: "Review my inbox",
    description: "Summarize unread emails and priorities.",
    category: "Productivity",
    installs: 2100,
    icon: Mail,
  },
  {
    id: "recap",
    name: "Recap my day",
    description: "Get a summary of today's activities.",
    category: "Productivity",
    installs: 1850,
    icon: Calendar,
  },
  {
    id: "planning",
    name: "Planning & Focus",
    description: "Plan your day and set focus areas.",
    category: "Productivity",
    installs: 1620,
    icon: Target,
  },
  {
    id: "decisions",
    name: "Recent decisions",
    description: "Track decisions across projects.",
    category: "Analytics",
    installs: 980,
    icon: Brain,
  },
  {
    id: "insights",
    name: "AI Insights",
    description: "Get personalized recommendations.",
    category: "AI",
    installs: 1450,
    icon: Sparkles,
  },
  {
    id: "docs",
    name: "Doc updates",
    description: "See recent Confluence changes.",
    category: "Documentation",
    installs: 890,
    icon: FileText,
  },
  {
    id: "team",
    name: "Team activity",
    description: "What your team is working on.",
    category: "Collaboration",
    installs: 1200,
    icon: Users,
  },
  {
    id: "metrics",
    name: "Key metrics",
    description: "Project health at a glance.",
    category: "Analytics",
    installs: 1100,
    icon: TrendingUp,
  },
];

export function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState<string | number | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [slackModalOpen, setSlackModalOpen] = useState(false);
  const [meetingPrepOpen, setMeetingPrepOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agents</h1>
          <p className="text-sm text-muted-foreground">Build and manage AI-powered workflows</p>
        </div>
        <Button className="gap-2" variant="glow" onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </motion.div>

      <CreateAgentModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <SlackCatchUpModal open={slackModalOpen} onOpenChange={setSlackModalOpen} />
      <MeetingPrepModal open={meetingPrepOpen} onOpenChange={setMeetingPrepOpen} />

      {/* My Agents */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">My Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myAgents.map((agent) => {
            const AgentIcon = agent.type === "widget" && agent.icon ? agent.icon : Bot;
            return (
              <div
                key={agent.id}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 cursor-pointer"
                onClick={() => {
                  if (agent.id === "slack-widget") {
                    setSlackModalOpen(true);
                  } else if (agent.id === "meeting-widget") {
                    setMeetingPrepOpen(true);
                  } else {
                    setSelectedAgent(agent.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    agent.type === "widget" ? "bg-info/20" : "bg-primary/20"
                  )}>
                    <AgentIcon className={cn(
                      "h-6 w-6",
                      agent.type === "widget" ? "text-info" : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
                      <Badge variant="success" className="shrink-0">Active</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>{agent.visibility === "personal" ? "Personal" : "Team"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{agent.lastRun}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        <span>{agent.runsToday} runs today</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Play className="h-3 w-3" />
                      Run
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Team Agents */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Team Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamAgents.map((agent) => (
            <div
              key={agent.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Bot className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{agent.name}</h3>
                    <Badge variant="muted" className="shrink-0">Team</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {agent.owner}</span>
                    <span>·</span>
                    <span>{agent.project}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Oracle Gallery */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Oracle Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryAgents.map((agent) => {
            const GalleryIcon = agent.icon || Bot;
            return (
              <div
                key={agent.id}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-info/20 mb-4">
                  <GalleryIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{agent.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline">{agent.category}</Badge>
                  <span className="text-xs text-muted-foreground">{agent.installs.toLocaleString()} installs</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
