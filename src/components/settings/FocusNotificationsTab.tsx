import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FocusNotificationsTab = () => {
  const [settings, setSettings] = useState({
    focusPrioritizeTasks: true,
    focusBatchSlack: true,
    focusCalendar: false,
    notifyInApp: true,
    notifyEmail: false,
    notifySlackDM: false,
    notifyFrequency: "standard",
    nudgeTasks: true,
    nudgeMeetings: true,
    nudgeCleanup: false,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Focus, Notifications & Attention Management</h3>
        <p className="text-sm text-muted-foreground">
          Control how aggressively Workspace AI manages noise and suggests focus.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Focus Mode Behavior</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground mb-3">When I start Focus on a project:</p>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Prioritize tasks + decisions from that project</Label>
            <Switch
              checked={settings.focusPrioritizeTasks}
              onCheckedChange={(checked) => setSettings({ ...settings, focusPrioritizeTasks: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Batch Slack notifications marked as "low priority"</Label>
            <Switch
              checked={settings.focusBatchSlack}
              onCheckedChange={(checked) => setSettings({ ...settings, focusBatchSlack: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Auto-set "Focus" on my calendar (visible to others)</Label>
            <Switch
              checked={settings.focusCalendar}
              onCheckedChange={(checked) => setSettings({ ...settings, focusCalendar: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Workspace notifications:</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">In-app banners & toasts</Label>
                <Switch
                  checked={settings.notifyInApp}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyInApp: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Email notifications for critical risks</Label>
                <Switch
                  checked={settings.notifyEmail}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifyEmail: checked })}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <Label className="text-sm">Slack DMs from Workspace AI for high-urgency items</Label>
                <Switch
                  checked={settings.notifySlackDM}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifySlackDM: checked })}
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Frequency:</Label>
            <RadioGroup
              value={settings.notifyFrequency}
              onValueChange={(value) => setSettings({ ...settings, notifyFrequency: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="critical" id="critical" />
                <Label htmlFor="critical" className="text-sm cursor-pointer">Only critical</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="text-sm cursor-pointer">Standard</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="rich" id="rich" />
                <Label htmlFor="rich" className="text-sm cursor-pointer">Rich (include more recommendations)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Nudges</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground mb-3">Suggest focus time when:</p>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">I have many tasks for a project</Label>
            <Switch
              checked={settings.nudgeTasks}
              onCheckedChange={(checked) => setSettings({ ...settings, nudgeTasks: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">I've had several hours of meetings that day</Label>
            <Switch
              checked={settings.nudgeMeetings}
              onCheckedChange={(checked) => setSettings({ ...settings, nudgeMeetings: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Suggest clean-up of stale tasks every Friday</Label>
            <Switch
              checked={settings.nudgeCleanup}
              onCheckedChange={(checked) => setSettings({ ...settings, nudgeCleanup: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusNotificationsTab;
