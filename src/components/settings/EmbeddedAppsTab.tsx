import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, CheckSquare } from "lucide-react";

const EmbeddedAppsTab = () => {
  const [settings, setSettings] = useState({
    slackEnabled: true,
    slackEphemeral: true,
    slackAutoPost: false,
    slackProposeMessages: true,
    slackAutoPostIncidents: false,
    outlookEnabled: true,
    outlookSidePanel: true,
    outlookDraftOnly: true,
    outlookDecisionSnippets: false,
    jiraEnabled: true,
    jiraCreateTickets: true,
    jiraUpdateFields: true,
    jiraSuggestClose: false,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Embedded Experiences</h3>
        <p className="text-sm text-muted-foreground">
          Control how Workspace AI behaves inside other tools (for the chat-based control surface).
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Slack</CardTitle>
            <Badge variant="outline" className="text-xs">Embedded</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Enable Workspace AI in Slack</Label>
            <Switch
              checked={settings.slackEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, slackEnabled: checked })}
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Ephemeral behavior:</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Default responses as ephemeral (visible only to me)</Label>
                <Switch
                  checked={settings.slackEphemeral}
                  onCheckedChange={(checked) => setSettings({ ...settings, slackEphemeral: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div>
                  <Label className="text-sm">Allow posting to channel by default</Label>
                  <p className="text-xs text-muted-foreground mt-1">Not recommended</p>
                </div>
                <Switch
                  checked={settings.slackAutoPost}
                  onCheckedChange={(checked) => setSettings({ ...settings, slackAutoPost: checked })}
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Allowed actions:</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Propose messages for channels, require explicit user "Post" click</Label>
                <Switch
                  checked={settings.slackProposeMessages}
                  onCheckedChange={(checked) => setSettings({ ...settings, slackProposeMessages: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div>
                  <Label className="text-sm">Auto-post status updates when incidents change state</Label>
                  <p className="text-xs text-muted-foreground mt-1">Admin-policy dependent</p>
                </div>
                <Switch
                  checked={settings.slackAutoPostIncidents}
                  onCheckedChange={(checked) => setSettings({ ...settings, slackAutoPostIncidents: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Outlook</CardTitle>
            <Badge variant="outline" className="text-xs">Embedded</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show Workspace AI side panel by default on threads tagged with specific labels</Label>
            <Switch
              checked={settings.outlookSidePanel}
              onCheckedChange={(checked) => setSettings({ ...settings, outlookSidePanel: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Draft replies but never auto-send emails</Label>
              <p className="text-xs text-muted-foreground mt-1">Recommended</p>
            </div>
            <Switch
              checked={settings.outlookDraftOnly}
              onCheckedChange={(checked) => setSettings({ ...settings, outlookDraftOnly: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Suggest including decision/log snippets at the bottom of status mails</Label>
            <Switch
              checked={settings.outlookDecisionSnippets}
              onCheckedChange={(checked) => setSettings({ ...settings, outlookDecisionSnippets: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <CheckSquare className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Jira / Incident Systems</CardTitle>
            <Badge variant="outline" className="text-xs">Embedded</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground mb-3">Allow Workspace AI to:</p>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Create tickets</Label>
            <Switch
              checked={settings.jiraCreateTickets}
              onCheckedChange={(checked) => setSettings({ ...settings, jiraCreateTickets: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Update fields (status, assignee, due date) when user confirms</Label>
            <Switch
              checked={settings.jiraUpdateFields}
              onCheckedChange={(checked) => setSettings({ ...settings, jiraUpdateFields: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Suggest closing/resolving tickets based on conversation threads</Label>
              <p className="text-xs text-muted-foreground mt-1">Optional</p>
            </div>
            <Switch
              checked={settings.jiraSuggestClose}
              onCheckedChange={(checked) => setSettings({ ...settings, jiraSuggestClose: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddedAppsTab;
