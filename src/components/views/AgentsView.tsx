import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Plus, Play, Settings, Users, Zap, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  },
  {
    id: 5,
    name: "Incident Responder",
    description: "Automates incident triage, notification, and status communication.",
    category: "Operations",
    installs: 890,
  },
  {
    id: 6,
    name: "Project Health Monitor",
    description: "Tracks project metrics and alerts on potential delays or blockers.",
    category: "Analytics",
    installs: 756,
  },
];

export function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

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
        <Button className="gap-2" variant="glow">
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </motion.div>

      {/* My Agents */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">My Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myAgents.map((agent) => (
            <div
              key={agent.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 cursor-pointer"
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Bot className="h-6 w-6 text-primary" />
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
                      <span>Team</span>
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
          ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryAgents.map((agent) => (
            <div
              key={agent.id}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-info/20 mb-4">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{agent.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline">{agent.category}</Badge>
                <span className="text-xs text-muted-foreground">{agent.installs.toLocaleString()} installs</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
