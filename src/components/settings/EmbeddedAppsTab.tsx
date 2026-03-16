import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Search, Layout, BookOpen, Zap, FileText, MessageSquare, HelpCircle } from "lucide-react";

const connectors = [
  {
    name: "Central Confluence Connector",
    description: "Search and reference Confluence pages inside the companion",
    icon: FileText,
  },
  {
    name: "SharePoint / OneDrive Connector",
    description: "Access SharePoint files and OneDrive documents in chat",
    icon: Layout,
  },
  {
    name: "Ask Oracle Connector",
    description: "Surface internal knowledge base content in chat",
    icon: HelpCircle,
  },
];

const comingSoon = ["Slack Connector", "Jira MCP Connector"];

const steps = [
  {
    number: 1,
    title: "Open the Apps panel",
    description: "Go to the Work AI Companion homepage and open the left sidebar. Click Apps to open the connector catalogue.",
  },
  {
    number: 2,
    title: "Find and click the connector",
    description: "Browse or search for the app you want. Click on it to open the details page, then click Connect.",
  },
  {
    number: 3,
    title: "Authenticate",
    description: "Click Continue and follow the on-screen steps. Most apps use Oracle SSO. For Confluence, click Allow on the additional permissions screen.",
  },
  {
    number: 4,
    title: "Start using it",
    description: "Once connected, click Start Chat. Or in any chat, click the + icon in the prompt bar → More to add the connector.",
  },
  {
    number: 5,
    title: "Use it in your prompt",
    description: "Mention the app by name in your prompt, or select it via + / More. The AI will search and reference your connected data without leaving the chat.",
  },
];

const capabilities = [
  "Search and reference your connected data inside chat",
  "Provide interactive UI elements inside the conversation",
  "Support Deep Research with citations from internal sources",
  "Sync data ahead of time for faster answers",
];

const EmbeddedAppsTab = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Oracle Tools</p>
        <h2 className="text-3xl font-extrabold text-foreground mb-4" style={{ fontFamily: "'Georgia', serif" }}>
          Apps &amp; Connectors
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Description */}
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Apps are small applications that run inside the Work AI Companion and extend what the AI can do. Think of them like apps on a smartphone — except instead of opening them separately, you use them directly in a chat conversation. They let you bring external tools and data into a chat so the AI can search, reference, and take actions without leaving the conversation.
          </p>

          <div>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              What Connected Apps Can Do
            </p>
            <ul className="space-y-2">
              {capabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Connectors list */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Available MCP Connectors
          </p>
          <div className="space-y-3">
            {connectors.map((connector) => (
              <Card key={connector.name} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2 rounded-lg bg-muted/30">
                    <connector.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{connector.name}</p>
                    <p className="text-xs text-muted-foreground">{connector.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-2">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Coming Soon
            </p>
            <div className="flex gap-2 flex-wrap">
              {comingSoon.map((name) => (
                <Badge key={name} variant="outline" className="text-xs font-normal px-3 py-1.5">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Setup</p>
        <h3 className="text-2xl font-extrabold text-foreground mb-6" style={{ fontFamily: "'Georgia', serif" }}>
          How to Connect an App
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => (
            <Card key={step.number} className="bg-card/50 border-border/50">
              <CardContent className="p-5">
                <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-3">
                  {step.number}
                </div>
                <p className="font-semibold text-sm text-foreground mb-2">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Help banner */}
      <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30">
        <CardContent className="p-4">
          <p className="text-sm text-foreground">
            Need help? Post in <span className="font-mono font-semibold">#help-enterprise-ai</span> on Slack. Full connector guides and the MCP roadmap are on Confluence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddedAppsTab;
