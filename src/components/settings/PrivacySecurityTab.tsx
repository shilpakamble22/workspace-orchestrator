import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Info } from "lucide-react";

const PrivacySecurityTab = () => {
  const [settings, setSettings] = useState({
    showDataSourceLabels: true,
    showExplanations: true,
    excludeConfidential: false,
    excludeChannels: false,
    excludeLabels: false,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Privacy, Security & Transparency</h3>
        <p className="text-sm text-muted-foreground">
          Focused on trust and explainability at the user level.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">What Workspace AI Shows Me</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Show "Data source" labels on answers</Label>
              <p className="text-xs text-muted-foreground mt-1">Slack, Jira, Confluence, etc.</p>
            </div>
            <Switch
              checked={settings.showDataSourceLabels}
              onCheckedChange={(checked) => setSettings({ ...settings, showDataSourceLabels: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Allow "Why am I seeing this?" explanations</Label>
              <p className="text-xs text-muted-foreground mt-1">
                "This summary is based on: Jira EMCPS-2143, Zoom AIC meeting X, Confluence page Y."
              </p>
            </div>
            <Switch
              checked={settings.showExplanations}
              onCheckedChange={(checked) => setSettings({ ...settings, showExplanations: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Content Exclusions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Exclude messages flagged as "confidential" from AI summaries</Label>
            <Switch
              checked={settings.excludeConfidential}
              onCheckedChange={(checked) => setSettings({ ...settings, excludeConfidential: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Exclude specific channels / spaces from AI access</Label>
            <Switch
              checked={settings.excludeChannels}
              onCheckedChange={(checked) => setSettings({ ...settings, excludeChannels: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <Label className="text-sm">Exclude specific labels/tags in email</Label>
              <p className="text-xs text-muted-foreground mt-1">e.g., "Personal", "Private"</p>
            </div>
            <Switch
              checked={settings.excludeLabels}
              onCheckedChange={(checked) => setSettings({ ...settings, excludeLabels: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Data Retention (User View)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">
                  Workspace AI keeps a working index of your work content as long as you have access to it. 
                  If access is revoked, it disappears from AI results.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Org-level retention and legal policy is managed separately by your administrator.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySecurityTab;
