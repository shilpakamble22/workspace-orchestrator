import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, Sparkles, Plus, Check, FileText, MessageSquare, Lightbulb, 
  Mail, Ticket, BookOpen, Hash, Play, Loader2, CheckCircle2, ArrowRight,
  FolderOpen, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgentCreated?: (agent: CreatedAgent) => void;
}

export interface CreatedAgent {
  id: string;
  name: string;
  description: string;
  status: "active";
  visibility: "personal" | "team";
  project: string;
  lastRun: string;
  runsToday: number;
  type: "agent";
  dataSources: string[];
  schedule: string;
}

const dataSources = [
  { id: "outlook", name: "Outlook", icon: Mail, connected: true, description: "Status threads & emails" },
  { id: "jira", name: "Jira", icon: Ticket, connected: true, description: "Epics & tickets" },
  { id: "confluence", name: "Confluence", icon: BookOpen, connected: true, description: "Roadmaps & docs" },
  { id: "slack", name: "Slack", icon: Hash, connected: true, description: "Channels & messages" },
];

const projectWorkspaces = [
  { id: "emcps", name: "EMCPS Launch", type: "Program" },
  { id: "zoom-aic", name: "Zoom AIC Adoption", type: "Program" },
  { id: "ai-programs", name: "AI Programs", type: "Project" },
];

const examplePrompts = [
  {
    title: "Critical Projects Update",
    prompt: "Create a CP update for EMCPS in this structure: Overview on AI programs, key deliverables, metrics, risks and call outs."
  },
  {
    title: "Weekly Status Summary",
    prompt: "Compile a weekly status report from Jira tickets, Confluence updates, and Slack discussions for stakeholder review."
  },
  {
    title: "Meeting Action Items",
    prompt: "Extract action items from meeting notes and create Jira tickets with appropriate assignees and due dates."
  },
];

type Step = "configure" | "test" | "schedule";

export function CreateAgentModal({ open, onOpenChange, onAgentCreated }: CreateAgentModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("configure");
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("weekly-wednesday");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>(["outlook", "jira", "confluence", "slack"]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(["emcps"]);
  const [isTesting, setIsTesting] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [testOutput, setTestOutput] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleExampleClick = (prompt: string, title: string) => {
    setDescription(prompt);
    if (!agentName) {
      setAgentName(title + " for Jae");
    }
  };

  const handleTestRun = async () => {
    setIsTesting(true);
    setTestOutput("");
    
    // Simulate test run
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTestOutput(`## Critical Projects Update - EMCPS

### Overview on AI Programs
- Zoom AIC integration on track for Q1 launch
- AI-powered insights feature in beta testing
- 3 new ML models deployed to production

### Key Deliverables
- ✅ API Gateway migration complete
- 🔄 Dashboard redesign (85% complete)
- ⏳ Performance optimization pending review

### Metrics
- Active users: 12,450 (+8% MoM)
- API latency: 45ms avg (target: <50ms)
- Uptime: 99.97%

### Risks & Call Outs
- ⚠️ Resource constraint on frontend team
- ⚠️ Dependency on external vendor for SSO update`);
    
    setIsTesting(false);
    setTestComplete(true);
  };

  const handleCreate = async () => {
    setIsCreating(true);
    
    // Simulate creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAgent: CreatedAgent = {
      id: `agent-${Date.now()}`,
      name: agentName,
      description: description,
      status: "active",
      visibility: "personal",
      project: selectedProjects.includes("emcps") ? "EMCPS Launch" : "All Projects",
      lastRun: "Just created",
      runsToday: 0,
      type: "agent",
      dataSources: selectedSources,
      schedule: schedule,
    };
    
    onAgentCreated?.(newAgent);
    
    toast({
      title: "Agent Created",
      description: `"${agentName}" has been created and scheduled to run every Wednesday.`,
    });
    
    // Reset and close
    setIsCreating(false);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep("configure");
    setAgentName("");
    setDescription("");
    setSchedule("weekly-wednesday");
    setSelectedSources(["outlook", "jira", "confluence", "slack"]);
    setSelectedProjects(["emcps"]);
    setTestComplete(false);
    setTestOutput("");
  };

  const canProceedToTest = agentName.trim() && description.trim() && selectedSources.length > 0;
  const canCreate = testComplete;

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Agent</DialogTitle>
          <p className="text-sm text-muted-foreground">Build a custom AI-powered workflow</p>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 py-2">
          {(["configure", "test", "schedule"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                step === s ? "bg-primary text-primary-foreground" : 
                (["configure", "test", "schedule"].indexOf(step) > i ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")
              )}>
                {["configure", "test", "schedule"].indexOf(step) > i ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn(
                "text-sm capitalize",
                step === s ? "text-foreground font-medium" : "text-muted-foreground"
              )}>{s}</span>
              {i < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground/50 mx-1" />}
            </div>
          ))}
        </div>

        <div className="space-y-6 py-4">
          {step === "configure" && (
            <>
              {/* Agent Name */}
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input
                  id="agent-name"
                  placeholder="e.g., Critical Projects Update for Jae"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Instructions</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your agent should do. Be specific about the structure and outputs you want."
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Be specific about tasks and outputs</span>
                  <span>{description.length} / 500</span>
                </div>
              </div>

              {/* Project Workspaces */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Connect to Project Workspaces
                </Label>
                <div className="space-y-2">
                  {projectWorkspaces.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => toggleProject(project.id)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                        selectedProjects.includes(project.id) 
                          ? "border-primary/50 bg-primary/5" 
                          : "border-border bg-card hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={() => toggleProject(project.id)}
                        />
                        <div>
                          <span className="font-medium text-foreground">{project.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">{project.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Sources */}
              <div className="space-y-3">
                <Label>Data Sources</Label>
                <div className="grid grid-cols-2 gap-2">
                  {dataSources.map((source) => (
                    <div
                      key={source.id}
                      onClick={() => toggleSource(source.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                        selectedSources.includes(source.id) 
                          ? "border-primary/50 bg-primary/5" 
                          : "border-border bg-card hover:border-primary/30"
                      )}
                    >
                      <Checkbox 
                        checked={selectedSources.includes(source.id)}
                        onCheckedChange={() => toggleSource(source.id)}
                      />
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                        <source.icon className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">{source.name}</span>
                        <p className="text-xs text-muted-foreground truncate">{source.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Prompts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium text-foreground">Example Templates</span>
                </div>
                <div className="space-y-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example.prompt, example.title)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border border-border bg-card",
                        "hover:border-primary/30 hover:bg-card/80",
                        "transition-colors cursor-pointer"
                      )}
                    >
                      <span className="font-medium text-foreground text-sm">{example.title}</span>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">"{example.prompt}"</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <Button 
                className="w-full gap-2" 
                variant="glow"
                disabled={!canProceedToTest}
                onClick={() => setStep("test")}
              >
                Continue to Test
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {step === "test" && (
            <>
              {/* Agent Summary */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{agentName}</h3>
                  <Badge variant="outline">Draft</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSources.map(sourceId => {
                    const source = dataSources.find(s => s.id === sourceId);
                    return source ? (
                      <Badge key={sourceId} variant="secondary" className="gap-1">
                        <source.icon className="h-3 w-3" />
                        {source.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Test Run */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Test Run</Label>
                  {testComplete && (
                    <div className="flex items-center gap-1.5 text-emerald-500 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Test passed
                    </div>
                  )}
                </div>
                
                {!testOutput ? (
                  <Button 
                    onClick={handleTestRun} 
                    disabled={isTesting}
                    variant="outline" 
                    className="w-full gap-2"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Running test...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Run Test
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="rounded-lg border border-border bg-muted/30 p-4 max-h-[300px] overflow-y-auto">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">{testOutput}</pre>
                  </div>
                )}

                {testComplete && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground"
                    onClick={() => {
                      setTestComplete(false);
                      setTestOutput("");
                    }}
                  >
                    Tweak prompt & run again
                  </Button>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep("configure")}>
                  Back
                </Button>
                <Button 
                  className="flex-1 gap-2" 
                  variant="glow"
                  disabled={!canCreate}
                  onClick={() => setStep("schedule")}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {step === "schedule" && (
            <>
              {/* Schedule */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Label>
                <Select value={schedule} onValueChange={setSchedule}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily-9am">Daily at 9:00 AM</SelectItem>
                    <SelectItem value="daily-6pm">Daily at 6:00 PM</SelectItem>
                    <SelectItem value="weekly-monday">Weekly on Monday</SelectItem>
                    <SelectItem value="weekly-wednesday">Weekly on Wednesday</SelectItem>
                    <SelectItem value="weekly-friday">Weekly on Friday</SelectItem>
                    <SelectItem value="on-demand">On demand only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The agent will automatically run on this schedule and notify you with results.
                </p>
              </div>

              {/* Advanced Settings */}
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-0 hover:bg-transparent">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Advanced Settings</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3 space-y-4">
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-sm text-muted-foreground">
                      Advanced configuration options: approval rules, output format, retry logic, notification preferences.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Final Summary */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2">
                <h4 className="font-medium text-foreground">Ready to create</h4>
                <p className="text-sm text-muted-foreground">
                  <strong>{agentName}</strong> will run every {schedule === "weekly-wednesday" ? "Wednesday" : schedule.replace("-", " at ").replace("weekly-", "")} 
                  {" "}and appear in your "My Agents" tab.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setStep("test")}>
                  Back
                </Button>
                <Button 
                  className="flex-1 gap-2" 
                  variant="glow"
                  disabled={isCreating}
                  onClick={handleCreate}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Create Agent
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
