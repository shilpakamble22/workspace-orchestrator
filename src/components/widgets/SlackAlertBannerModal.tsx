import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Bell, 
  Hash,
  AlertTriangle,
  Send,
} from "lucide-react";

interface SlackAlertBannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SlackAlertBannerModal({ open, onOpenChange }: SlackAlertBannerModalProps) {
  const [notifyWhenDone, setNotifyWhenDone] = useState(true);
  const [bannerMessage, setBannerMessage] = useState(
    "⚠️ Active Incident: EMCPS latency spike affecting US-West region. Our team is investigating. For updates, see #incident-emcps-latency or ticket INC-9087."
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Add Alert Banner in Slack
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Notify Toggle */}
        <div className="flex items-center gap-3 py-2">
          <Switch 
            checked={notifyWhenDone} 
            onCheckedChange={setNotifyWhenDone}
          />
          <span className="text-sm text-muted-foreground">Notify me when posted</span>
        </div>

        {/* Alert Banner Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pt-2"
        >
          {/* Target Channel */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Target Channel</h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-lg border border-primary/30 bg-primary/5"
            >
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">help-emcps</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Support channel for EMCPS users</p>
            </motion.div>
          </div>

          {/* Banner Preview */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Banner Message Preview</h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 rounded-lg border border-destructive/30 bg-destructive/10"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <Textarea
                    value={bannerMessage}
                    onChange={(e) => setBannerMessage(e.target.value)}
                    className="min-h-[80px] bg-background/50 border-border/50 text-foreground resize-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Posting Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-lg border border-border bg-background/50"
          >
            <p className="text-sm text-muted-foreground">
              This will post a pinned alert message to <span className="text-primary font-medium">#help-emcps</span> visible to all channel members.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 pt-4"
          >
            <Button variant="default" className="gap-2">
              <Send className="h-4 w-4" />
              Post Alert Banner
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M14.5 10C13.67 10 13 9.33 13 8.5C13 7.67 13.67 7 14.5 7C15.33 7 16 7.67 16 8.5C16 9.33 15.33 10 14.5 10Z" fill="#E01E5A"/>
                <path d="M9.5 10C8.67 10 8 9.33 8 8.5C8 7.67 8.67 7 9.5 7C10.33 7 11 7.67 11 8.5C11 9.33 10.33 10 9.5 10Z" fill="#36C5F0"/>
                <path d="M9.5 17C8.67 17 8 16.33 8 15.5C8 14.67 8.67 14 9.5 14C10.33 14 11 14.67 11 15.5C11 16.33 10.33 17 9.5 17Z" fill="#2EB67D"/>
                <path d="M14.5 17C13.67 17 13 16.33 13 15.5C13 14.67 13.67 14 14.5 14C15.33 14 16 14.67 16 15.5C16 16.33 15.33 17 14.5 17Z" fill="#ECB22E"/>
              </svg>
              Preview in Slack
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
