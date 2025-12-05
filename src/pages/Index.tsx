import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomeView } from "@/components/views/HomeView";
import { ProjectDirectoryView } from "@/components/views/ProjectDirectoryView";
import { ProjectDetailView } from "@/components/views/ProjectDetailView";
import { AgentsView } from "@/components/views/AgentsView";
import { InsightsView } from "@/components/views/InsightsView";
import SettingsView from "@/components/views/SettingsView";
import { motion, AnimatePresence } from "framer-motion";

const headerConfig: Record<string, { title: string; subtitle?: string }> = {
  home: { title: "Good morning, Priya", subtitle: "Thursday, December 5, 2024" },
  projects: { title: "Projects", subtitle: "Manage and discover project workspaces" },
  agents: { title: "Agents", subtitle: "Build and manage AI workflows" },
  insights: { title: "Insights", subtitle: "Your productivity overview" },
  settings: { title: "Settings", subtitle: "Manage your preferences" },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const currentHeader = headerConfig[activeTab] || headerConfig.home;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedProjectId(null);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const renderView = () => {
    if (activeTab === "projects" && selectedProjectId) {
      return <ProjectDetailView onBack={() => setSelectedProjectId(null)} />;
    }

    switch (activeTab) {
      case "home":
        return <HomeView onNavigateToProject={() => {
          setActiveTab("projects");
          setSelectedProjectId("emcps-launch");
        }} />;
      case "projects":
        return <ProjectDirectoryView onSelectProject={handleSelectProject} />;
      case "agents":
        return <AgentsView />;
      case "insights":
        return <InsightsView />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
            <p>Content coming soon...</p>
          </div>
        );
    }
  };

  const getHeaderTitle = () => {
    if (activeTab === "projects" && selectedProjectId) {
      return "EMCPS Launch";
    }
    return currentHeader.title;
  };

  const getHeaderSubtitle = () => {
    if (activeTab === "projects" && selectedProjectId) {
      return "Enterprise Multi-Cloud Platform Services";
    }
    return currentHeader.subtitle;
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="pl-64">
        <Header 
          title={getHeaderTitle()} 
          subtitle={getHeaderSubtitle()} 
        />
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedProjectId ? `-${selectedProjectId}` : "")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Index;
