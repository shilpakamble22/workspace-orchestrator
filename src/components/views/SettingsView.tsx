import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Settings, Palette, Bell, AppWindow, Bot, Shield, Accessibility } from "lucide-react";
import DataSourcesTab from "@/components/settings/DataSourcesTab";
import GeneralTab from "@/components/settings/GeneralTab";
import PersonalizationTab from "@/components/settings/PersonalizationTab";
import FocusNotificationsTab from "@/components/settings/FocusNotificationsTab";
import EmbeddedAppsTab from "@/components/settings/EmbeddedAppsTab";
import AgentsApprovalsTab from "@/components/settings/AgentsApprovalsTab";
import PrivacySecurityTab from "@/components/settings/PrivacySecurityTab";
import AccessibilityTab from "@/components/settings/AccessibilityTab";

const tabs = [
  { id: "data-sources", label: "Data sources", icon: Database },
  { id: "general", label: "General", icon: Settings },
  { id: "personalization", label: "Personalization", icon: Palette },
  { id: "focus", label: "Focus & notifications", icon: Bell },
  { id: "embedded", label: "Embedded apps", icon: AppWindow },
  { id: "agents", label: "Agents & approvals", icon: Bot },
  { id: "privacy", label: "Privacy & security", icon: Shield },
  { id: "accessibility", label: "Accessibility & UI", icon: Accessibility },
];

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("data-sources");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full flex flex-col"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Settings & Preferences</h1>
        <p className="text-muted-foreground">
          Control how Workspace AI works for you across all connected tools.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <div className="border-b border-border/50 mb-4">
          <ScrollArea className="w-full">
            <TabsList className="h-auto bg-transparent p-0 gap-0 flex w-max">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1">
          <div className="pr-4 pb-8">
            <TabsContent value="data-sources" className="mt-0">
              <DataSourcesTab />
            </TabsContent>
            <TabsContent value="general" className="mt-0">
              <GeneralTab />
            </TabsContent>
            <TabsContent value="personalization" className="mt-0">
              <PersonalizationTab />
            </TabsContent>
            <TabsContent value="focus" className="mt-0">
              <FocusNotificationsTab />
            </TabsContent>
            <TabsContent value="embedded" className="mt-0">
              <EmbeddedAppsTab />
            </TabsContent>
            <TabsContent value="agents" className="mt-0">
              <AgentsApprovalsTab />
            </TabsContent>
            <TabsContent value="privacy" className="mt-0">
              <PrivacySecurityTab />
            </TabsContent>
            <TabsContent value="accessibility" className="mt-0">
              <AccessibilityTab />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </motion.div>
  );
};

export default SettingsView;
