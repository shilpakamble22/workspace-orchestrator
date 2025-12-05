import { useState } from "react";
import { MeetingOutcomesCard } from "@/components/cards/MeetingOutcomesCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { InsightsCard } from "@/components/cards/InsightsCard";
import { MeetingOutcomesPanel } from "@/components/panels/MeetingOutcomesPanel";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeViewProps {
  onNavigateToProject: () => void;
}

const tasks = [
  {
    title: "Set up performance testing for EMCPS connectors",
    source: "jira" as const,
    project: "EMCPS-Core",
    dueDate: "Dec 20",
    status: "at-risk" as const,
    priority: "high" as const,
    ticketId: "EMCPS-2143",
  },
  {
    title: "Review Zoom AIC adoption metrics for Q4",
    source: "outlook" as const,
    project: "Zoom AIC",
    dueDate: "Dec 15",
    status: "in-progress" as const,
    priority: "medium" as const,
  },
  {
    title: "Update data governance FAQ for Legal review",
    source: "slack" as const,
    project: "EMCPS Launch",
    dueDate: "Dec 18",
    status: "todo" as const,
    priority: "medium" as const,
  },
  {
    title: "Prepare exec summary for LA launch",
    source: "outlook" as const,
    project: "EMCPS Launch",
    dueDate: "Dec 22",
    status: "todo" as const,
    priority: "high" as const,
  },
];

export function HomeView({ onNavigateToProject }: HomeViewProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState({
    emcpsLaunch: { decisions: 0, risks: 0 }
  });

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    // Simulate updates after interacting with the panel
    setProjectUpdates({ emcpsLaunch: { decisions: 1, risks: 1 } });
  };

  const projects = [
    {
      name: "EMCPS Launch",
      description: "Enterprise Multi-Cloud Platform Services launch program for Jan 15 LA target",
      status: "at-risk" as const,
      progress: 68,
      tasksAtRisk: 2,
      decisions: 5,
      members: 12,
      lastUpdated: projectUpdates.emcpsLaunch.decisions > 0 ? "Just now" : "2 hours ago",
      newDecisions: projectUpdates.emcpsLaunch.decisions,
      newRisks: projectUpdates.emcpsLaunch.risks,
    },
    {
      name: "Zoom AIC Rollout",
      description: "Company-wide Zoom AI Companion adoption and integration program",
      status: "on-track" as const,
      progress: 82,
      tasksAtRisk: 0,
      decisions: 8,
      members: 8,
      lastUpdated: "1 day ago",
    },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Meeting Outcomes */}
        <section>
          <MeetingOutcomesCard onReview={() => setIsPanelOpen(true)} />
        </section>

        {/* My Tasks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <TaskCard {...task} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects & Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Projects</h2>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  onClick={onNavigateToProject}
                />
              ))}
            </div>
          </motion.section>

          {/* Insights */}
          <section>
            <InsightsCard />
          </section>
        </div>
      </div>

      <MeetingOutcomesPanel isOpen={isPanelOpen} onClose={handlePanelClose} />
    </>
  );
}
