import { useState } from "react";
import { Sparkles, Plus, Send, FileText, FolderSearch, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  unread?: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "Project Alpha Discussion",
    preview: "Latest updates on the timeline...",
    timestamp: "2m ago",
    unread: 3,
  },
  {
    id: "2",
    title: "Team Sync Notes",
    preview: "Action items from today's meeting...",
    timestamp: "1h ago",
  },
  {
    id: "3",
    title: "Product Roadmap Q1",
    preview: "Reviewing feature priorities...",
    timestamp: "3h ago",
    unread: 1,
  },
  {
    id: "4",
    title: "Customer Feedback Analysis",
    preview: "Summary of this week's responses...",
    timestamp: "1d ago",
  },
];

const suggestionChips = [
  { label: "Summarize recent docs", icon: FileText },
  { label: "Find project updates", icon: FolderSearch },
  { label: "Search team files", icon: Users },
];

export function AskAnythingView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm your AI assistant. I can help you with questions about your projects, summarize documents, find updates, and more. This is a demo response - connect to Lovable Cloud to enable real AI capabilities.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setSelectedConversation(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6">
      {/* Conversation Sidebar */}
      <div className="w-80 border-r border-border bg-card/50 flex flex-col">
        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full gap-2"
            variant="default"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 pb-4">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "w-full text-left px-3 py-3 rounded-lg transition-colors",
                  selectedConversation === conversation.id
                    ? "bg-accent"
                    : "hover:bg-accent/50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-foreground truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {conversation.preview}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conversation.timestamp}
                    </p>
                  </div>
                  {conversation.unread && (
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center min-h-[50vh]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Start a conversation
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Ask questions, get summaries, or chat about your work
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center">
                    {suggestionChips.map((chip) => {
                      const Icon = chip.icon;
                      return (
                        <Button
                          key={chip.label}
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleSuggestionClick(chip.label)}
                        >
                          <Icon className="h-4 w-4" />
                          {chip.label}
                        </Button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-4",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 h-12 rounded-xl"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-12 w-12 rounded-xl"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
