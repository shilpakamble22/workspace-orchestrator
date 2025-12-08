import { Video, CheckCircle2, AlertTriangle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
interface MeetingOutcomesCardProps {
  onReview: () => void;
}
export function MeetingOutcomesCard({
  onReview
}: MeetingOutcomesCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.2
  }} className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 glow-primary">
      {/* Glow effect */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Meeting Processed</h3>
                <Badge variant="success" className="text-[10px]">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground">EMCPS Launch – Go/No-Go Checkpoint</p>
            </div>
          </div>
          <Badge variant="glass" className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            9:45 AM
          </Badge>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Action Items</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">6</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-info" />
              <span>Decisions</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">3</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 border border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span>Risks</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">2</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={onReview} className="gap-2" variant="glow">
            Review 
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            Skip for now
          </Button>
        </div>
      </div>
    </motion.div>;
}