import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GeneralTab = () => {
  const [settings, setSettings] = useState({
    defaultLanding: "home",
    timezone: "auto",
    dateFormat: "MM/DD/YYYY",
    taskView: "list",
    showMeetingOutcomes: true,
    meetingDurationFilter: false,
    meetingActionItemsOnly: false,
    suggestIncidentWorkspaces: true,
    manualIncidentsOnly: false,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Control basic behavior of the Workspace AI interface.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Default Landing View</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RadioGroup
            value={settings.defaultLanding}
            onValueChange={(value) => setSettings({ ...settings, defaultLanding: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="home" id="home" />
              <Label htmlFor="home" className="text-sm cursor-pointer">Home – My day & tasks</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="projects" id="projects" />
              <Label htmlFor="projects" className="text-sm cursor-pointer">Projects – Project directory</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="last" id="last" />
              <Label htmlFor="last" className="text-sm cursor-pointer">Last project I visited</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Time Zone & Locale</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Time zone</Label>
            <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
              <SelectTrigger className="w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect (PST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Date/time format</Label>
            <Select value={settings.dateFormat} onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}>
              <SelectTrigger className="w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Task View Preference</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RadioGroup
            value={settings.taskView}
            onValueChange={(value) => setSettings({ ...settings, taskView: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="list" id="list" />
              <Label htmlFor="list" className="text-sm cursor-pointer">List</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="kanban" id="kanban" />
              <Label htmlFor="kanban" className="text-sm cursor-pointer">Kanban (grouped by status)</Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
              <RadioGroupItem value="project" id="project" />
              <Label htmlFor="project" className="text-sm cursor-pointer">Group by project</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Meeting Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show "Meeting Outcomes" panel automatically after Zoom AIC meetings</Label>
            <Switch
              checked={settings.showMeetingOutcomes}
              onCheckedChange={(checked) => setSettings({ ...settings, showMeetingOutcomes: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Only show for meetings &gt; 30 minutes</Label>
            <Switch
              checked={settings.meetingDurationFilter}
              onCheckedChange={(checked) => setSettings({ ...settings, meetingDurationFilter: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Only show when there are action items detected</Label>
            <Switch
              checked={settings.meetingActionItemsOnly}
              onCheckedChange={(checked) => setSettings({ ...settings, meetingActionItemsOnly: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Incident Workspaces</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Suggest incident workspaces when critical incidents are detected</Label>
            <Switch
              checked={settings.suggestIncidentWorkspaces}
              onCheckedChange={(checked) => setSettings({ ...settings, suggestIncidentWorkspaces: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Don't auto-suggest; only create manually</Label>
            <Switch
              checked={settings.manualIncidentsOnly}
              onCheckedChange={(checked) => setSettings({ ...settings, manualIncidentsOnly: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralTab;
