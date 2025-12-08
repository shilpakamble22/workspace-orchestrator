import { useState } from "react";
import { MeetingOutcomesCard } from "@/components/cards/MeetingOutcomesCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { MeetingOutcomesPanel } from "@/components/panels/MeetingOutcomesPanel";
import { WidgetsSection } from "@/components/widgets/WidgetsSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { ArrowRight, Plus, ChevronDown, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
interface HomeViewProps {
  onNavigateToProject: () => void;
  onCreateIncidentWorkspace?: () => void;
}
const tasks = [{
  title: "Set up performance testing for EMCPS connectors",
  source: "jira" as const,
  project: "EMCPS-Core",
  dueDate: "Dec 20",
  status: "at-risk" as const,
  priority: "high" as const,
  ticketId: "EMCPS-2143"
}, {
  title: "Review Zoom AIC adoption metrics for Q4",
  source: "outlook" as const,
  project: "Zoom AIC",
  dueDate: "Dec 15",
  status: "in-progress" as const,
  priority: "medium" as const
}, {
  title: "Update data governance FAQ for Legal review",
  source: "slack" as const,
  project: "EMCPS Launch",
  dueDate: "Dec 18",
  status: "todo" as const,
  priority: "medium" as const
}];
export function HomeView({
  onNavigateToProject,
  onCreateIncidentWorkspace
}: HomeViewProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [meetingsOpen, setMeetingsOpen] = useState(true);
  const [tasksOpen, setTasksOpen] = useState(true);
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [workspacesOpen, setWorkspacesOpen] = useState(false);
  const [showIncidentBanner, setShowIncidentBanner] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState({
    emcpsLaunch: {
      decisions: 0,
      risks: 0
    }
  });
  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setProjectUpdates({
      emcpsLaunch: {
        decisions: 1,
        risks: 1
      }
    });
  };
  const projects = [{
    id: "emcps-launch",
    name: "EMCPS Launch",
    description: "Enterprise Multi-Cloud Platform Services launch program for Jan 15 LA target",
    status: "at-risk" as const,
    progress: 68,
    tasksAtRisk: 2,
    decisions: 5,
    members: 12,
    lastUpdated: projectUpdates.emcpsLaunch.decisions > 0 ? "Just now" : "2 hours ago",
    newDecisions: projectUpdates.emcpsLaunch.decisions,
    newRisks: projectUpdates.emcpsLaunch.risks
  }, {
    id: "zoom-aic-rollout",
    name: "Zoom AIC Rollout",
    description: "Company-wide Zoom AI Companion adoption and integration program",
    status: "on-track" as const,
    progress: 82,
    tasksAtRisk: 0,
    decisions: 8,
    members: 8,
    lastUpdated: "1 day ago"
  }, {
    id: "incident-latency",
    name: "EMCPS Latency Incident",
    description: "Critical latency spike investigation and resolution for EMCPS connectors",
    status: "at-risk" as const,
    progress: 35,
    tasksAtRisk: 4,
    decisions: 2,
    members: 6,
    lastUpdated: "30 min ago"
  }];
  const handleProjectClick = (projectId: string) => {
    if (projectId === "incident-latency") {
      onCreateIncidentWorkspace?.();
    } else {
      onNavigateToProject();
    }
  };
  return <>
      <div className="space-y-6">
        {/* Incident Alert Banner */}
        {showIncidentBanner && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="space-y-1.5">
                  <p className="font-medium text-foreground">New potential incident: EMCPS latency spike</p>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    <p>• Slack: <span className="text-primary">#incident-emcps-latency</span></p>
                    <p>• Incident ticket: <span className="text-primary">INC-9087</span></p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="sm" variant="default" onClick={() => {
                  setShowIncidentBanner(false);
                  onCreateIncidentWorkspace?.();
                }}>
                      Create Incident Workspace
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setShowIncidentBanner(false)}>
                      Ignore
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => setShowIncidentBanner(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>}

        {/* Meeting Outcomes - Collapsible */}
        <Collapsible open={meetingsOpen} onOpenChange={setMeetingsOpen}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between py-2 text-left">
              <h2 className="text-lg font-semibold text-foreground">Meetings Processed (3)</h2>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${meetingsOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <MeetingOutcomesCard onReview={() => setIsPanelOpen(true)} />
          </CollapsibleContent>
        </Collapsible>


        {/* My Tasks - Collapsible */}
        <Collapsible open={tasksOpen} onOpenChange={setTasksOpen}>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4,
          delay: 0.3
        }}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between py-2 text-left">
                <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={e => e.stopPropagation()}>
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${tasksOpen ? 'rotate-0' : '-rotate-90'}`} />
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="space-y-3 pt-2">
                {tasks.map((task, index) => <motion.div key={index} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.3,
                delay: 0.1 * index
              }}>
                    <TaskCard {...task} />
                  </motion.div>)}
              </div>
            </CollapsibleContent>
          </motion.div>
        </Collapsible>

        {/* Agents Section - Collapsible */}
        <Collapsible open={agentsOpen} onOpenChange={setAgentsOpen}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between py-2 text-left">
                <h2 className="text-lg font-semibold text-foreground">My Agents</h2>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${agentsOpen ? 'rotate-0' : '-rotate-90'}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pt-2">
                <WidgetsSection />
              </div>
            </CollapsibleContent>
          </motion.div>
        </Collapsible>

        {/* Workspaces Section - Collapsible */}
        <Collapsible open={workspacesOpen} onOpenChange={setWorkspacesOpen}>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between py-2 text-left">
                <h2 className="text-lg font-semibold text-foreground">My Workspaces</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={e => e.stopPropagation()}>
                    <Plus className="h-4 w-4" />
                    New Workspace
                  </Button>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${workspacesOpen ? 'rotate-0' : '-rotate-90'}`} />
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {projects.map((project, index) => <ProjectCard key={index} {...project} onClick={() => handleProjectClick(project.id)} />)}
              </div>
            </CollapsibleContent>
          </motion.section>
        </Collapsible>
      </div>

      <MeetingOutcomesPanel isOpen={isPanelOpen} onClose={handlePanelClose} />
    </>;
}