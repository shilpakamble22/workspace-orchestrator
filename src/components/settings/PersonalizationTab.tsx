import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PersonalizationTab = () => {
  const [settings, setSettings] = useState({
    summaryLength: "standard",
    summaryTone: "neutral",
    showDecisions: true,
    showMetrics: false,
    showAgents: true,
    showEndOfDay: true,
    showMorningFocus: false,
    weeklyEmail: false,
    language: "en",
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Personalization & Experience</h3>
        <p className="text-sm text-muted-foreground">
          Control how Workspace AI speaks and what it emphasizes.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Summary Style</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Length</Label>
            <RadioGroup
              value={settings.summaryLength}
              onValueChange={(value) => setSettings({ ...settings, summaryLength: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="concise" id="concise" />
                <Label htmlFor="concise" className="text-sm cursor-pointer">Concise (2–3 bullets)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="text-sm cursor-pointer">Standard (default)</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="detailed" id="detailed" />
                <Label htmlFor="detailed" className="text-sm cursor-pointer">Detailed</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">Tone</Label>
            <RadioGroup
              value={settings.summaryTone}
              onValueChange={(value) => setSettings({ ...settings, summaryTone: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral" className="text-sm cursor-pointer">Neutral</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="executive" id="executive" />
                <Label htmlFor="executive" className="text-sm cursor-pointer">Executive-ready</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                <RadioGroupItem value="technical" id="technical" />
                <Label htmlFor="technical" className="text-sm cursor-pointer">Technical (include more implementation detail)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Preferred Views</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show "Decisions" section at the top of project workspaces</Label>
            <Switch
              checked={settings.showDecisions}
              onCheckedChange={(checked) => setSettings({ ...settings, showDecisions: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show "Metrics/KPIs" widget for projects (if configured)</Label>
            <Switch
              checked={settings.showMetrics}
              onCheckedChange={(checked) => setSettings({ ...settings, showMetrics: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show "Agents" panel in project workspaces</Label>
            <Switch
              checked={settings.showAgents}
              onCheckedChange={(checked) => setSettings({ ...settings, showAgents: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">"Start / End My Day" Helpers</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show daily end-of-day Insights & Planning card</Label>
            <Switch
              checked={settings.showEndOfDay}
              onCheckedChange={(checked) => setSettings({ ...settings, showEndOfDay: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Show morning suggested focus block</Label>
            <Switch
              checked={settings.showMorningFocus}
              onCheckedChange={(checked) => setSettings({ ...settings, showMorningFocus: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Email me a weekly summary</Label>
            <Switch
              checked={settings.weeklyEmail}
              onCheckedChange={(checked) => setSettings({ ...settings, weeklyEmail: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Language & Terminology</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Preferred language</Label>
            <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
              <SelectTrigger className="w-[200px] bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-3 rounded-lg bg-muted/20">
            <Label className="text-sm text-muted-foreground">
              Internal terminology mapping: Treats "epic", "initiative", and "program" as similar concepts in summaries.
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationTab;
