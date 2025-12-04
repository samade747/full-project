// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./ChatKitPanel.module.css";

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

// Get backend URL from window config or use default
const getApiUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:8000';
  if ((window as any).BACKEND_API_URL) {
    return (window as any).BACKEND_API_URL;
  }
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();

export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hello! I am your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
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
        content: "⚠️ Connection error. Please check if the backend is running or try again in a moment.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatInterface}>
      {/* Messages Area */}
      <div className={styles.chatMessages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(styles.message, styles[msg.role])}
          >
            <div className={styles.messageContent}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={styles.typingContainer}>
            <div className={styles.typingBubble}>
              <div className={styles.typingDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <span className={styles.typingText}>AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className={styles.inputField}
          />
          <div className={styles.statusDot} title="System Online" />
        </div>
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className={styles.sendButton}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}