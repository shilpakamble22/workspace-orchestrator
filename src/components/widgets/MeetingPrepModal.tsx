import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Clock, 
  Users, 
  FileText, 
  AlertTriangle, 
  Sparkles, 
  MessageSquare, 
  ListChecks,
  Video,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface MeetingPrepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const upcomingMeeting = {
  title: "EMCPS Launch Readiness Review",
  time: "2:00 PM",
  timeUntil: "45 min",
  attendees: [
    { name: "Sarah Chen", initials: "SC", role: "Engineering Lead" },
    { name: "Mike Johnson", initials: "MJ", role: "Product Owner" },
    { name: "Lisa Park", initials: "LP", role: "QA Lead" },
    { name: "David Kim", initials: "DK", role: "DevOps" },
  ],
  platform: "Zoom",
};

const lastDecisions = [
  { text: "Delayed LA pilot by 1 week to address connector stability", date: "Dec 3" },
  { text: "Approved additional QA resources for final testing phase", date: "Dec 2" },
];

const openRisks = [
  { text: "Performance testing incomplete for high-load scenarios", severity: "high" },
  { text: "Documentation review pending from Legal", severity: "medium" },
];

const suggestedActions = [
  { icon: Sparkles, label: "Generate a briefing for this meeting", action: "briefing" },
  { icon: MessageSquare, label: "List open questions I should ask", action: "questions" },
  { icon: ListChecks, label: "Suggest agenda items", action: "agenda" },
];

export function MeetingPrepModal({ open, onOpenChange }: MeetingPrepModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Video className="h-4 w-4 text-primary" />
            <span>{upcomingMeeting.platform}</span>
            <span>•</span>
            <Clock className="h-4 w-4" />
            <span>In {upcomingMeeting.timeUntil}</span>
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {upcomingMeeting.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground italic mt-1">
            "Give me the context in 60 seconds."
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Attendees */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">Attendees</h3>
              <Badge variant="secondary" className="text-xs">{upcomingMeeting.attendees.length}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {upcomingMeeting.attendees.map((attendee) => (
                <div
                  key={attendee.initials}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">
                      {attendee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <span className="text-foreground">{attendee.name}</span>
                    <span className="text-muted-foreground ml-1 text-xs">• {attendee.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Last Decisions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">Recent Decisions</h3>
            </div>
            <div className="space-y-2">
              {lastDecisions.map((decision, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{decision.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{decision.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Open Risks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-medium text-foreground">Open Risks & Blockers</h3>
            </div>
            <div className="space-y-2">
              {openRisks.map((risk, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                >
                  <Badge 
                    variant="outline" 
                    className={
                      risk.severity === "high" 
                        ? "border-destructive/50 text-destructive text-xs" 
                        : "border-warning/50 text-warning text-xs"
                    }
                  >
                    {risk.severity}
                  </Badge>
                  <p className="text-sm text-foreground flex-1">{risk.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium text-foreground">AI Actions</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {suggestedActions.map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  className="justify-start gap-3 h-auto py-3 hover:bg-primary/5 hover:border-primary/30"
                >
                  <action.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
