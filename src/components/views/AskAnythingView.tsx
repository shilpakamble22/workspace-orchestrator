import { useState } from "react";
import { Sparkles, Plus, Send, ArrowUp, Lightbulb, FileText, MessageSquare } from "lucide-react";
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

const suggestions = [
  {
    title: "Brainstorm ideas and solutions",
    description: "Produce multiple ideas or approaches to solve a problem or spark innovation",
  },
  {
    title: "Draft communications",
    description: "Generate polished emails, memos, or letters",
  },
  {
    title: "Summarize documents",
    description: "Summarize documents, articles, or meeting notes into actionable highlights",
  },
];

export function AskAnythingView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-6 bg-background">
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-muted">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h1 className="text-3xl font-normal text-foreground">
                    Oracle AI Assistant
                  </h1>
                </div>
                <p className="text-muted-foreground mb-10">
                  Your intelligent workspace companion
                </p>

                {/* Chat Input Box */}
                <div className="w-full max-w-2xl mb-8">
                  <div className="relative bg-card border border-border rounded-2xl shadow-sm">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      placeholder="How can I help you today?"
                      className="w-full h-14 px-5 pr-14 bg-transparent border-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
                      disabled={!input.trim() || isLoading}
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="w-full max-w-2xl">
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-sm font-medium">Suggested</span>
                  </div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.title}
                        onClick={() => handleSuggestionClick(suggestion.title)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {suggestion.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 pb-32"
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

      {/* Fixed Input Area when there are messages */}
      {messages.length > 0 && (
        <div className="border-t border-border p-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-card border border-border rounded-2xl shadow-sm">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="How can I help you today?"
                className="w-full h-14 px-5 pr-14 bg-transparent border-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
                disabled={!input.trim() || isLoading}
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
