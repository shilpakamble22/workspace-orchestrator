import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { HomeView } from "@/components/views/HomeView";
import { ProjectsView } from "@/components/views/ProjectsView";
import { AgentsView } from "@/components/views/AgentsView";
import { InsightsView } from "@/components/views/InsightsView";
import { motion, AnimatePresence } from "framer-motion";

const headerConfig: Record<string, { title: string; subtitle?: string }> = {
  home: { title: "Good morning, Priya", subtitle: "Thursday, December 5, 2024" },
  projects: { title: "Projects", subtitle: "Manage your workspaces" },
  agents: { title: "Agents", subtitle: "Build and manage AI workflows" },
  insights: { title: "Insights", subtitle: "Your productivity overview" },
  settings: { title: "Settings", subtitle: "Manage your preferences" },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  const currentHeader = headerConfig[activeTab] || headerConfig.home;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowProjectDetail(false);
  };

  const renderView = () => {
    if (activeTab === "projects" && showProjectDetail) {
      return <ProjectsView onBack={() => setShowProjectDetail(false)} />;
    }

    switch (activeTab) {
      case "home":
        return <HomeView onNavigateToProject={() => {
          setActiveTab("projects");
          setShowProjectDetail(true);
        }} />;
      case "projects":
        return <HomeView onNavigateToProject={() => setShowProjectDetail(true)} />;
      case "agents":
        return <AgentsView />;
      case "insights":
        return <InsightsView />;
      default:
        return (
          <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
            <p>Content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="pl-64">
        <Header 
          title={showProjectDetail ? "EMCPS Launch" : currentHeader.title} 
          subtitle={showProjectDetail ? "Enterprise Multi-Cloud Platform Services" : currentHeader.subtitle} 
        />
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (showProjectDetail ? "-detail" : "")}
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
