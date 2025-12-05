import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Keyboard, ExternalLink } from "lucide-react";

const AccessibilityTab = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largerFont: false,
    compactMode: false,
    keyboardShortcuts: true,
    reduceMotion: false,
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Accessibility & UI</h3>
        <p className="text-sm text-muted-foreground">
          Customize the interface for your accessibility needs.
        </p>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Display</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">High-contrast mode</Label>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => setSettings({ ...settings, highContrast: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Larger font size</Label>
            <Switch
              checked={settings.largerFont}
              onCheckedChange={(checked) => setSettings({ ...settings, largerFont: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Compact mode for dense tables</Label>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => setSettings({ ...settings, compactMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="py-4">
          <CardTitle className="text-base">Keyboard & Navigation</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Enable keyboard shortcuts</Label>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                <Keyboard className="h-3 w-3 mr-1" />
                View shortcuts
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <Switch
              checked={settings.keyboardShortcuts}
              onCheckedChange={(checked) => setSettings({ ...settings, keyboardShortcuts: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <Label className="text-sm">Reduce motion / animations</Label>
            <Switch
              checked={settings.reduceMotion}
              onCheckedChange={(checked) => setSettings({ ...settings, reduceMotion: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border/50 border-dashed">
        <CardContent className="py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need additional accessibility accommodations?
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityTab;
