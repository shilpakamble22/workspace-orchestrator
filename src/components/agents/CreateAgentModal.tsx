import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Settings, Sparkles, Plus, Check, FileText, MessageSquare, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dataSources = [
  { id: "sharepoint", name: "SharePoint", icon: FileText, connected: true },
  { id: "slack", name: "Slack", icon: MessageSquare, connected: true },
];

const examplePrompts = [
  "Monitor Slack for urgent requests and notify me via email",
  "Extract key metrics from weekly reports and create summaries",
  "Review code PRs and provide feedback on best practices",
];

export function CreateAgentModal({ open, onOpenChange }: CreateAgentModalProps) {
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("daily-9am");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleExampleClick = (prompt: string) => {
    setDescription(prompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Agent</DialogTitle>
          <p className="text-sm text-muted-foreground">Build a custom agent with AI</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Agent Name */}
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              placeholder="e.g., Customer Support Bot..."
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Describe what your agent should do</Label>
            <Textarea
              id="description"
              placeholder="Example: 'Analyze customer feedback from support tickets, identify common issues, and generate weekly summary reports with actionable insights.'"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              className="min-h-[100px] resize-none"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Be specific about tasks and outputs</span>
              <span>{description.length} / 500</span>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-3">
            <Label>Connect Data Sources</Label>
            <div className="space-y-2">
              {dataSources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                      <source.icon className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{source.name}</span>
                  </div>
                  {source.connected && (
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 border-dashed">
                <Plus className="h-4 w-4" />
                Add Data Source
              </Button>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <Label>When should this run?</Label>
            <Select value={schedule} onValueChange={setSchedule}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily-9am">Daily at 9:00 AM</SelectItem>
                <SelectItem value="daily-6pm">Daily at 6:00 PM</SelectItem>
                <SelectItem value="weekly-monday">Weekly on Monday</SelectItem>
                <SelectItem value="on-demand">On demand only</SelectItem>
                <SelectItem value="realtime">Real-time (event-based)</SelectItem>
              </SelectContent>
            </Select>
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
                  Advanced configuration options will appear here (approval rules, output format, retry logic, etc.)
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full gap-2" variant="glow">
              <Sparkles className="h-4 w-4" />
              Generate Agent
            </Button>
            <Button variant="outline" className="w-full">
              Preview Workflow
            </Button>
          </div>

          {/* Example Prompts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">Example Prompts</span>
            </div>
            <div className="space-y-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border border-border bg-card",
                    "text-sm text-muted-foreground hover:border-primary/30 hover:bg-card/80",
                    "transition-colors cursor-pointer"
                  )}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
