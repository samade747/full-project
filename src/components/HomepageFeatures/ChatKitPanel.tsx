// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useEffect } from "react";

type Props = {
  selectedText?: string | null;
  onThreadChange: (id: string | null) => void;
  onResponseCompleted: () => void;
};

export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setIsReady(true);
  }, []);

  if (error) {
    return (
      <div className="chat-error-fallback">
        <svg className="chat-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div>
          <div className="chat-error-title">Error</div>
          <div className="chat-error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="chat-loading-fallback">
        <div className="chat-loading-spinner" />
        <div className="chat-loading-text">Initializing...</div>
      </div>
    );
  }

  return (
    <ChatKitComponent 
      selectedText={selectedText}
      onThreadChange={onThreadChange}
      onResponseCompleted={onResponseCompleted}
      onError={setError}
    />
  );
}

function ChatKitComponent({ 
  selectedText,
  onThreadChange, 
  onResponseCompleted,
  onError 
}: Props & { onError: (error: string) => void }) {
  const [ChatKitModule, setChatKitModule] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    import("@openai/chatkit-react")
      .then((module) => {
        console.log("✅ ChatKit loaded");
        setChatKitModule(module);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ ChatKit load failed:", err);
        onError(`Failed to load: ${err.message}`);
        setIsLoading(false);
      });
  }, [onError]);

  if (isLoading || !ChatKitModule) {
    return (
      <div className="chat-loading-fallback">
        <div className="chat-loading-spinner" />
        <div className="chat-loading-text">Loading chat...</div>
      </div>
    );
  }

  return (
    <ActualChatKit
      ChatKit={ChatKitModule.ChatKit}
      useChatKit={ChatKitModule.useChatKit}
      selectedText={selectedText}
      onThreadChange={onThreadChange}
      onResponseCompleted={onResponseCompleted}
    />
  );
}

function ActualChatKit({ 
  ChatKit, 
  useChatKit,
  selectedText,
  onThreadChange, 
  onResponseCompleted 
}: any) {
  const chatkit = useChatKit({
    api: { 
      url: "http://localhost:8000/support/chatkit", 
      domainKey: "domain_pk_localhost_dev" 
    },
    theme: { 
      colorScheme: "dark" 
    },
    startScreen: { 
      greeting: "How can I assist you today?" 
    },
    composer: { 
      placeholder: "Ask me anything..." 
    },
    onResponseEnd: () => {
      console.log("✅ Response ended");
      onResponseCompleted();
    },
    onThreadChange: ({ threadId }: any) => {
      console.log("🔄 Thread changed:", threadId);
      onThreadChange(threadId ?? null);
    },
    onError: ({ error }: any) => {
      console.error("❌ ChatKit error:", error);
    },
  });

  // Auto-send selected text when it changes
  useEffect(() => {
    if (selectedText && chatkit.control) {
      const message = `Explain this: "${selectedText}"`;
      
      // Wait for ChatKit to be fully ready
      setTimeout(() => {
        try {
          // Try to send message programmatically
          // Note: This depends on ChatKit's API - might need adjustment
          chatkit.control.sendMessage?.(message);
          console.log("📤 Sent selected text to chat:", message);
        } catch (err) {
          console.error("Failed to send selected text:", err);
        }
      }, 500);
    }
  }, [selectedText, chatkit.control]);

  return (
    <div className="chat-primary-color" style={{ 
      height: "100%", 
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--chat-neutral-darker)",
    }}>
      <ChatKit 
        control={chatkit.control}
        style={{ 
          height: "100%", 
          width: "100%",
          flex: 1
        }}
      />
    </div>
  );
}