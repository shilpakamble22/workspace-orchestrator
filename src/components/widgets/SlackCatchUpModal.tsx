import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { 
  Sun, 
  Calendar, 
  Mail, 
  MessageSquare, 
  History,
  Hash,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlackCatchUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickActions = [
  { id: "summarize", icon: Sun, label: "Summarize My Day" },
  { id: "plan", icon: Calendar, label: "Plan My Week" },
  { id: "inbox", icon: Mail, label: "Review My Inbox" },
  { id: "slack", icon: MessageSquare, label: "Catch Me Up on Slack" },
  { id: "recap", icon: History, label: "Recap" },
];

const channelSummaries = [
  { 
    channel: "#emcps-dev", 
    summary: "Discussion on connector latency fixes and deployment timeline for US-West." 
  },
  { 
    channel: "#zoom-aic-rollout", 
    summary: "Q4 adoption metrics review, training schedule updates, and feedback collection." 
  },
  { 
    channel: "#your-mentions", 
    summary: "5 direct mentions: 3 on EMCPS launch timeline, 2 on budget approvals." 
  },
];

const directMessages = [
  { from: "Mike Chen (DM)", message: "Can you review the latency incident RCA draft?" },
  { from: "Sarah Johnson (DM)", message: "Heads up: stakeholder meeting moved to 3 PM." },
];

export function SlackCatchUpModal({ open, onOpenChange }: SlackCatchUpModalProps) {
  const [selectedAction, setSelectedAction] = useState("slack");
  const [notifyWhenDone, setNotifyWhenDone] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="sr-only">Quick Actions</DialogTitle>
          
          {/* Quick Action Tabs */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex gap-3 overflow-x-auto flex-1 pb-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 min-w-[120px] rounded-lg border transition-all shrink-0",
                      selectedAction === action.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    )}
                  >
                    <action.icon className={cn(
                      "h-5 w-5",
                      selectedAction === action.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-xs font-medium text-center",
                      selectedAction === action.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
              
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* Notify Toggle */}
        <div className="flex items-center gap-3 py-2">
          <Switch 
            checked={notifyWhenDone} 
            onCheckedChange={setNotifyWhenDone}
          />
          <span className="text-sm text-muted-foreground">Notify me when done</span>
        </div>

        {/* Slack Summary Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pt-2"
        >
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Slack Summary</h2>
            
            {/* Channel Summaries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {channelSummaries.map((item, index) => (
                <motion.div
                  key={item.channel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={cn(
                    "p-4 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors cursor-pointer",
                    index === 2 && "md:col-span-1"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.channel.replace('#', '')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </motion.div>
              ))}
            </div>

            {/* Direct Messages */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Direct messages</h3>
              <div className="space-y-2">
                {directMessages.map((dm, index) => (
                  <motion.div
                    key={dm.from}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border bg-background hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-foreground min-w-[140px]">{dm.from}</span>
                    <span className="text-sm text-muted-foreground">{dm.message}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 pt-4"
          >
            <Button variant="default" className="gap-2">
              Export Summary
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M14.5 10C13.67 10 13 9.33 13 8.5C13 7.67 13.67 7 14.5 7C15.33 7 16 7.67 16 8.5C16 9.33 15.33 10 14.5 10Z" fill="#E01E5A"/>
                <path d="M9.5 10C8.67 10 8 9.33 8 8.5C8 7.67 8.67 7 9.5 7C10.33 7 11 7.67 11 8.5C11 9.33 10.33 10 9.5 10Z" fill="#36C5F0"/>
                <path d="M9.5 17C8.67 17 8 16.33 8 15.5C8 14.67 8.67 14 9.5 14C10.33 14 11 14.67 11 15.5C11 16.33 10.33 17 9.5 17Z" fill="#2EB67D"/>
                <path d="M14.5 17C13.67 17 13 16.33 13 15.5C13 14.67 13.67 14 14.5 14C15.33 14 16 14.67 16 15.5C16 16.33 15.33 17 14.5 17Z" fill="#ECB22E"/>
              </svg>
              Open in Slack
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}