import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, MessageSquare, Ticket, FileText, CheckSquare, ArrowLeft, RefreshCw, Zap, Users, Clock, ExternalLink, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface IncidentWorkspaceViewProps {
  onBack: () => void;
}

export function IncidentWorkspaceView({ onBack }: IncidentWorkspaceViewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const handleRefreshSummary = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const recommendedActions = [
    {
      title: "Page on-call SRE",
      description: "Alert the SRE team for immediate investigation",
      icon: Users,
      priority: "high"
    },
    {
      title: "Notify affected customers",
      description: "Send status update to enterprise customers",
      icon: MessageSquare,
      priority: "medium"
    },
    {
      title: 'Add alert banner in "help-emcps" channel',
      description: "Post visibility banner for support awareness",
      icon: Bell,
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h1 className="text-2xl font-semibold text-foreground">
              EMCPS Latency Incident – {today}
            </h1>
            <Badge variant="destructive" className="ml-2">Active Incident</Badge>
          </div>
          <p className="text-muted-foreground mt-1 ml-10">
            Incident workspace for EMCPS latency spike investigation and resolution
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full justify-start bg-card/50 border border-border/50">
          <TabsTrigger value="summary" className="gap-2">
            <FileText className="h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-2">
            <CheckSquare className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="channels" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Channels
          </TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2">
            <Ticket className="h-4 w-4" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="postmortem" className="gap-2">
            <FileText className="h-4 w-4" />
            Postmortem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6 space-y-6">
          {/* Incident Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Incident Summary</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleRefreshSummary}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh Summary'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <p className="font-medium text-destructive">Investigating</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Severity</span>
                    <p className="font-medium text-warning">P2 - High</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Slack Channel</span>
                    <p className="font-medium text-primary">#incident-emcps-latency</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Incident Ticket</span>
                    <p className="font-medium text-primary">INC-9087</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Description</span>
                  <p className="mt-1 text-foreground">
                    Elevated latency detected in EMCPS connector services. Average response times 
                    increased from 200ms to 1.2s. Affecting enterprise customers in US-West region.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last updated 5 minutes ago</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommended Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendedActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors group cursor-pointer"
                  >
                    <div className={`p-2 rounded-lg ${action.priority === 'high' ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <Badge 
                      variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                      className="shrink-0"
                    >
                      {action.priority === 'high' ? 'High Priority' : 'Medium'}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Incident Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No tasks created yet. Tasks will be tracked here as the incident progresses.</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="channels" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Connected Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">#incident-emcps-latency</p>
                    <p className="text-sm text-muted-foreground">Primary incident channel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tickets" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Related Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                  <Ticket className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">INC-9087</p>
                    <p className="text-sm text-muted-foreground">EMCPS latency spike - Primary incident ticket</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">Open</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="postmortem" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Postmortem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Postmortem will be available after the incident is resolved.</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
