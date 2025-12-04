// src/components/HomepageFeatures/Home.tsx

import React, { useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useChatContext } from "@site/src/context/ChatKitContext";
import '../../../src/css/chatkit-custom.css';

export default function MainHome() {
  const {
    isOpen,
    hasOpenedOnce,
    showPopup,
    selectedText,
    toggleChat,
    setShowPopup,
    handleThreadChange,
    handleResponseCompleted,
    openChatWithSelection,
    setSelectedText
  } = useChatContext();

  const [showSelectionButton, setShowSelectionButton] = React.useState(false);
  const [selectionPosition, setSelectionPosition] = React.useState({ x: 0, y: 0 });
  const [currentSelection, setCurrentSelection] = React.useState("");

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setCurrentSelection(text);
          setSelectionPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
          });
          setShowSelectionButton(true);
        }
      } else {
        setShowSelectionButton(false);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  const handleAskAboutSelection = () => {
    if (currentSelection) {
      openChatWithSelection(currentSelection);
      setShowSelectionButton(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div onClick={toggleChat} className="chatkit-toggle-button">
        {isOpen ? (
          <svg
            className="chatkit-fab-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            className="chatkit-fab-icon"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <circle cx="8" cy="16" r="1" fill="currentColor" />
            <circle cx="16" cy="16" r="1" fill="currentColor" />
          </svg>
        )}
      </div>

      {/* Popup Message */}
      {
        showPopup && !isOpen && (
          <div className="chatkit-popup-message">
            How can I help you? 💬
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
              className="chatkit-popup-close-button"
            >
              ×
            </button>
          </div>
        )
      }

      {/* Chat Window */}
      {
        hasOpenedOnce && (
          <div className={`chatkit-container ${isOpen ? "open" : "closed"}`}>
            {/* Chat Header */}
            <div className="chatkit-header">
              <div className="chatkit-header-content">
                <div className="chatkit-logo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M16 11h.01"></path>
                    <path d="M10 15c.5 1 2.5 1 3 0"></path>
                  </svg>
                </div>
                <span>Physical AI Assistant</span>
                <div className="chatkit-signal" title="AI Online">
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                </div>
              </div>
              <button onClick={toggleChat} className="chatkit-close-button">
                ×
              </button>
            </div>

            {/* Selected Text Preview */}
            {selectedText && (
              <div className="chatkit-selected-text-preview">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="chatkit-selected-text-icon"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>

                <div className="chatkit-selected-text-content-wrapper">
                  <div className="chatkit-selected-text-label">Selected text:</div>
                  <div className="chatkit-selected-text-content">"{selectedText}"</div>
                </div>

                <button
                  onClick={() => setSelectedText(null)}
                  className="chatkit-selected-text-close-button"
                >
                  ×
                </button>
              </div>
            )}

            {/* Chat Content */}
            <div className="chatkit-body">
              <BrowserOnly
                fallback={
                  <div className="chatkit-loading-fallback">
                    <div className="chatkit-loading-spinner" />
                    <div className="chatkit-loading-text">Loading chat...</div>
                  </div>
                }
              >
                {() => {
                  try {
                    const ChatKitPanel =
                      require("../HomepageFeatures/ChatKitPanel").default;
                    return (
                      <ChatKitPanel
                        selectedText={selectedText}
                        onThreadChange={handleThreadChange}
                        onResponseCompleted={handleResponseCompleted}
                      />
                    );
                  } catch (err: any) {
                    console.error("❌ Error loading ChatKitPanel:", err);
                    return (
                      <div className="chatkit-error-fallback">
                        <svg
                          className="chatkit-error-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>

                        <div>
                          <div className="chatkit-error-title">Failed to load chat</div>
                          <div className="chatkit-error-message">{err.message}</div>
                        </div>
                      </div>
                    );
                  }
                }}
              </BrowserOnly>
            </div>
          </div>
        )
      }
    </>
  );
}
