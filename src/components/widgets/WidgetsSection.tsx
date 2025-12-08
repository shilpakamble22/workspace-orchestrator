import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, Plus } from "lucide-react";
import { WidgetTile } from "./WidgetTile";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { MeetingPrepModal } from "./MeetingPrepModal";
import { SlackCatchUpModal } from "./SlackCatchUpModal";

export function WidgetsSection() {
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [meetingPrepOpen, setMeetingPrepOpen] = useState(false);
  const [slackCatchUpOpen, setSlackCatchUpOpen] = useState(false);
  
  const handleSelectWidget = (widgetId: string) => {
    console.log("Selected widget:", widgetId);
    // Handle widget addition logic here
  };
  
  return <motion.section initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: 0.35
  }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">My Widgets</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WidgetTile icon={MessageSquare} label="Catch me up on Slack" onClick={() => setSlackCatchUpOpen(true)} />
        <WidgetTile icon={Calendar} label="Prep me for my next meeting" onClick={() => setMeetingPrepOpen(true)} />
        <WidgetTile icon={Plus} label="Add widget" onClick={() => setAddWidgetOpen(true)} isAddTile />
      </div>

      <AddWidgetDialog open={addWidgetOpen} onOpenChange={setAddWidgetOpen} onSelectWidget={handleSelectWidget} />
      <MeetingPrepModal open={meetingPrepOpen} onOpenChange={setMeetingPrepOpen} />
      <SlackCatchUpModal open={slackCatchUpOpen} onOpenChange={setSlackCatchUpOpen} />
    </motion.section>;
}