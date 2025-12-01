// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  selectedText?: string | null;
  onThreadChange: (id: string | null) => void;
  onResponseCompleted: () => void;
};

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

const API_URL = (typeof window !== 'undefined' && (window as any).BACKEND_API_URL) || 'http://localhost:8000';

export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle selected text
  useEffect(() => {
    if (selectedText) {
      setInputValue(`Explain this: "${selectedText}"`);
    }
  }, [selectedText]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          selected_text: selectedText || null
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // OpenAI format: choices[0].message.content
      const aiContent = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      onResponseCompleted();
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Sorry, I encountered an error connecting to the server. Please ensure the backend is running.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--ifm-background-surface-color)',
      color: 'var(--ifm-font-color-base)'
    }}>
      {/* Messages Area */}
      <div className="chat-messages" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx('message', msg.role)}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '14px',
              lineHeight: '1.5',
              backgroundColor: msg.role === 'user'
                ? 'var(--ifm-color-primary)'
                : msg.role === 'system'
                  ? 'var(--ifm-color-danger-lightest)'
                  : 'var(--ifm-color-emphasis-200)',
              color: msg.role === 'user'
                ? '#fff'
                : msg.role === 'system'
                  ? 'var(--ifm-color-danger)'
                  : 'var(--ifm-font-color-base)',
              borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px',
              borderBottomLeftRadius: msg.role === 'assistant' ? '2px' : '12px',
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant" style={{
            alignSelf: 'flex-start',
            backgroundColor: 'var(--ifm-color-emphasis-200)',
            padding: '10px 14px',
            borderRadius: '12px',
            borderBottomLeftRadius: '2px'
          }}>
            <div className="typing-indicator">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        style={{
          padding: '12px',
          borderTop: '1px solid var(--ifm-color-emphasis-200)',
          display: 'flex',
          gap: '8px',
          backgroundColor: 'var(--ifm-background-surface-color)'
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '20px',
            border: '1px solid var(--ifm-color-emphasis-300)',
            backgroundColor: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'var(--ifm-color-primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}