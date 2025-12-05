import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  Zap,
  Briefcase,
  Shield,
  Archive,
  Settings,
  MoreHorizontal,
  FolderOpen,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ProjectDirectoryViewProps {
  onSelectProject: (projectId: string) => void;
}

type ViewMode = "grid" | "list";
type FilterScope = "my-projects" | "my-team" | "all";

interface Project {
  id: string;
  name: string;
  description: string;
  type: "program" | "incident" | "customer" | "initiative" | "operations";
  status: "on-track" | "at-risk" | "delayed" | "completed" | "archived";
  owner: string;
  ownerAvatar: string;
  team: string;
  lastUpdated: string;
  tasksAtRisk: number;
  decisions: number;
  members: number;
  progress: number;
}

const projectTypeConfig: Record<string, { label: string; icon: React.ComponentType<any>; color: string }> = {
  program: { label: "Program", icon: Briefcase, color: "text-primary" },
  incident: { label: "Incident", icon: Zap, color: "text-destructive" },
  customer: { label: "Customer", icon: Users, color: "text-success" },
  initiative: { label: "Initiative", icon: TrendingUp, color: "text-warning" },
  operations: { label: "Operations", icon: Shield, color: "text-muted-foreground" },
};

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  "on-track": { label: "On Track", color: "text-success", bgColor: "bg-success/20" },
  "at-risk": { label: "At Risk", color: "text-warning", bgColor: "bg-warning/20" },
  delayed: { label: "Delayed", color: "text-destructive", bgColor: "bg-destructive/20" },
  completed: { label: "Completed", color: "text-muted-foreground", bgColor: "bg-muted" },
  archived: { label: "Archived", color: "text-muted-foreground", bgColor: "bg-muted/50" },
};

const mockProjects: Project[] = [
  {
    id: "emcps-launch",
    name: "EMCPS Launch",
    description: "Enterprise Multi-Cloud Platform Services · Jan 15 LA Target",
    type: "program",
    status: "at-risk",
    owner: "Priya Sharma",
    ownerAvatar: "PS",
    team: "EMCPS Program Team",
    lastUpdated: "2 hours ago",
    tasksAtRisk: 2,
    decisions: 5,
    members: 12,
    progress: 72,
  },
  {
    id: "zoom-aic-rollout",
    name: "Zoom AIC Rollout",
    description: "Global rollout of Zoom AI Companion features",
    type: "program",
    status: "on-track",
    owner: "Priya Sharma",
    ownerAvatar: "PS",
    team: "Zoom AIC Team",
    lastUpdated: "1 hour ago",
    tasksAtRisk: 0,
    decisions: 8,
    members: 8,
    progress: 85,
  },
  {
    id: "incident-latency",
    name: "EMCPS Latency Incident",
    description: "Critical latency spike investigation - Dec 5",
    type: "incident",
    status: "at-risk",
    owner: "Mike Chen",
    ownerAvatar: "MC",
    team: "SRE Team",
    lastUpdated: "30 mins ago",
    tasksAtRisk: 3,
    decisions: 2,
    members: 6,
    progress: 45,
  },
  {
    id: "acme-onboarding",
    name: "ACME Corp Onboarding",
    description: "Enterprise customer onboarding - Q1 target",
    type: "customer",
    status: "on-track",
    owner: "Sarah Johnson",
    ownerAvatar: "SJ",
    team: "Customer Success",
    lastUpdated: "4 hours ago",
    tasksAtRisk: 1,
    decisions: 3,
    members: 5,
    progress: 60,
  },
  {
    id: "cost-optimization",
    name: "Cloud Cost Optimization",
    description: "Q1 2025 cost reduction initiative",
    type: "initiative",
    status: "on-track",
    owner: "David Kim",
    ownerAvatar: "DK",
    team: "Platform Team",
    lastUpdated: "1 day ago",
    tasksAtRisk: 0,
    decisions: 4,
    members: 7,
    progress: 35,
  },
  {
    id: "security-audit",
    name: "Annual Security Audit",
    description: "SOC2 and compliance review",
    type: "operations",
    status: "completed",
    owner: "Lisa Wang",
    ownerAvatar: "LW",
    team: "Security Team",
    lastUpdated: "3 days ago",
    tasksAtRisk: 0,
    decisions: 12,
    members: 4,
    progress: 100,
  },
];

const portfolioViews = [
  { label: "All projects owned by SVP Engineering", count: 8 },
  { label: "All incidents tagged Critical", count: 2 },
  { label: "Programs launching this quarter", count: 4 },
];

export function ProjectDirectoryView({ onSelectProject }: ProjectDirectoryViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterScope, setFilterScope] = useState<FilterScope>("my-projects");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("last-activity");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== "all" && project.status !== statusFilter) {
      return false;
    }
    if (typeFilter !== "all" && project.type !== typeFilter) {
      return false;
    }
    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "priority":
        return b.tasksAtRisk - a.tasksAtRisk;
      case "owner":
        return a.owner.localeCompare(b.owner);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage and discover project workspaces</p>
        </div>
        <Button variant="glow" className="gap-2" onClick={() => setShowNewProjectModal(true)}>
          <Plus className="h-4 w-4" />
          New Project Workspace
        </Button>
      </motion.div>

      {/* Portfolio Views */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-3 overflow-x-auto pb-2"
      >
        {portfolioViews.map((view, index) => (
          <button
            key={index}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all text-sm text-muted-foreground hover:text-foreground"
          >
            <span>{view.label}</span>
            <Badge variant="muted" className="ml-2 text-[10px]">
              {view.count}
            </Badge>
          </button>
        ))}
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Scope Filter */}
          <div className="flex rounded-lg border border-border bg-card p-1">
            {(["my-projects", "my-team", "all"] as FilterScope[]).map((scope) => (
              <button
                key={scope}
                onClick={() => setFilterScope(scope)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-all",
                  filterScope === scope
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {scope === "my-projects" ? "My Projects" : scope === "my-team" ? "My Team" : "All"}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-card border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="on-track">On Track</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] bg-card border-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="program">Program</SelectItem>
              <SelectItem value="incident">Incident</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="initiative">Initiative</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-activity">Last Activity</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedProjects.length} of {mockProjects.length} projects
      </div>

      {/* Project Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {sortedProjects.map((project, index) => (
              <ProjectGridCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => onSelectProject(project.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {sortedProjects.map((project, index) => (
              <ProjectListRow
                key={project.id}
                project={project}
                index={index}
                onClick={() => onSelectProject(project.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewProjectModal && (
          <NewProjectModal onClose={() => setShowNewProjectModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectGridCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const TypeIcon = projectTypeConfig[project.type].icon;
  const status = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      onClick={onClick}
      className="group rounded-xl border border-border bg-card p-5 cursor-pointer transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-lg bg-muted", projectTypeConfig[project.type].color)}>
            <TypeIcon className="h-4 w-4" />
          </div>
          <Badge variant="muted" className="text-[10px]">
            {projectTypeConfig[project.type].label}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="h-4 w-4 mr-2" />
              Manage Members
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-foreground mb-1">{project.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

      {/* Status & Progress */}
      <div className="flex items-center gap-2 mb-4">
        <Badge className={cn(status.bgColor, status.color, "border-0")}>{status.label}</Badge>
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{project.progress}%</span>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        {project.tasksAtRisk > 0 && (
          <div className="flex items-center gap-1 text-warning">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{project.tasksAtRisk} at risk</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{project.decisions} decisions</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] font-semibold flex items-center justify-center">
            {project.ownerAvatar}
          </div>
          <span className="text-sm text-muted-foreground">{project.owner}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {project.lastUpdated}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectListRow({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const TypeIcon = projectTypeConfig[project.type].icon;
  const status = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.03 * index }}
      onClick={onClick}
      className="group rounded-lg border border-border bg-card p-4 cursor-pointer transition-all hover:border-primary/30 hover:bg-accent/30"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={cn("p-2 rounded-lg bg-muted shrink-0", projectTypeConfig[project.type].color)}>
          <TypeIcon className="h-5 w-5" />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
            <Badge variant="muted" className="text-[10px] shrink-0">
              {projectTypeConfig[project.type].label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">{project.description}</p>
        </div>

        {/* Status */}
        <Badge className={cn(status.bgColor, status.color, "border-0 shrink-0")}>{status.label}</Badge>

        {/* Owner */}
        <div className="hidden md:flex items-center gap-2 shrink-0 w-32">
          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] font-semibold flex items-center justify-center">
            {project.ownerAvatar}
          </div>
          <span className="text-sm text-muted-foreground truncate">{project.owner}</span>
        </div>

        {/* Team */}
        <div className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground shrink-0 w-40 truncate">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{project.team}</span>
        </div>

        {/* Last Updated */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0 w-24">
          <Clock className="h-3 w-3" />
          {project.lastUpdated}
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="h-4 w-4 mr-2" />
              Manage Members
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

function NewProjectModal({ onClose }: { onClose: () => void }) {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("program");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Create New Project Workspace</h2>

        <div className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Project Name</label>
            <Input
              placeholder="e.g., EMCPS Launch"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-muted border-border"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Project Type</label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="program">Program</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="initiative">Initiative</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <Input
              placeholder="Brief description of the project"
              className="bg-muted border-border"
            />
          </div>

          {/* Integrations */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Connect Integrations</label>
            <div className="flex flex-wrap gap-2">
              {["Jira", "Slack", "Confluence", "Outlook"].map((integration) => (
                <Badge
                  key={integration}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                >
                  + {integration}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="glow">Create Workspace</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
