import { motion } from "framer-motion";
import { LucideIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
interface WidgetTileProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isAddTile?: boolean;
}
export function WidgetTile({
  icon: Icon,
  label,
  onClick,
  isAddTile
}: WidgetTileProps) {
  return <motion.button whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} onClick={onClick} className={cn("flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-all duration-200 min-h-[140px]", isAddTile ? "border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 hover:border-muted-foreground/50" : "border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5")}>
      <div className={cn("p-3 rounded-lg", isAddTile ? "bg-muted/50" : "bg-primary/10")}>
        <Icon className={cn("h-6 w-6", isAddTile ? "text-muted-foreground" : "text-primary")} />
      </div>
      <span className="">
        {label}
      </span>
    </motion.button>;
}