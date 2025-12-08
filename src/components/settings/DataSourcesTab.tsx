import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageSquare, Mail, Calendar, CheckSquare, FileText, ChevronDown, Settings, Eye, Pause, Trash2 } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  lastSync?: string;
  permissions: {
    id: string;
    label: string;
    enabled: boolean;
    locked?: boolean;
  }[];
}

const DataSourcesTab = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "slack",
      name: "Slack",
      icon: <MessageSquare className="h-5 w-5" />,
      connected: true,
      lastSync: "2 minutes ago",
      permissions: [
        { id: "public_channels", label: "Public channels I'm a member of", enabled: true },
        { id: "private_channels", label: "Private channels (explicitly selected only)", enabled: false },
        { id: "dms", label: "Direct messages (off by default)", enabled: false },
        { id: "training", label: "Use Slack as a source for training / personalization", enabled: false },
      ],
    },
    {
      id: "outlook",
      name: "Outlook",
      icon: <Mail className="h-5 w-5" />,
      connected: true,
      lastSync: "5 minutes ago",
      permissions: [
        { id: "selected_folders", label: "Read subject + body in selected folders (e.g. 'Projects', 'Status')", enabled: true },
        { id: "all_mail", label: "Read all mail", enabled: false, locked: true },
        { id: "drafts_only", label: "Draft emails as 'Drafts only – never auto-send'", enabled: true },
      ],
    },
    {
      id: "calendar",
      name: "Outlook Calendar",
      icon: <Calendar className="h-5 w-5" />,
      connected: true,
      lastSync: "1 minute ago",
      permissions: [
        { id: "availability", label: "Show availability", enabled: true },
        { id: "focus_blocks", label: "Suggest focus blocks", enabled: true },
        { id: "zoom_summaries", label: "Suggest meeting summaries from Zoom AIC recordings", enabled: false },
      ],
    },
    {
      id: "jira",
      name: "Jira / Work Management",
      icon: <CheckSquare className="h-5 w-5" />,
      connected: true,
      lastSync: "3 minutes ago",
      permissions: [
        { id: "read_tickets", label: "Read Jira tickets I can access", enabled: true },
        { id: "create_update", label: "Create / update tickets on my behalf (with my identity)", enabled: true },
        { id: "bulk_ops", label: "Allow bulk operations", enabled: false },
      ],
    },
    {
      id: "confluence",
      name: "Confluence / Docs",
      icon: <FileText className="h-5 w-5" />,
      connected: true,
      lastSync: "10 minutes ago",
      permissions: [
        { id: "read_spaces", label: "Read pages in spaces I can access", enabled: true },
        { id: "restricted_spaces", label: "Read restricted spaces (must be explicitly selected)", enabled: false },
        { id: "suggest_reorg", label: "Allow Workspace AI to suggest doc reorganizations / new pages", enabled: false },
      ],
    },
  ]);

  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const togglePermission = (sourceId: string, permissionId: string) => {
    setDataSources(sources =>
      sources.map(source =>
        source.id === sourceId
          ? {
              ...source,
              permissions: source.permissions.map(perm =>
                perm.id === permissionId && !perm.locked
                  ? { ...perm, enabled: !perm.enabled }
                  : perm
              ),
            }
          : source
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Data Sources & Connections</h3>
        <p className="text-sm text-muted-foreground">
          Control which systems Workspace AI can read and act on for your account.
        </p>
      </div>

      {dataSources.map(source => (
        <Collapsible
          key={source.id}
          open={expandedSource === source.id}
          onOpenChange={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
        >
          <Card className="bg-card/50 border-border/50">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {source.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium">{source.name}</CardTitle>
                      {source.connected && (
                        <p className="text-xs text-muted-foreground">Last synced: {source.lastSync}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={source.connected ? "default" : "secondary"} className="text-xs">
                      {source.connected ? "Connected" : "Not connected"}
                    </Badge>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSource === source.id ? "rotate-180" : ""}`} />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4">
                <div className="space-y-3 mb-4">
                  {source.permissions.map(perm => (
                    <div key={perm.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20">
                      <span className={`text-sm ${perm.locked ? "text-muted-foreground" : "text-foreground"}`}>
                        {perm.label}
                        {perm.locked && (
                          <Badge variant="outline" className="ml-2 text-xs">Admin locked</Badge>
                        )}
                      </span>
                      <Switch
                        checked={perm.enabled}
                        onCheckedChange={() => togglePermission(source.id, perm.id)}
                        disabled={perm.locked}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Settings className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View sample data
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-amber-500 hover:text-amber-400">
                    <Pause className="h-3 w-3 mr-1" />
                    Pause access
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
};

export default DataSourcesTab;
