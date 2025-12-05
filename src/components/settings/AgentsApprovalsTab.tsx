import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { History, ExternalLink } from "lucide-react";

const AgentsApprovalsTab = () => {
  const [settings, setSettings] = useState({
    previewActions: true,
    autoRunZoom: false,
    requireTeamApproval: true,
    neverAutoSendEmails: true,
    neverAutoPostSlack: true,
    autoAddDecisions: true,
    autoUpdateMetadata: true,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Agents & Approvals</h3>
        <p className="text-sm text-muted-foreground">
          Control how personal agents and team-shared agents behave for you.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Agent Usage Defaults</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Always show a preview of actions before an agent runs</Label>
              <p className="text-xs text-muted-foreground mt-1">Recommended</p>
            </div>
            <Switch
              checked={settings.previewActions}
              onCheckedChange={(checked) => setSettings({ ...settings, previewActions: checked })}
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">For my own agents:</Label>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <Label className="text-sm">Allow auto-run on new Zoom AIC summaries for selected projects</Label>
              <Switch
                checked={settings.autoRunZoom}
                onCheckedChange={(checked) => setSettings({ ...settings, autoRunZoom: checked })}
              />
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">For team agents:</Label>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <Label className="text-sm">Require my explicit approval for any action (Jira/Slack/Outlook)</Label>
              <Switch
                checked={settings.requireTeamApproval}
                onCheckedChange={(checked) => setSettings({ ...settings, requireTeamApproval: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Approval Rules</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Never allow an agent to:</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Send emails directly without a draft</Label>
                <Switch
                  checked={settings.neverAutoSendEmails}
                  onCheckedChange={(checked) => setSettings({ ...settings, neverAutoSendEmails: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Post messages to public Slack channels without review</Label>
                <Switch
                  checked={settings.neverAutoPostSlack}
                  onCheckedChange={(checked) => setSettings({ ...settings, neverAutoPostSlack: checked })}
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">OK to auto-apply when:</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Adding decisions to Decision Log</Label>
                <Switch
                  checked={settings.autoAddDecisions}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoAddDecisions: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Updating internal project metadata (internal-only, no notifications)</Label>
                <Switch
                  checked={settings.autoUpdateMetadata}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoUpdateMetadata: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Audit & Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground mb-3">View history of:</p>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm h-auto py-3 px-3 bg-muted/20 hover:bg-muted/40">
              <History className="h-4 w-4 mr-2 text-primary" />
              Actions Workspace AI took on my behalf (with time + system)
              <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm h-auto py-3 px-3 bg-muted/20 hover:bg-muted/40">
              <History className="h-4 w-4 mr-2 text-primary" />
              Agent runs (what was changed, where)
              <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsApprovalsTab;
